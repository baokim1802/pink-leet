// Internal: runs one problem in a fresh process and prints JSON (used by the GUI server).
// Usage: node scripts/run-json.js <problemDir> [file]
const { runProblem } = require('../lib/runner');

const logs = [];
const capture = (...args) => {
  const line = args.map((a) => (typeof a === 'string' ? a : require('util').inspect(a, { depth: 4 }))).join(' ');
  if (logs.length < 200) logs.push(line.length > 2000 ? line.slice(0, 2000) + '…' : line);
};
console.log = console.info = console.warn = console.error = console.debug = capture;

const [dir, file = 'solution.js'] = process.argv.slice(2);
let result;
try {
  result = runProblem(dir, file);
} catch (err) {
  result = { ok: false, loadError: `${err.name}: ${err.message}`, passed: 0, total: 0, results: [] };
}
result.logs = logs;
process.stdout.write(JSON.stringify(result));
