// Runs a practice problem's tests.js against its solution.js (or another file).
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

const path = require('path');
const util = require('util');

// -0 and 0 print the same and LeetCode treats them as equal, so normalize before comparing.
function normalize(v) {
  if (Object.is(v, -0)) return 0;
  if (Array.isArray(v)) return v.map(normalize);
  if (v && typeof v === 'object' && Object.getPrototypeOf(v) === Object.prototype) {
    return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, normalize(x)]));
  }
  return v;
}

function deepEqual(a, b) {
  return util.isDeepStrictEqual(normalize(a), normalize(b));
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
    s = s === undefined ? 'undefined' : s.replace(/"__undefined__"/g, 'undefined');
  } catch {
    s = util.inspect(v, { depth: 3 });
  }
  return s.length > max ? s.slice(0, max) + '…' : s;
}

function resolveExport(mod, name) {
  if (!name) return typeof mod === 'function' ? mod : Object.values(mod).find((v) => typeof v === 'function');
  if (typeof mod === 'function' && (mod.name === name || !mod[name])) return mod;
  return mod[name];
}

function runFunctionCase(fn, spec, c) {
  let args = structuredClone(c.args);
  const displayArgs = c.args;
  if (spec.prepare) args = spec.prepare(args);
  const t0 = process.hrtime.bigint();
  let actual = spec.run ? spec.run(fn, args) : fn(...args);
  const ms = Number(process.hrtime.bigint() - t0) / 1e6;
  // In-place problems (e.g. "modify nums in place") report the mutated argument.
  if (spec.inPlace !== undefined) actual = args[spec.inPlace];
  if (spec.transform) actual = spec.transform(actual, args);
  const cmp = typeof spec.compare === 'function' ? spec.compare : comparers[spec.compare || 'exact'];
  return { input: displayArgs, expected: c.expected, actual, pass: !!cmp(actual, c.expected, displayArgs), ms };
}

function runClassCase(Cls, spec, c) {
  const out = [];
  let obj = null;
  const t0 = process.hrtime.bigint();
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
  const ms = Number(process.hrtime.bigint() - t0) / 1e6;
  const cmp = typeof spec.compare === 'function' ? spec.compare : comparers[spec.compare || 'exact'];
  return { input: { ops: c.ops, args: c.args }, expected: c.expected, actual: out, pass: !!cmp(out, c.expected), ms };
}

/**
 * @param {string} problemDir absolute path of the problem folder
 * @param {string} file solution file name inside the folder
 */
function runProblem(problemDir, file = 'solution.js') {
  const spec = require(path.join(problemDir, 'tests.js'));
  let mod;
  try {
    mod = require(path.join(problemDir, file));
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

module.exports = { runProblem, comparers, deepEqual };
