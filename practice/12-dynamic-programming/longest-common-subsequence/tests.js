module.exports = {
  fn: 'longestCommonSubsequence',
  cases: [
    { args: ['abcde', 'ace'], expected: 3 },
    { args: ['abc', 'abc'], expected: 3 },
    { args: ['abc', 'def'], expected: 0 },
    { name: 'single matching char', args: ['a', 'a'], expected: 1 },
    { name: 'repeated letters', args: ['bl', 'yby'], expected: 1 },
    { name: 'one string inside the other', args: ['abcba', 'abcbcba'], expected: 5 },
    { name: 'scattered match', args: ['aggtab', 'gxtxayb'], expected: 4 },
    { name: 'order matters', args: ['ezupkr', 'ubmrapg'], expected: 2 },
    { name: 'long strings', args: ['a'.repeat(1000), 'ba'.repeat(250)], expected: 250 },
    { name: 'long, no overlap', args: ['x'.repeat(1000), 'y'.repeat(1000)], expected: 0 },
  ],
};
