// large: 20000 zeros, k = 0 → every subarray counts: n * (n + 1) / 2
const N = 20000;

module.exports = {
  fn: 'subarraySum',
  cases: [
    { args: [[1, 1, 1], 2], expected: 2 },
    { args: [[1, 2, 3], 3], expected: 2 },
    { args: [[1, -1, 0], 0], expected: 3 },
    { name: 'single element match', args: [[5], 5], expected: 1 },
    { name: 'single element no match', args: [[5], 3], expected: 0 },
    { name: 'negatives', args: [[3, 4, 7, 2, -3, 1, 4, 2], 7], expected: 4 },
    { name: 'negative k', args: [[-1, -1, 1], -1], expected: 3 },
    { name: 'no subarray', args: [[1, 2, 3], 7], expected: 0 },
    { name: 'whole array', args: [[2, -1, 4], 5], expected: 1 },
    { name: 'large, all zeros', args: [new Array(N).fill(0), 0], expected: (N * (N + 1)) / 2 },
  ],
};
