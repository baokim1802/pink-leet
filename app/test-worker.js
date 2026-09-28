// Website only: runs one problem's tests in a Web Worker, so an infinite loop can be stopped
// (the page terminates the worker after 10s) and the page stays responsive.
// It loads the same runner-core.js the Node version uses, with a tiny CommonJS `require`.

self.onmessage = (e) => {
  const { runnerCore, structures, tests, solution } = e.data;

  const logs = [];
  const fmt = (a) => {
    if (typeof a === 'string') return a;
    try { return JSON.stringify(a) ?? String(a); } catch { return String(a); }
  };
  const capture = (...args) => {
    if (logs.length >= 200) return;
    const line = args.map(fmt).join(' ');
    logs.push(line.length > 2000 ? line.slice(0, 2000) + '…' : line);
  };
  console.log = console.info = console.warn = console.error = console.debug = capture;

  const cache = {};
  function load(name, src) {
    const module = { exports: {} };
    // Keep the wrapper on the first line so stack traces point at the right solution.js line.
    const fn = (0, eval)(`(function (module, exports, require) {${src}\n})\n//# sourceURL=${name}`);
    fn(module, module.exports, require);
    return module.exports;
  }
  function require(p) {
    if (/lib\/structures(\.js)?$/.test(p)) return (cache.structures ||= load('structures.js', structures));
    throw new Error(`Cannot find module '${p}' (only lib/structures is available)`);
  }

  let result;
  try {
    const core = load('runner-core.js', runnerCore);
    const spec = load('tests.js', tests);
    result = core.runLoaded(spec, () => load('solution.js', solution), 'solution.js');
  } catch (err) {
    result = { ok: false, loadError: `${err.name}: ${err.message}`, passed: 0, total: 0, results: [] };
  }
  result.logs = logs;
  self.postMessage(result);
};
