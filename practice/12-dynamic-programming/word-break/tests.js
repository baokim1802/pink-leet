module.exports = {
  fn: 'wordBreak',
  cases: [
    { args: ['leetcode', ['leet', 'code']], expected: true },
    { args: ['applepenapple', ['apple', 'pen']], expected: true },
    { args: ['catsandog', ['cats', 'dog', 'sand', 'and', 'cat']], expected: false },
    { name: 'single letter word', args: ['a', ['a']], expected: true },
    { name: 'no matching word', args: ['a', ['b']], expected: false },
    { name: 'greedy trap', args: ['cars', ['car', 'ca', 'rs']], expected: true },
    { name: 'mix of lengths', args: ['aaaaaaa', ['aaaa', 'aaa']], expected: true },
    { name: 'leftover letter', args: ['goalspecial', ['go', 'goal', 'goals', 'special', 'specia']], expected: true },
    { name: 'word longer than s', args: ['ab', ['abc', 'b']], expected: false },
    {
      name: 'exponential without memo',
      args: ['a'.repeat(150) + 'b', ['a', 'aa', 'aaa', 'aaaa', 'aaaaa', 'aaaaaa', 'aaaaaaa', 'aaaaaaaa', 'aaaaaaaaa', 'aaaaaaaaaa']],
      expected: false,
    },
  ],
};
