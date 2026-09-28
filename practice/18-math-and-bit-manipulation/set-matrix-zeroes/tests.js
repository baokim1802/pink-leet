module.exports = {
  fn: 'setZeroes',
  inPlace: 0,
  cases: [
    { args: [[[1, 1, 1], [1, 0, 1], [1, 1, 1]]], expected: [[1, 0, 1], [0, 0, 0], [1, 0, 1]] },
    { args: [[[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]], expected: [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]] },
    { name: 'no zeros', args: [[[1, 2], [3, 4]]], expected: [[1, 2], [3, 4]] },
    { name: '1x1 zero', args: [[[0]]], expected: [[0]] },
    { name: 'zero only in first row', args: [[[1, 0, 3], [4, 5, 6]]], expected: [[0, 0, 0], [4, 0, 6]] },
    { name: 'zero only in first column', args: [[[1, 2], [0, 4], [5, 6]]], expected: [[0, 2], [0, 0], [0, 6]] },
    { name: 'zero in the corner', args: [[[0, 1], [1, 1]]], expected: [[0, 0], [0, 1]] },
    {
      name: 'negatives and several zeros',
      args: [[[-1, 0, -3], [-4, -5, -6], [0, -8, -9]]],
      expected: [[0, 0, 0], [0, 0, -6], [0, 0, 0]],
    },
    { name: 'single row', args: [[[1, 0, 2, 0, 3]]], expected: [[0, 0, 0, 0, 0]] },
    { name: 'single column', args: [[[1], [0], [2]]], expected: [[0], [0], [0]] },
    {
      name: 'extreme values',
      args: [[[2147483647, -2147483648], [-2147483648, 0]]],
      expected: [[2147483647, 0], [0, 0]],
    },
  ],
};
