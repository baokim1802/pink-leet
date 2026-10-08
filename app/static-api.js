// Browser "server" for the static website (GitHub Pages).
// Content comes from data.json (built by scripts/build-static.js from the repo). Everything you
// change — code, notes, progress, cheat sheet edits — is saved:
//   - in your Supabase account when supabase.config.json is filled in (sign in on any device), or
//   - in this browser's localStorage otherwise (use Backup / Restore to move it between devices).
import * as cloud from './cloud.js';
import { createClient } from './supa.js';

const { normalizeProgress } = cloud;
const KEY = 'leet:site:v1';
const RELOAD_AFTER_MS = 15_000; // pick up changes from your other devices when you come back to the tab

let data = null; // the built bundle
let store = null; // { progress, code: {id: src}, cheats: {id: md}, newCheats: [{id, markdown}] }
let loadedAt = 0;

const config = window.LEET_SUPABASE;
let db = null;

/** The Supabase client, or null when the site keeps everything in this browser. */
export function cloudClient() {
  if (!config?.url || !config?.anonKey) return null;
  if (db) return db;
  // Named after the Supabase project, so Systems Study (same site, same project) shares this sign-in.
  const sessionKey = `study:supabase:${new URL(config.url).host}`;
  db = createClient({
    url: config.url,
    anonKey: config.anonKey,
    storage: {
      load() { try { return JSON.parse(localStorage.getItem(sessionKey) || 'null'); } catch { return null; } },
      save(s) { try { s ? localStorage.setItem(sessionKey, JSON.stringify(s)) : localStorage.removeItem(sessionKey); } catch {} },
    },
  });
  return db;
}

const titleOf = (md, fallback) => (md.match(/^#\s+(.+)$/m) || [])[1]?.trim() || fallback;

function today(d = new Date()) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(store));
  } catch (err) {
    throw new Error(`Couldn't save in this browser (${err.message}). Use Backup to download your work.`);
  }
}

function readLocal() {
  try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { return null; }
}

function fromSaved(saved) {
  return {
    progress: normalizeProgress(saved?.progress ?? {}),
    code: saved?.code || {},
    cheats: saved?.cheats || {},
    newCheats: saved?.newCheats || [],
  };
}

async function loadFromCloud() {
  const { store: s, rowCount } = await cloud.loadStore(db);
  store = s;
  loadedAt = Date.now();
  // A brand-new account on a browser that already has work in it: offer to copy it up.
  const local = readLocal();
  if (!rowCount && local?.progress && confirm('This browser has study work saved in it. Copy it into your account?')) {
    store = fromSaved(local);
    await cloud.saveStore(db, db.user.id, store);
    // it's in the account now; don't offer it again to the next person who signs in on this browser
    try { localStorage.removeItem(KEY); } catch {}
  }
}

async function init() {
  if (!data) {
    const res = await fetch('data.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error(`Couldn't load the study content (HTTP ${res.status})`);
    data = await res.json();
  }
  if (cloudClient()) {
    if (!db.user) throw Object.assign(new Error('Please sign in.'), { status: 401 });
    if (!store) await loadFromCloud();
    return;
  }
  if (store) return;
  // first visit: start from the progress committed in the repo (e.g. from Codespaces)
  const saved = readLocal();
  store = fromSaved({ ...saved, progress: saved?.progress ?? data.seedProgress });
}

/**
 * Make a change. `mutate` edits the in-memory store; `rows()` names the table rows it touched.
 * In the browser-only mode the whole store goes to localStorage; with Supabase only those rows
 * are written, plus today's activity counters through leet_bump_activity.
 */
async function commit(mutate, rows = () => []) {
  const day = today();
  const before = { ...store.progress.activity[day] };
  const result = mutate();
  if (!db) {
    persist();
    return result;
  }
  const delta = cloud.activityDelta(day, before, store.progress.activity[day]);
  try {
    await Promise.all([cloud.writeRows(db, rows()), delta && db.rpc('leet_bump_activity', delta)]);
  } catch (err) {
    loadedAt = 0; // what's in memory may not match the database now: reload next time
    throw err;
  }
  return result;
}

const uid = () => db?.user?.id;

// ---------- progress (mirrors lib/progress.js + server.js) ----------
function bump(key, n = 1) {
  const a = (store.progress.activity[today()] ||= { solved: 0, runs: 0, lessons: 0 });
  a[key] = (a[key] || 0) + n;
}

function recordRun(id, ok) {
  const p = (store.progress.problems[id] ||= { status: 'todo', attempts: 0, notes: '' });
  p.attempts = (p.attempts || 0) + 1;
  p.lastRunAt = new Date().toISOString();
  bump('runs');
  let newlySolved = false;
  if (ok && p.status !== 'solved') {
    newlySolved = !p.solvedAt;
    p.status = 'solved';
    p.solvedAt ||= today();
    if (newlySolved) bump('solved');
  } else if (!ok && (!p.status || p.status === 'todo')) {
    p.status = 'attempted';
  }
  return { problem: p, newlySolved };
}

function applyProgress({ type, id, patch = {} }) {
  const prog = store.progress;
  if (type === 'problem') {
    const p = (prog.problems[id] ||= { status: 'todo', attempts: 0, notes: '' });
    for (const k of ['status', 'notes', 'starred']) if (k in patch) p[k] = patch[k];
    if (patch.status === 'solved' && !p.solvedAt) {
      p.solvedAt = today();
      bump('solved');
    }
  } else if (type === 'lesson') {
    const l = (prog.lessons[id] ||= { done: false });
    if (patch.done && !l.done) {
      l.doneAt = today();
      bump('lessons');
    }
    l.done = !!patch.done;
  } else if (type === 'goals') {
    prog.goals = { ...prog.goals, ...patch };
  } else if (type === 'profile') {
    if ('name' in patch) prog.name = String(patch.name).slice(0, 40);
  }
  return prog;
}

// ---------- running tests in a Web Worker ----------
function runInWorker(tests, solution) {
  return new Promise((resolve) => {
    const worker = new Worker('test-worker.js');
    const timer = setTimeout(() => {
      worker.terminate();
      resolve({ ok: false, loadError: '⏰ Time limit exceeded (10s) — infinite loop, or too slow for the big tests?', results: [], logs: [] });
    }, 10000);
    worker.onmessage = (e) => { clearTimeout(timer); worker.terminate(); resolve(e.data); };
    worker.onerror = (e) => {
      clearTimeout(timer);
      worker.terminate();
      resolve({ ok: false, loadError: e.message || 'The test runner crashed', results: [], logs: [] });
    };
    worker.postMessage({ runnerCore: data.lib.runnerCore, structures: data.lib.structures, tests, solution });
  });
}

// ---------- cheat sheets ----------
function cheatsheets() {
  const base = data.cheatsheets.map((c) => {
    const markdown = store.cheats[c.id] ?? c.markdown;
    return { id: c.id, title: titleOf(markdown, c.title), markdown };
  });
  const extra = store.newCheats.map((c) => ({ id: c.id, title: titleOf(c.markdown, c.id), markdown: c.markdown }));
  return [...base, ...extra].sort((a, b) => a.id.localeCompare(b.id));
}

async function createCheatsheet(title) {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'notes';
  const nums = cheatsheets().map((c) => parseInt(c.id, 10)).filter((n) => !Number.isNaN(n));
  const id = `${String((nums.length ? Math.max(...nums) : 0) + 1).padStart(2, '0')}-${slug}`;
  const markdown = `# ${title}\n\n## First note\nOne line about what it is.\n\`\`\`js\n// example code\n\`\`\`\n`;
  await commit(() => store.newCheats.push({ id, markdown }), () => [cloud.cheatRows(uid(), id, markdown, true)]);
  return id;
}

// ---------- the "routes" ----------
function notFound(what) {
  const err = new Error(`${what} not found`);
  err.status = 404;
  return err;
}

const problemMeta = ({ readme, code, tests, reference, starter, ...meta }) => meta;

export async function handle(path, { method = 'GET', body } = {}) {
  await init();
  const parts = path.split('/').filter(Boolean);
  const [resource] = parts;

  if (resource === 'state') {
    if (db && Date.now() - loadedAt > RELOAD_AFTER_MS) await loadFromCloud();
    return {
      lessons: data.lessons.map(({ markdown, ...l }) => l),
      problems: data.problems.map(problemMeta),
      progress: store.progress,
    };
  }

  if (resource === 'lessons' && parts[1]) {
    const lesson = data.lessons.find((l) => l.id === parts[1]);
    if (!lesson) throw notFound('Lesson');
    return { id: lesson.id, markdown: lesson.markdown };
  }

  if (resource === 'problems' && parts.length >= 3) {
    const id = `${parts[1]}/${parts[2]}`;
    const p = data.problems.find((x) => x.id === id);
    if (!p) throw notFound('Problem');
    const action = parts[3];
    const code = store.code[id] ?? p.code;
    if (!action) return { ...problemMeta(p), readme: p.readme, code, file: `${db ? 'saved to your account' : 'saved in this browser'} · practice/${id}/solution.js` };
    if (action === 'code' && method === 'PUT') {
      await commit(() => (store.code[id] = body.code), () => [cloud.solutionRows(uid(), store.code, [id])]);
      return { saved: true };
    }
    if (action === 'run') {
      const result = await runInWorker(p.tests, code);
      const run = await commit(() => recordRun(id, !!result.ok), () => [cloud.problemRows(uid(), store.progress, [id])]);
      return { ...result, ...run };
    }
    if (action === 'reference') return { code: p.reference };
    if (action === 'starter') return { code: p.starter };
    if (action === 'open') throw new Error('Opening an editor only works when running the app locally or in Codespaces.');
  }

  if (resource === 'progress' && method === 'POST') {
    return commit(
      () => applyProgress(body),
      () => {
        if (body.type === 'problem') return [cloud.problemRows(uid(), store.progress, [body.id])];
        if (body.type === 'lesson') return [cloud.lessonRows(uid(), store.progress, [body.id])];
        return [cloud.profileRows(uid(), store.progress)];
      },
    );
  }

  if (resource === 'cheatsheets') {
    if (!parts[1] && method === 'GET') return cheatsheets();
    if (!parts[1] && method === 'POST') return { id: await createCheatsheet(String(body.title).trim().slice(0, 60)) };
    if (parts[1] && method === 'PUT') {
      const sid = parts[1];
      const extra = store.newCheats.find((c) => c.id === sid);
      if (!extra && !data.cheatsheets.some((c) => c.id === sid)) throw notFound('Cheat sheet');
      await commit(
        () => (extra ? (extra.markdown = body.markdown) : (store.cheats[sid] = body.markdown)),
        () => [cloud.cheatRows(uid(), sid, body.markdown, !!extra)],
      );
      return { saved: true };
    }
  }

  if (resource === 'sync') {
    return { ok: false, message: 'On the website your work is saved in this browser. Use ⬇️ Backup to download a copy.' };
  }

  throw notFound('Page');
}

// ---------- backup / restore ----------
export async function exportBackup() {
  await init();
  const blob = new Blob([JSON.stringify({ app: 'leet-study', version: 1, exportedAt: new Date().toISOString(), ...store }, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `leet-study-backup-${today()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Accepts a Backup file, or a data/progress.json from the repo (progress only). */
export async function importBackup(text) {
  await init();
  const obj = JSON.parse(text);
  if (obj && obj.app === 'leet-study' && obj.progress) {
    store = fromSaved(obj);
  } else if (obj && typeof obj === 'object' && (obj.problems || obj.activity || obj.goals)) {
    store.progress = normalizeProgress(obj);
  } else {
    throw new Error("That file doesn't look like a Leet Study backup.");
  }
  if (db) await cloud.saveStore(db, uid(), store);
  else persist();
}
