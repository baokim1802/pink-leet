// large: 30000 zeros → every subarray sums to 0, which is divisible: n * (n + 1) / 2
const N = 30000;

module.exports = {
  fn: 'subarraysDivByK',
  cases: [
    { args: [[4, 5, 0, -2, -3, 1], 5], expected: 7 },
    { args: [[5], 9], expected: 0 },
    { name: 'single element divisible', args: [[6], 3], expected: 1 },
    { name: 'negative running total', args: [[-1, 2, 9], 2], expected: 2 },
    { name: 'negatives cancel out', args: [[2, -2, 2, -4], 6], expected: 2 },
    { name: 'all negative', args: [[-5, -10], 5], expected: 3 },
    { name: 'large, all zeros', args: [new Array(N).fill(0), 7], expected: (N * (N + 1)) / 2 },
  ],
};
