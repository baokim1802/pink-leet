const big = Array.from({ length: 100000 }, (_, i) => i * 2 - 100000);

module.exports = {
  fn: 'containsDuplicate',
  cases: [
    { args: [[1, 2, 3, 1]], expected: true },
    { args: [[1, 2, 3, 4]], expected: false },
    { args: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], expected: true },
    { name: 'single element', args: [[5]], expected: false },
    { name: 'two equal', args: [[7, 7]], expected: true },
    { name: 'negatives and zero', args: [[-1, 0, 1, -2, 2]], expected: false },
    { name: 'negative duplicate far apart', args: [[-1000000000, 3, 8, 1000000000, -1000000000]], expected: true },
    { name: 'large, all distinct', args: [big], expected: false },
    { name: 'large, one duplicate at the end', args: [[...big, 0]], expected: true },
  ],
};
