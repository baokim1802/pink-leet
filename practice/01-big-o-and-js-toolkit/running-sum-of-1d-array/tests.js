module.exports = {
  fn: 'runningSum',
  cases: [
    { args: [[1, 2, 3, 4]], expected: [1, 3, 6, 10] },
    { args: [[1, 1, 1, 1, 1]], expected: [1, 2, 3, 4, 5] },
    { args: [[3, 1, 2, 10, 1]], expected: [3, 4, 6, 16, 17] },
    { name: 'single element', args: [[7]], expected: [7] },
    { name: 'negatives', args: [[-1, -2, 3, -4]], expected: [-1, -3, 0, -4] },
    { name: 'zeros', args: [[0, 0, 0]], expected: [0, 0, 0] },
    { name: 'large values', args: [[1000000, 1000000, -1000000, 1000000]], expected: [1000000, 2000000, 1000000, 2000000] },
  ],
};
