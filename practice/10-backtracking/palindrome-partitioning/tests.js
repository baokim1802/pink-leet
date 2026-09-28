// Every way to cut a string of identical letters is valid: each of the n-1 gaps
// is either cut or not, so there are 2^(n-1) partitions. Built via bitmasks.
const allCuts = (s) => {
  const out = [];
  for (let mask = 0; mask < 1 << (s.length - 1); mask++) {
    const parts = [];
    let start = 0;
    for (let i = 0; i < s.length - 1; i++) {
      if (mask & (1 << i)) { parts.push(s.slice(start, i + 1)); start = i + 1; }
    }
    parts.push(s.slice(start));
    out.push(parts);
  }
  return out;
};

// The list of partitions can be in any order, but the pieces INSIDE a
// partition must stay in left-to-right order. So we sort only the outer list
// (by JSON) and compare each partition exactly.
const byJson = (arr) => arr.map((p) => JSON.stringify(p)).sort();

module.exports = {
  fn: 'partition',
  compare: (actual, expected) =>
    Array.isArray(actual) &&
    actual.length === expected.length &&
    JSON.stringify(byJson(actual)) === JSON.stringify(byJson(expected)),
  cases: [
    { args: ['aab'], expected: [['a', 'a', 'b'], ['aa', 'b']] },
    { name: 'single character', args: ['a'], expected: [['a']] },
    { name: 'no palindromes longer than 1', args: ['abc'], expected: [['a', 'b', 'c']] },
    { name: 'even palindrome', args: ['abba'], expected: [['a', 'b', 'b', 'a'], ['a', 'bb', 'a'], ['abba']] },
    {
      name: 'all the same letter',
      args: ['aaa'],
      expected: [['a', 'a', 'a'], ['a', 'aa'], ['aa', 'a'], ['aaa']],
    },
    {
      name: 'odd palindrome',
      args: ['racecar'],
      expected: [
        ['r', 'a', 'c', 'e', 'c', 'a', 'r'],
        ['r', 'a', 'cec', 'a', 'r'],
        ['r', 'aceca', 'r'],
        ['racecar'],
      ],
    },
    {
      name: 'overlapping palindromes',
      args: ['efe'],
      expected: [['e', 'f', 'e'], ['efe']],
    },
    {
      name: 'piece order matters',
      args: ['abbab'],
      expected: [
        ['a', 'b', 'b', 'a', 'b'],
        ['a', 'b', 'bab'],
        ['a', 'bb', 'a', 'b'],
        ['abba', 'b'],
      ],
    },
    { name: 'larger: 12 identical letters (2048 partitions)', args: ['aaaaaaaaaaaa'], expected: allCuts('aaaaaaaaaaaa') },
  ],
};
