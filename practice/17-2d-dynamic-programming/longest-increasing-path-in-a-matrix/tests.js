// Diagonal ramp: value = r + c. Lots of equal-length paths, so un-memoized DFS explodes.
const ramp = Array.from({ length: 100 }, (_, r) => Array.from({ length: 100 }, (_, c) => r + c));
// Snake: 1..2500 winding left-right, then right-left, row by row.
const snake = Array.from({ length: 50 }, (_, r) =>
  Array.from({ length: 50 }, (_, c) => r * 50 + (r % 2 === 0 ? c : 49 - c) + 1));

module.exports = {
  fn: 'longestIncreasingPath',
  cases: [
    { args: [[[9, 9, 4], [6, 6, 8], [2, 1, 1]]], expected: 4 },
    { args: [[[3, 4, 5], [3, 2, 6], [2, 2, 1]]], expected: 4 },
    { name: 'single cell', args: [[[1]]], expected: 1 },
    { name: 'all equal', args: [[[7, 7], [7, 7]]], expected: 1 },
    { name: 'goes around a corner', args: [[[1, 2], [4, 3]]], expected: 4 },
    { name: 'single row', args: [[[1, 3, 2]]], expected: 2 },
    { name: 'single column', args: [[[3], [2], [1]]], expected: 3 },
    { name: '3x3 snake', args: [[[1, 2, 3], [6, 5, 4], [7, 8, 9]]], expected: 9 },
    { name: 'large values', args: [[[2147483647, 0], [2147483646, 1]]], expected: 4 },
    { name: '100x100 diagonal ramp', args: [ramp], expected: 199 },
    { name: '50x50 snake', args: [snake], expected: 2500 },
  ],
};
