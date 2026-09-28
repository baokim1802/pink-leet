module.exports = {
  fn: 'climbStairs',
  cases: [
    { args: [2], expected: 2 },
    { args: [3], expected: 3 },
    { name: 'single step', args: [1], expected: 1 },
    { args: [4], expected: 5 },
    { args: [5], expected: 8 },
    { args: [10], expected: 89 },
    { name: 'needs memoization', args: [30], expected: 1346269 },
    { name: 'maximum n', args: [45], expected: 1836311903 },
  ],
};
