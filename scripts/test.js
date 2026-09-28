// Run a practice problem's tests from the terminal.
//   npm test two-sum            -> runs your solution.js
//   npm test two-sum -- --ref   -> runs the reference solution instead
//   npm test                    -> lists problems
const path = require('path');
const { spawnSync } = require('child_process');
const { listProblems, findProblem, PRACTICE_DIR } = require('../lib/catalog');
const { recordRun } = require('../lib/progress');

const pink = (s) => `\x1b[38;5;211m${s}\x1b[0m`;
const green = (s) => `\x1b[38;5;114m${s}\x1b[0m`;
const red = (s) => `\x1b[38;5;203m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;

const args = process.argv.slice(2);
const useRef = args.includes('--ref');
const query = args.find((a) => !a.startsWith('--'));

if (!query) {
  console.log(pink('🎀 Practice problems\n'));
  let topic = '';
  for (const p of listProblems()) {
    if (p.topic !== topic) console.log('\n' + pink((topic = p.topic)));
    console.log(`  ${p.slug.padEnd(40)} ${dim(p.difficulty)}`);
  }
  console.log(dim('\nRun one with: npm test <slug>'));
  process.exit(0);
}

let problem = findProblem(query);
if (Array.isArray(problem)) {
  if (problem.length !== 1) {
    console.log(problem.length ? `Did you mean:\n  ${problem.map((p) => p.slug).join('\n  ')}` : red(`No problem matches "${query}"`));
    process.exit(1);
  }
  problem = problem[0];
}

const dir = path.join(PRACTICE_DIR, problem.id);
const file = useRef ? 'reference.js' : 'solution.js';
const child = spawnSync(process.execPath, [path.join(__dirname, 'run-json.js'), dir, file], { encoding: 'utf8', timeout: 10000 });
if (child.error || child.status !== 0) {
  const timedOut = child.error && child.error.code === 'ETIMEDOUT';
  console.log(red(timedOut ? '⏰ Time limit exceeded (10s) — infinite loop, or too slow?' : child.stderr || String(child.error)));
  process.exit(1);
}
const res = JSON.parse(child.stdout);

console.log(pink(`\n🎀 ${problem.title}`) + dim(`  (${problem.difficulty}) ${useRef ? '[reference]' : ''}\n`));
if (res.loadError) console.log(red('  ' + res.loadError));
for (const r of res.results) {
  if (r.pass) {
    console.log(`  ${green('✔')} ${r.name} ${dim(r.ms + 'ms')}`);
  } else {
    console.log(`  ${red('✘')} ${r.name}`);
    console.log(dim('      input:    ') + r.input);
    console.log(dim('      expected: ') + r.expected);
    console.log(dim('      got:      ') + (r.error ? red(r.error) : r.actual));
  }
}
if (res.logs.length) console.log(dim('\n  console output:\n') + res.logs.map((l) => '    ' + l).join('\n'));
console.log(`\n  ${res.ok ? green('All passed!') : red('Not yet')} ${res.passed}/${res.total}`);

if (!useRef) {
  const { newlySolved } = recordRun(problem.id, res.ok);
  if (newlySolved) console.log(pink('  🌸 Solved! Logged to your tracker. So proud of you ✨'));
}
console.log();
process.exit(res.ok ? 0 : 1);
