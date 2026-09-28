module.exports = {
  fn: 'fib',
  cases: [
    { args: [2], expected: 1 },
    { args: [3], expected: 2 },
    { args: [4], expected: 3 },
    { name: 'n = 0', args: [0], expected: 0 },
    { name: 'n = 1', args: [1], expected: 1 },
    { args: [10], expected: 55 },
    { args: [20], expected: 6765 },
    { name: 'maximum n (naive recursion is slow)', args: [30], expected: 832040 },
  ],
};
