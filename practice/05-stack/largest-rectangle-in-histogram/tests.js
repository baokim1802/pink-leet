// large: heights 1, 2, ..., N. Best is height k over the last N - k + 1 bars,
// i.e. max of k * (N - k + 1), which peaks at k = N / 2 for even N.
const N = 20000;
const big = Array.from({ length: N }, (_, i) => i + 1);

module.exports = {
  fn: 'largestRectangleArea',
  cases: [
    { args: [[2, 1, 5, 6, 2, 3]], expected: 10 },
    { args: [[2, 4]], expected: 4 },
    { name: 'single bar', args: [[7]], expected: 7 },
    { name: 'single zero', args: [[0]], expected: 0 },
    { name: 'all equal', args: [[3, 3, 3, 3]], expected: 12 },
    { name: 'increasing', args: [[1, 2, 3, 4, 5]], expected: 9 },
    { name: 'decreasing', args: [[5, 4, 3, 2, 1]], expected: 9 },
    { name: 'zeros split the histogram', args: [[4, 4, 0, 3, 3, 3]], expected: 9 },
    { name: 'short wide beats tall narrow', args: [[1, 1, 1, 1, 1, 1, 6]], expected: 7 },
    { args: [[6, 2, 5, 4, 5, 1, 6]], expected: 12 },
    { name: 'large increasing', args: [big], expected: (N / 2) * (N / 2 + 1) },
  ],
};
