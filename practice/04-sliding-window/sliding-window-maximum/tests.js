// large: strictly decreasing array → every window's max is its first element
const N = 50000;
const big = Array.from({ length: N }, (_, i) => N - i);
const K = 1000;

module.exports = {
  fn: 'maxSlidingWindow',
  cases: [
    { args: [[1, 3, -1, -3, 5, 3, 6, 7], 3], expected: [3, 3, 5, 5, 6, 7] },
    { name: 'single element', args: [[1], 1], expected: [1] },
    { name: 'k = 1 returns the array', args: [[4, -2, 7], 1], expected: [4, -2, 7] },
    { name: 'k = n returns the overall max', args: [[2, 9, 4, 1], 4], expected: [9] },
    { name: 'duplicates', args: [[5, 5, 5, 5], 2], expected: [5, 5, 5] },
    { name: 'negatives', args: [[-7, -8, 7, 5, 7, 1, 6, 0], 4], expected: [7, 7, 7, 7, 7] },
    { name: 'decreasing', args: [[9, 8, 7, 6, 5], 2], expected: [9, 8, 7, 6] },
    { name: 'increasing', args: [[1, 2, 3, 4, 5], 3], expected: [3, 4, 5] },
    { args: [[1, -1], 1], expected: [1, -1] },
    { args: [[9, 10, 9, -7, -4, -8, 2, -6], 5], expected: [10, 10, 9, 2] },
    {
      name: 'large, decreasing',
      args: [big, K],
      expected: Array.from({ length: N - K + 1 }, (_, i) => N - i),
    },
  ],
};
