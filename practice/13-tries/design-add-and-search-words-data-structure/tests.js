// Larger case: a deterministic pseudo-random dictionary and queries, with the
// expected answers computed by brute force (compare the pattern against every
// word, character by character).
const makeLarge = () => {
  let seed = 12345; // tiny "minimal standard" LCG, safe within double precision
  const rand = (n) => {
    seed = (seed * 48271) % 2147483647;
    return seed % n;
  };
  const randWord = () => {
    let w = '';
    const len = 1 + rand(8);
    for (let i = 0; i < len; i++) w += 'abcde'[rand(5)];
    return w;
  };
  const words = Array.from({ length: 2000 }, randWord);
  const patterns = Array.from({ length: 1000 }, () => {
    const p = randWord().split('');
    const dots = rand(3); // 0, 1 or 2 dots
    for (let d = 0; d < dots; d++) p[rand(p.length)] = '.';
    return p.join('');
  });
  const matches = (w, p) => w.length === p.length && [...p].every((ch, i) => ch === '.' || ch === w[i]);
  const ops = ['WordDictionary'];
  const args = [[]];
  const expected = [null];
  const added = [];
  // interleave: add 2 words, then run 1 query against what's been added so far
  for (let q = 0; q < patterns.length; q++) {
    for (const w of words.slice(2 * q, 2 * q + 2)) {
      ops.push('addWord'); args.push([w]); expected.push(null); added.push(w);
    }
    ops.push('search'); args.push([patterns[q]]); expected.push(added.some((w) => matches(w, patterns[q])));
  }
  return { name: 'larger: 2000 words, 1000 interleaved searches', ops, args, expected };
};

module.exports = {
  cls: 'WordDictionary',
  cases: [
    {
      ops: ['WordDictionary', 'addWord', 'addWord', 'addWord', 'search', 'search', 'search', 'search'],
      args: [[], ['bad'], ['dad'], ['mad'], ['pad'], ['bad'], ['.ad'], ['b..']],
      expected: [null, null, null, null, false, true, true, true],
    },
    {
      name: 'empty dictionary',
      ops: ['WordDictionary', 'search', 'search'],
      args: [[], ['a'], ['.']],
      expected: [null, false, false],
    },
    {
      name: 'a dot matches exactly one letter',
      ops: ['WordDictionary', 'addWord', 'search', 'search', 'search'],
      args: [[], ['a'], ['.'], ['..'], ['a.']],
      expected: [null, null, true, false, false],
    },
    {
      name: 'prefix of a word is not a match',
      ops: ['WordDictionary', 'addWord', 'search', 'search', 'search', 'search'],
      args: [[], ['abc'], ['ab'], ['ab.'], ['...'], ['....']],
      expected: [null, null, false, true, true, false],
    },
    {
      name: 'mixed lengths',
      ops: ['WordDictionary', 'addWord', 'addWord', 'addWord', 'addWord', 'search', 'search', 'search', 'search', 'search', 'search', 'search', 'search'],
      args: [[], ['at'], ['and'], ['an'], ['add'], ['a'], ['.at'], ['an.'], ['a.d'], ['.'], ['..'], ['.a'], ['b.']],
      expected: [null, null, null, null, null, false, false, true, true, false, true, false, false],
    },
    {
      name: 'wildcard must backtrack to another branch',
      ops: ['WordDictionary', 'addWord', 'addWord', 'search', 'search', 'search', 'search'],
      args: [[], ['abcd'], ['abxe'], ['ab.e'], ['ab.d'], ['ab.f'], ['a..e']],
      expected: [null, null, null, true, true, false, true],
    },
    {
      name: 'search, then add, then search again',
      ops: ['WordDictionary', 'search', 'addWord', 'search', 'search'],
      args: [[], ['x'], ['x'], ['x'], ['.']],
      expected: [null, false, null, true, true],
    },
    makeLarge(),
  ],
};
