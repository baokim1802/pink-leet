// Test-running logic shared by Node (lib/runner.js) and the browser (app/test-worker.js).
// No Node-only APIs in here, so the exact same code decides pass/fail in both places.
//
// tests.js format:
//   module.exports = {
//     fn: 'twoSum',                 // exported function name (or omit if module.exports = fn)
//     compare: 'exact',             // 'exact' | 'unordered' | 'unorderedNested' | 'float' | (actual, expected, args) => bool
//     prepare: (args) => args,      // optional: turn plain JSON args into ListNode/TreeNode etc.
//     transform: (result, args) => result, // optional: turn the result back into plain JSON
//     cases: [{ args: [[2, 7, 11, 15], 9], expected: [0, 1] }],
//   };
//
// Unusual problems (serialize/deserialize, clone graph, node-reference inputs...) can take full control:
//   module.exports = {
//     run: (mod, args) => result,   // mod = whatever solution.js exports; args = deep-cloned case args
//     compare: ..., cases: [...]
//   };
//
// Class-design problems (MinStack, LRU cache...) use LeetCode's op-list format:
//   module.exports = {
//     cls: 'MinStack',
//     cases: [{ ops: ['MinStack', 'push', 'getMin'], args: [[], [-2], []], expected: [null, null, -2] }],
//   };

/** Structural equality. -0 equals 0 (LeetCode treats them the same); NaN equals NaN. */
function deepEqual(a, b) {
  if (typeof a === 'number' && typeof b === 'number') return a === b || (a !== a && b !== b);
  if (a === b) return true;
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (Array.isArray(a)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (!deepEqual(a[i], b[i])) return false;
    return true;
  }
  if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return false;
  if (a instanceof Map || a instanceof Set) {
    return a.size === b.size && deepEqual([...a], [...b]);
  }
  const ka = Object.keys(a);
  const kb = Object.keys(b);
  if (ka.length !== kb.length) return false;
  return ka.every((k) => Object.prototype.hasOwnProperty.call(b, k) && deepEqual(a[k], b[k]));
}

function sortKey(x) {
  return JSON.stringify(x);
}

const comparers = {
  exact: (a, e) => deepEqual(a, e),
  unordered: (a, e) =>
    Array.isArray(a) && Array.isArray(e) && a.length === e.length &&
    deepEqual([...a].map(sortKey).sort(), [...e].map(sortKey).sort()),
  // e.g. group anagrams / subsets / permutations: order doesn't matter at either level
  unorderedNested: (a, e) => {
    if (!Array.isArray(a) || !Array.isArray(e) || a.length !== e.length) return false;
    const norm = (arr) => arr.map((inner) => sortKey(Array.isArray(inner) ? [...inner].sort() : inner)).sort();
    return deepEqual(norm(a), norm(e));
  },
  float: (a, e) => typeof a === 'number' && Math.abs(a - e) < 1e-5,
};

function preview(v, max = 300) {
  let s;
  try {
    s = JSON.stringify(v, (_k, val) => (val === undefined ? '__undefined__' : val));
    s = s === undefined ? String(v) : s.replace(/"__undefined__"/g, 'undefined');
  } catch {
    s = String(v); // e.g. a circular structure
  }
  return s.length > max ? s.slice(0, max) + '…' : s;
}

function resolveExport(mod, name) {
  if (mod == null) return undefined;
  if (!name) return typeof mod === 'function' ? mod : Object.values(mod).find((v) => typeof v === 'function');
  if (typeof mod === 'function' && (mod.name === name || !mod[name])) return mod;
  return mod[name];
}

const now = () => (typeof performance !== 'undefined' ? performance.now() : Date.now());
const compareFor = (spec) => (typeof spec.compare === 'function' ? spec.compare : comparers[spec.compare || 'exact']);

function runFunctionCase(fn, spec, c) {
  let args = structuredClone(c.args);
  const displayArgs = c.args;
  if (spec.prepare) args = spec.prepare(args);
  const t0 = now();
  let actual = spec.run ? spec.run(fn, args) : fn(...args);
  const ms = now() - t0;
  // In-place problems (e.g. "modify nums in place") report the mutated argument.
  if (spec.inPlace !== undefined) actual = args[spec.inPlace];
  if (spec.transform) actual = spec.transform(actual, args);
  return { input: displayArgs, expected: c.expected, actual, pass: !!compareFor(spec)(actual, c.expected, displayArgs), ms };
}

function runClassCase(Cls, spec, c) {
  const out = [];
  let obj = null;
  const t0 = now();
  c.ops.forEach((op, i) => {
    const a = structuredClone(c.args[i] || []);
    if (i === 0) {
      obj = new Cls(...a);
      out.push(null);
    } else {
      if (typeof obj[op] !== 'function') throw new Error(`Method "${op}" is not implemented`);
      const r = obj[op](...a);
      out.push(r === undefined ? null : r);
    }
  });
  const ms = now() - t0;
  return { input: { ops: c.ops, args: c.args }, expected: c.expected, actual: out, pass: !!compareFor(spec)(out, c.expected), ms };
}

/**
 * Run every case of a loaded tests.js spec.
 * @param {object} spec the tests.js exports
 * @param {() => any} loadSolution returns the solution's exports (may throw on syntax/load errors)
 * @param {string} file solution file name, used to point at the failing line in stack traces
 */
function runLoaded(spec, loadSolution, file = 'solution.js') {
  let mod;
  try {
    mod = loadSolution();
  } catch (err) {
    return { ok: false, loadError: `${err.name}: ${err.message}`, passed: 0, total: spec.cases.length, results: [] };
  }

  const target = spec.run ? mod : spec.cls ? resolveExport(mod, spec.cls) : resolveExport(mod, spec.fn);
  if (!spec.run && typeof target !== 'function') {
    return {
      ok: false,
      loadError: `Could not find ${spec.cls ? 'class' : 'function'} "${spec.cls || spec.fn}" — did you keep the module.exports line?`,
      passed: 0,
      total: spec.cases.length,
      results: [],
    };
  }

  const results = spec.cases.map((c, i) => {
    const name = c.name || `Case ${i + 1}`;
    try {
      const r = spec.cls ? runClassCase(target, spec, c) : runFunctionCase(target, spec, c);
      return {
        name,
        pass: r.pass,
        ms: Math.round(r.ms * 100) / 100,
        input: preview(r.input),
        expected: preview(r.expected),
        actual: preview(r.actual),
      };
    } catch (err) {
      const where = (err.stack || '').split('\n').find((l) => l.includes(file));
      return {
        name,
        pass: false,
        input: preview(c.args ?? { ops: c.ops, args: c.args }),
        expected: preview(c.expected),
        error: `${err.name}: ${err.message}${where ? '\n' + where.trim() : ''}`,
      };
    }
  });

  const passed = results.filter((r) => r.pass).length;
  return { ok: passed === results.length, passed, total: results.length, results };
}

module.exports = { runLoaded, comparers, deepEqual, preview };
