// large: 10^4 numbers and 10^4 queries for the whole array
const N = 10000;
const bigNums = Array.from({ length: N }, (_, i) => (i % 2 ? -i : i));
const bigTotal = bigNums.reduce((a, b) => a + b, 0);

module.exports = {
  cls: 'NumArray',
  cases: [
    {
      ops: ['NumArray', 'sumRange', 'sumRange', 'sumRange'],
      args: [[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]],
      expected: [null, 1, -1, -3],
    },
    {
      name: 'single element',
      ops: ['NumArray', 'sumRange'],
      args: [[[7]], [0, 0]],
      expected: [null, 7],
    },
    {
      name: 'one-element slices',
      ops: ['NumArray', 'sumRange', 'sumRange', 'sumRange'],
      args: [[[4, -2, 9]], [0, 0], [1, 1], [2, 2]],
      expected: [null, 4, -2, 9],
    },
    {
      name: 'slice not starting at 0',
      ops: ['NumArray', 'sumRange', 'sumRange'],
      args: [[[1, 2, 3, 4, 5]], [1, 3], [3, 4]],
      expected: [null, 9, 9],
    },
    {
      name: 'large, many queries',
      ops: ['NumArray', ...new Array(N).fill('sumRange')],
      args: [[bigNums], ...new Array(N).fill([0, N - 1])],
      expected: [null, ...new Array(N).fill(bigTotal)],
    },
  ],
};
