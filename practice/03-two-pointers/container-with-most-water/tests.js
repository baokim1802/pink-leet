// large: 100000 lines of height 10000 → widest pair wins: 99999 × 10000
const N = 100000;

module.exports = {
  fn: 'maxArea',
  cases: [
    { args: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49 },
    { name: 'two lines', args: [[1, 1]], expected: 1 },
    { name: 'zero height', args: [[0, 5]], expected: 0 },
    { name: 'tall lines in the middle', args: [[1, 2, 100, 100, 2, 1]], expected: 100 },
    { name: 'increasing', args: [[1, 2, 3, 4, 5]], expected: 6 },
    { name: 'decreasing', args: [[5, 4, 3, 2, 1]], expected: 6 },
    { name: 'equal ends', args: [[4, 3, 2, 1, 4]], expected: 16 },
    { args: [[1, 2, 4, 3]], expected: 4 },
    { name: 'large, all equal', args: [new Array(N).fill(10000)], expected: (N - 1) * 10000 },
  ],
};
