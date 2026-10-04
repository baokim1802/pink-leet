// Builds the static website (GitHub Pages) into dist/.
//   npm run build            -> dist/
//   npm run build -- --serve -> also serves it at http://localhost:4322 to try it out
//
// dist/ = the app/ files + data.json (every lesson, problem, cheat sheet and the test runner),
// with window.LEET_STATIC set so the app runs without the Node server.
const fs = require('fs');
const path = require('path');
const catalog = require('../lib/catalog');

const ROOT = catalog.ROOT;
const OUT = path.join(ROOT, 'dist');
const read = (...p) => fs.readFileSync(path.join(...p), 'utf8');
const readIf = (...p) => (fs.existsSync(path.join(...p)) ? read(...p) : null);

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

// GitHub Pages lets browsers cache files for 10 minutes, so right after a deploy a browser can mix the
// new index.html with old CSS/JS. Every app file reference gets ?v=<hash of the app files> so a new
// build always loads as one matching set.
const appFiles = fs.readdirSync(path.join(ROOT, 'app')).sort();
const version = require('crypto').createHash('sha1')
  .update(appFiles.map((f) => f + read(ROOT, 'app', f)).join('\0')).digest('hex').slice(0, 10);
const bust = (src) => src.replace(/(['"])(\.\/)?([\w-]+\.(?:js|css))\1/g, (m, q, dot, name) =>
  (appFiles.includes(name) ? `${q}${dot || ''}${name}?v=${version}${q}` : m));

for (const f of appFiles) {
  if (f.endsWith('.js')) fs.writeFileSync(path.join(OUT, f), bust(read(ROOT, 'app', f)));
  else fs.copyFileSync(path.join(ROOT, 'app', f), path.join(OUT, f));
}
const html = bust(read(OUT, 'index.html')).replace(
  `<script type="module" src="app.js?v=${version}"></script>`,
  `<script>window.LEET_STATIC = true;</script>\n  <script type="module" src="app.js?v=${version}"></script>`,
);
if (!html.includes('LEET_STATIC')) throw new Error('Could not mark index.html as static');
if (!html.includes(`style.css?v=${version}`)) throw new Error('Could not version style.css in index.html');
fs.writeFileSync(path.join(OUT, 'index.html'), html);
fs.writeFileSync(path.join(OUT, '.nojekyll'), ''); // serve files as-is on GitHub Pages

const problems = catalog.listProblems().map((p) => {
  const dir = catalog.problemDir(p.id);
  return {
    ...p,
    readme: readIf(dir, 'README.md') || '',
    code: readIf(dir, 'solution.js') || '',
    tests: read(dir, 'tests.js'),
    reference: readIf(dir, 'reference.js'),
  };
});

let seedProgress = null;
try { seedProgress = JSON.parse(read(ROOT, 'data', 'progress.json')); } catch {}

const bundle = {
  builtAt: new Date().toISOString(),
  lessons: catalog.listLessons().map((l) => ({ ...l, markdown: catalog.readLesson(l.id) })),
  problems,
  cheatsheets: catalog.listCheatsheets(),
  lib: { runnerCore: read(ROOT, 'lib', 'runner-core.js'), structures: read(ROOT, 'lib', 'structures.js') },
  seedProgress,
};
fs.writeFileSync(path.join(OUT, 'data.json'), JSON.stringify(bundle));
const kb = Math.round(fs.statSync(path.join(OUT, 'data.json')).size / 1024);
console.log(`🎀 Built dist/ — ${bundle.lessons.length} lessons, ${problems.length} problems, ${bundle.cheatsheets.length} cheat sheets (data.json ${kb} KB)`);

if (process.argv.includes('--serve')) {
  const http = require('http');
  const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json' };
  const port = Number(process.env.PORT) || 4322;
  http.createServer((req, res) => {
    const rel = decodeURIComponent(new URL(req.url, 'http://x').pathname).replace(/^\/+/, '') || 'index.html';
    const file = path.join(OUT, rel);
    if (!file.startsWith(OUT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
    res.end(fs.readFileSync(file));
  }).listen(port, () => console.log(`   Serving the website build at http://localhost:${port}`));
}
