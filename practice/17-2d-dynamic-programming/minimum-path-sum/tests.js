const big = Array.from({ length: 200 }, (_, r) => Array.from({ length: 200 }, (_, c) => (r * 7 + c * 13 + r * c) % 10));

module.exports = {
  fn: 'minPathSum',
  cases: [
    { args: [[[1, 3, 1], [1, 5, 1], [4, 2, 1]]], expected: 7 },
    { args: [[[1, 2, 3], [4, 5, 6]]], expected: 12 },
    { name: 'single cell', args: [[[5]]], expected: 5 },
    { name: 'single row', args: [[[1, 2, 3, 4]]], expected: 10 },
    { name: 'single column', args: [[[1], [2], [3]]], expected: 6 },
    { name: 'all zeros', args: [[[0, 0], [0, 0]]], expected: 0 },
    { name: 'greedy trap', args: [[[1, 1, 9], [4, 8, 9], [1, 1, 1]]], expected: 8 },
    { name: 'cheap detour around a wall', args: [[[1, 9, 1, 1], [1, 9, 1, 9], [1, 1, 1, 1]]], expected: 6 },
    { name: '200x200 grid', args: [big], expected: 1277 },
  ],
};
