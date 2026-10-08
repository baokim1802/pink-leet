// Copy your study data between Supabase and the files on this computer (or Codespaces).
//   npm run pull            Supabase -> practice/*/solution.js + data/progress.json
//   npm run push            practice/*/solution.js + data/progress.json -> Supabase (adds and overwrites, never deletes)
//   npm run pull -- logout  forget the saved sign-in
// Then ☁️ Save to GitHub (npm run sync) commits what you pulled, as usual.
//
// Needs supabase.config.json. Signs in with your email and password the first time
// (or SUPABASE_EMAIL / SUPABASE_PASSWORD) and keeps the session in .supabase-session.json (git ignores it).
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const catalog = require('../lib/catalog');
const progress = require('../lib/progress');

const ROOT = catalog.ROOT;
const SESSION_FILE = path.join(ROOT, '.supabase-session.json');

function readConfig() {
  let cfg = {};
  try { cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'supabase.config.json'), 'utf8')); } catch {}
  const url = process.env.SUPABASE_URL || cfg.url;
  const anonKey = process.env.SUPABASE_ANON_KEY || cfg.anonKey;
  if (!url || !anonKey) fail('Fill in "url" and "anonKey" in supabase.config.json first (Supabase → Project Settings → API).');
  return { url, anonKey };
}

const sessionStorage = {
  load() { try { return JSON.parse(fs.readFileSync(SESSION_FILE, 'utf8')); } catch { return null; } },
  save(s) {
    if (s) fs.writeFileSync(SESSION_FILE, JSON.stringify(s, null, 2) + '\n', { mode: 0o600 });
    else fs.rmSync(SESSION_FILE, { force: true });
  },
};

async function signIn(db) {
  if (db.user) return db.user;
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: !!process.stdin.isTTY });
  const lines = rl[Symbol.asyncIterator](); // buffers lines, so piped input works too
  let muted = false;
  rl._writeToOutput = (s) => { if (!muted) process.stdout.write(s); }; // muted: don't echo the password
  const ask = async (question, hidden = false) => {
    process.stdout.write(question);
    muted = hidden;
    const { value = '' } = await lines.next();
    muted = false;
    if (hidden) process.stdout.write('\n');
    return value.trim();
  };
  const email = process.env.SUPABASE_EMAIL || await ask('Email: ');
  const password = process.env.SUPABASE_PASSWORD || await ask('Password: ', true);
  rl.close();
  try {
    const user = await db.signIn(email, password);
    console.log(`🔑 Signed in as ${user.email} (saved in .supabase-session.json)`);
    return user;
  } catch (err) {
    fail(err.status === 400 ? 'Wrong email or password. (Invited with a link only? Choose a password with "Forgot password?" on the website.)' : err.message);
  }
}

function fail(msg) {
  console.error('🥺 ' + msg);
  process.exit(1);
}

const readIf = (file) => (fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null);

async function pull(db, cloud) {
  const { store } = await cloud.loadStore(db);
  store.progress.name ||= progress.load().name; // the account has no first name yet: keep the local one
  progress.save(store.progress);
  let n = 0;
  for (const [id, code] of Object.entries(store.code)) {
    const dir = catalog.problemDir(id);
    if (!dir) { console.warn(`   skipped ${id}: no such problem in practice/`); continue; }
    if (readIf(path.join(dir, 'solution.js')) === code) continue;
    fs.writeFileSync(path.join(dir, 'solution.js'), code);
    n++;
  }
  console.log(`⬇️  Pulled your progress into data/progress.json and updated ${n} solution.js file(s)`);
}

async function pushAll(db, cloud, uid) {
  // only the problems you've written code for (solution.js differs from starter.js)
  const code = {};
  for (const p of catalog.listProblems()) {
    const dir = catalog.problemDir(p.id);
    const src = readIf(path.join(dir, 'solution.js'));
    if (src != null && src !== readIf(path.join(dir, 'starter.js'))) code[p.id] = src;
  }
  await cloud.saveStore(db, uid, { progress: progress.load(), code }, { cheats: false }); // cheat sheets are files in cheatsheets/ locally
  console.log(`⬆️  Pushed your progress and ${Object.keys(code).length} solution(s) to Supabase`);
}

(async () => {
  const [cmd, arg] = process.argv.slice(2);
  const { createClient } = await import('../app/supa.js');
  const cloud = await import('../app/cloud.js');
  const db = createClient({ ...readConfig(), storage: sessionStorage });

  if (arg === 'logout') {
    await db.signOut();
    return console.log('👋 Signed out');
  }
  const { id: uid } = await signIn(db);
  try {
    if (cmd === 'pull') await pull(db, cloud);
    else if (cmd === 'push') await pushAll(db, cloud, uid);
    else fail('Use: npm run pull | npm run push');
  } catch (err) {
    fail(err.status === 401 ? `${err.message} Run the command again to sign in.` : err.message);
  }
})();
