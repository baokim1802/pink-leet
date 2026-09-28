module.exports = {
  fn: 'numDistinct',
  cases: [
    { args: ['rabbbit', 'rabbit'], expected: 3 },
    { args: ['babgbag', 'bag'], expected: 5 },
    { name: 'no match', args: ['a', 'b'], expected: 0 },
    { name: 'identical single char', args: ['a', 'a'], expected: 1 },
    { name: 't longer than s', args: ['abc', 'abcd'], expected: 0 },
    { name: 'repeated letter, single target', args: ['aaa', 'a'], expected: 3 },
    { name: 'choose 2 of 4', args: ['aaaa', 'aa'], expected: 6 },
    { name: 'order matters', args: ['ba', 'ab'], expected: 0 },
    { name: 'case sensitive', args: ['aAa', 'A'], expected: 1 },
    { name: 'choose 15 of 30', args: ['a'.repeat(30), 'a'.repeat(15)], expected: 155117520 },
    { name: 'long s, short t', args: ['abc'.repeat(333) + 'a', 'abc'], expected: 6209895 },
  ],
};
