// Runs a practice problem's tests.js against its solution.js (or another file) in Node.
// The pass/fail logic lives in runner-core.js so the browser version behaves identically.
// See runner-core.js for the tests.js format.

const path = require('path');
const { runLoaded, comparers, deepEqual } = require('./runner-core');

/**
 * @param {string} problemDir absolute path of the problem folder
 * @param {string} file solution file name inside the folder
 */
function runProblem(problemDir, file = 'solution.js') {
  const spec = require(path.join(problemDir, 'tests.js'));
  return runLoaded(spec, () => require(path.join(problemDir, file)), file);
}

module.exports = { runProblem, comparers, deepEqual };
