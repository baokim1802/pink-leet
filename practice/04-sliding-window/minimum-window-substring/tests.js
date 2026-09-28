module.exports = {
  fn: 'minWindow',
  cases: [
    { args: ['ADOBECODEBANC', 'ABC'], expected: 'BANC' },
    { name: 'single char match', args: ['a', 'a'], expected: 'a' },
    { name: 't longer than s', args: ['a', 'aa'], expected: '' },
    { name: 'no match at all', args: ['abc', 'd'], expected: '' },
    { args: ['ab', 'b'], expected: 'b' },
    { name: 'duplicates in t', args: ['ADOBECODEBANC', 'AABC'], expected: 'ADOBECODEBA' },
    { name: 'whole string', args: ['aa', 'aa'], expected: 'aa' },
    { args: ['bba', 'ab'], expected: 'ba' },
    { name: 'case-sensitive', args: ['aA', 'A'], expected: 'A' },
    { args: ['cabwefgewcwaefgcf', 'cae'], expected: 'cwae' },
  ],
};
