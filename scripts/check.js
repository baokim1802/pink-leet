// Sanity check: every reference.js passes its tests and every solution.js stub loads.
//   npm run check                    -> every problem
//   npm run check -- 07-linked-list  -> only problems whose id contains one of the args
const path = require('path');
const { spawnSync } = require('child_process');
const { listProblems, PRACTICE_DIR } = require('../lib/catalog');

let bad = 0;
const filters = process.argv.slice(2);
for (const p of listProblems().filter((x) => !filters.length || filters.some((f) => x.id.includes(f)))) {
  const dir = path.join(PRACTICE_DIR, p.id);
  const run = (file) => {
    const c = spawnSync(process.execPath, [path.join(__dirname, 'run-json.js'), dir, file], { encoding: 'utf8', timeout: 10000 });
    try { return JSON.parse(c.stdout); } catch { return { ok: false, loadError: c.stderr || 'timeout/crash', results: [] }; }
  };
  const problems = [];
  if (p.hasReference) {
    const ref = run('reference.js');
    if (!ref.ok) problems.push('reference fails: ' + (ref.loadError || ref.results.filter((r) => !r.pass).map((r) => `${r.name} expected ${r.expected} got ${r.error || r.actual}`).join('; ')));
  } else problems.push('no reference.js');
  const stub = run('solution.js');
  if (stub.loadError) problems.push('stub: ' + stub.loadError);
  if (stub.ok) problems.push('stub already passes all tests (tests too weak?)');
  if (problems.length) { bad++; console.log(`✘ ${p.id}\n    ${problems.join('\n    ')}`); }
  else console.log(`✔ ${p.id}`);
}
console.log(bad ? `\n${bad} problem(s) need attention` : '\nAll good 🎀');
process.exit(bad ? 1 : 0);
