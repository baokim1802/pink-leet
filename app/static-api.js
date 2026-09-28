// Browser "server" for the static website (GitHub Pages).
// Content comes from data.json (built by scripts/build-static.js from the repo). Everything you
// change — code, notes, progress, cheat sheet edits — is saved in this browser's localStorage.
// Use Backup / Restore in the sidebar to move it between devices.

const KEY = 'leet:site:v1';
const LESSON_RENAMES = { '13-interview-playbook': '19-interview-playbook' };
const DEFAULT_PROGRESS = {
  name: '',
  problems: {},
  lessons: {},
  activity: {},
  goals: { dailyProblems: 2, weeklyProblems: 10, targetDate: '', targetLabel: 'Interview ready 💼', custom: [] },
};

let data = null; // the built bundle
let store = null; // { progress, code: {id: src}, cheats: {id: md}, newCheats: [{id, markdown}] }

const titleOf = (md, fallback) => (md.match(/^#\s+(.+)$/m) || [])[1]?.trim() || fallback;

function today(d = new Date()) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function normalizeProgress(p = {}) {
  const out = { ...structuredClone(DEFAULT_PROGRESS), ...p, goals: { ...DEFAULT_PROGRESS.goals, ...(p.goals || {}) } };
  out.problems ||= {};
  out.lessons ||= {};
  out.activity ||= {};
  for (const [from, to] of Object.entries(LESSON_RENAMES)) {
    if (out.lessons[from] && !out.lessons[to]) out.lessons[to] = out.lessons[from];
    delete out.lessons[from];
  }
  return out;
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(store));
  } catch (err) {
    throw new Error(`Couldn't save in this browser (${err.message}). Use Backup to download your work.`);
  }
}

async function init() {
  if (data) return;
  const res = await fetch('data.json', { cache: 'no-cache' });
  if (!res.ok) throw new Error(`Couldn't load the study content (HTTP ${res.status})`);
  data = await res.json();
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch {}
  store = {
    // first visit: start from the progress committed in the repo (e.g. from Codespaces)
    progress: normalizeProgress(saved?.progress ?? data.seedProgress ?? {}),
    code: saved?.code || {},
    cheats: saved?.cheats || {},
    newCheats: saved?.newCheats || [],
  };
}

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
  persist();
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
  persist();
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

function createCheatsheet(title) {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'notes';
  const nums = cheatsheets().map((c) => parseInt(c.id, 10)).filter((n) => !Number.isNaN(n));
  const id = `${String((nums.length ? Math.max(...nums) : 0) + 1).padStart(2, '0')}-${slug}`;
  store.newCheats.push({ id, markdown: `# ${title}\n\n## First note\nOne line about what it is.\n\`\`\`js\n// example code\n\`\`\`\n` });
  persist();
  return id;
}

// ---------- the "routes" ----------
function notFound(what) {
  const err = new Error(`${what} not found`);
  err.status = 404;
  return err;
}

const problemMeta = ({ readme, code, tests, reference, ...meta }) => meta;

export async function handle(path, { method = 'GET', body } = {}) {
  await init();
  const parts = path.split('/').filter(Boolean);
  const [resource] = parts;

  if (resource === 'state') {
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
    if (!action) return { ...problemMeta(p), readme: p.readme, code, file: `saved in this browser · practice/${id}/solution.js` };
    if (action === 'code' && method === 'PUT') {
      store.code[id] = body.code;
      persist();
      return { saved: true };
    }
    if (action === 'run') {
      const result = await runInWorker(p.tests, code);
      return { ...result, ...recordRun(id, !!result.ok) };
    }
    if (action === 'reference') return { code: p.reference };
    if (action === 'open') throw new Error('Opening an editor only works when running the app locally or in Codespaces.');
  }

  if (resource === 'progress' && method === 'POST') return applyProgress(body);

  if (resource === 'cheatsheets') {
    if (!parts[1] && method === 'GET') return cheatsheets();
    if (!parts[1] && method === 'POST') return { id: createCheatsheet(String(body.title).trim().slice(0, 60)) };
    if (parts[1] && method === 'PUT') {
      const extra = store.newCheats.find((c) => c.id === parts[1]);
      if (extra) extra.markdown = body.markdown;
      else if (data.cheatsheets.some((c) => c.id === parts[1])) store.cheats[parts[1]] = body.markdown;
      else throw notFound('Cheat sheet');
      persist();
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
    store = {
      progress: normalizeProgress(obj.progress),
      code: obj.code || {},
      cheats: obj.cheats || {},
      newCheats: obj.newCheats || [],
    };
  } else if (obj && typeof obj === 'object' && (obj.problems || obj.activity || obj.goals)) {
    store.progress = normalizeProgress(obj);
  } else {
    throw new Error("That file doesn't look like a Leet Study backup.");
  }
  persist();
}
