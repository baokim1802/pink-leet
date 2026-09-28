module.exports = {
  fn: 'findTargetSumWays',
  cases: [
    { args: [[1, 1, 1, 1, 1], 3], expected: 5 },
    { args: [[1], 1], expected: 1 },
    { name: 'unreachable single', args: [[1], 2], expected: 0 },
    { name: 'zeros double the count', args: [[0, 0, 0], 0], expected: 8 },
    { name: 'zero plus a one', args: [[1, 0], 1], expected: 2 },
    { name: 'negative target', args: [[1, 2, 3], -2], expected: 1 },
    { name: 'target beyond the total', args: [[1, 2], 10], expected: 0 },
    { name: 'wrong parity', args: [[1, 1, 1, 1], 1], expected: 0 },
    { name: 'one big number, negative', args: [[1000], -1000], expected: 1 },
    { name: 'twenty ones', args: [new Array(20).fill(1), 0], expected: 184756 },
    { name: 'twenty mixed numbers', args: [[7, 3, 0, 12, 5, 9, 1, 4, 8, 2, 6, 11, 0, 3, 10, 5, 7, 1, 2, 4], 14], expected: 26348 },
  ],
};
