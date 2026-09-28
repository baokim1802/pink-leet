module.exports = {
  fn: 'orangesRotting',
  cases: [
    { args: [[[2, 1, 1], [1, 1, 0], [0, 1, 1]]], expected: 4 },
    { args: [[[2, 1, 1], [0, 1, 1], [1, 0, 1]]], expected: -1 },
    { name: 'no fresh oranges', args: [[[0, 2]]], expected: 0 },
    { name: 'completely empty', args: [[[0]]], expected: 0 },
    { name: 'fresh but nothing rotten', args: [[[1]]], expected: -1 },
    { name: 'two sources spread at once', args: [[[2, 1, 1, 1, 2]]], expected: 2 },
    { name: 'already all rotten', args: [[[2, 2], [2, 2]]], expected: 0 },
    { name: 'long single row', args: [[[2, 1, 1, 1, 1, 1, 1, 1, 1, 1]]], expected: 9 },
    {
      name: 'snake path around walls',
      args: [[
        [2, 1, 1],
        [0, 0, 1],
        [1, 1, 1],
      ]],
      expected: 6,
    },
  ],
};
