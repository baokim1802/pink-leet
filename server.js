// 🎀 Leet Study — tiny zero-dependency server for the study GUI.
//   npm start            -> http://localhost:4321
//   npm start -- --open  -> also opens your browser

const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn, execFile } = require('child_process');
const catalog = require('./lib/catalog');
const progress = require('./lib/progress');
const { sync } = require('./scripts/sync');

const PORT = Number(process.env.PORT) || 4321;
const HOST = process.env.HOST || '127.0.0.1';
const APP_DIR = path.join(__dirname, 'app');
const EDITOR = process.env.LEET_EDITOR || 'cursor';
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon' };

function send(res, status, body, type = 'application/json') {
  res.writeHead(status, { 'Content-Type': `${type}; charset=utf-8`, 'Cache-Control': 'no-store' });
  res.end(type === 'application/json' ? JSON.stringify(body) : body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > 1e6) reject(new Error('Body too large'));
    });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (err) {
        reject(err);
      }
    });
  });
}

function runTests(dir, file) {
  return new Promise((resolve) => {
    execFile(
      process.execPath,
      [path.join(__dirname, 'scripts', 'run-json.js'), dir, file],
      { timeout: 10000, maxBuffer: 5e6 },
      (err, stdout, stderr) => {
        if (err && err.killed) return resolve({ ok: false, loadError: '⏰ Time limit exceeded (10s) — infinite loop, or too slow for the big tests?', results: [], logs: [] });
        try {
          resolve(JSON.parse(stdout));
        } catch {
          resolve({ ok: false, loadError: stderr || String(err), results: [], logs: [] });
        }
      },
    );
  });
}

function applyProgress({ type, id, patch = {} }) {
  const data = progress.load();
  if (type === 'problem') {
    const p = (data.problems[id] ||= { status: 'todo', attempts: 0, notes: '' });
    for (const k of ['status', 'notes', 'starred']) if (k in patch) p[k] = patch[k];
    if (patch.status === 'solved' && !p.solvedAt) {
      p.solvedAt = progress.today();
      progress.bump(data, 'solved');
    }
  } else if (type === 'lesson') {
    const l = (data.lessons[id] ||= { done: false });
    if (patch.done && !l.done) {
      l.doneAt = progress.today();
      progress.bump(data, 'lessons');
    }
    l.done = !!patch.done;
  } else if (type === 'goals') {
    data.goals = { ...data.goals, ...patch };
  } else if (type === 'profile') {
    if ('name' in patch) data.name = String(patch.name).slice(0, 40);
  }
  return progress.save(data);
}

async function api(req, res, url) {
  const parts = url.pathname.split('/').filter(Boolean).slice(1); // drop "api"
  const [resource] = parts;

  if (resource === 'state' && req.method === 'GET') {
    return send(res, 200, { lessons: catalog.listLessons(), problems: catalog.listProblems(), progress: progress.load() });
  }

  if (resource === 'lessons' && parts[1] && req.method === 'GET') {
    const md = catalog.readLesson(parts[1]);
    return md == null ? send(res, 404, { error: 'Lesson not found' }) : send(res, 200, { id: parts[1], markdown: md });
  }

  if (resource === 'problems' && parts.length >= 3) {
    const id = `${parts[1]}/${parts[2]}`;
    const action = parts[3];
    const dir = catalog.problemDir(id);
    if (!dir) return send(res, 404, { error: 'Problem not found' });
    const read = (f) => (fs.existsSync(path.join(dir, f)) ? fs.readFileSync(path.join(dir, f), 'utf8') : null);

    if (!action && req.method === 'GET') {
      const meta = catalog.listProblems().find((p) => p.id === id);
      return send(res, 200, { ...meta, readme: read('README.md') || '', code: read('solution.js') || '', file: path.join(dir, 'solution.js') });
    }
    if (action === 'code' && req.method === 'PUT') {
      const { code } = await readBody(req);
      if (typeof code !== 'string') return send(res, 400, { error: 'code must be a string' });
      fs.writeFileSync(path.join(dir, 'solution.js'), code);
      return send(res, 200, { saved: true });
    }
    if (action === 'run' && req.method === 'POST') {
      const result = await runTests(dir, 'solution.js');
      const { problem, newlySolved } = progress.recordRun(id, !!result.ok);
      return send(res, 200, { ...result, problem, newlySolved });
    }
    if (action === 'reference' && req.method === 'GET') {
      return send(res, 200, { code: read('reference.js') });
    }
    if (action === 'open' && req.method === 'POST') {
      const child = spawn(EDITOR, [path.join(dir, 'solution.js')], { detached: true, stdio: 'ignore' });
      child.on('error', () => {});
      child.unref();
      return send(res, 200, { opened: EDITOR });
    }
  }

  if (resource === 'sync' && req.method === 'POST') {
    return send(res, 200, sync());
  }

  if (resource === 'progress' && req.method === 'POST') {
    return send(res, 200, applyProgress(await readBody(req)));
  }

  return send(res, 404, { error: 'Not found' });
}

function serveStatic(res, pathname) {
  const file = path.join(APP_DIR, pathname === '/' ? 'index.html' : pathname);
  if (!file.startsWith(APP_DIR) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    return send(res, 404, 'Not found', 'text/plain');
  }
  send(res, 200, fs.readFileSync(file), MIME[path.extname(file)] || 'application/octet-stream');
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  try {
    if (url.pathname.startsWith('/api/')) return await api(req, res, url);
    serveStatic(res, decodeURIComponent(url.pathname));
  } catch (err) {
    send(res, 500, { error: err.message });
  }
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`\n  🎀 Leet Study is already running at http://localhost:${PORT}\n`);
    process.exit(0);
  }
  throw err;
});

server.listen(PORT, HOST, () => {
  const link = `http://localhost:${PORT}`;
  console.log(`\n  🎀 Leet Study is running at \x1b[38;5;211m${link}\x1b[0m\n     (Ctrl+C to stop)\n`);
  if (process.argv.includes('--open')) {
    spawn(process.platform === 'darwin' ? 'open' : 'xdg-open', [link], { detached: true, stdio: 'ignore' }).on('error', () => {}).unref();
  }
});
