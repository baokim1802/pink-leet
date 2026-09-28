const { arrayToTree } = require('../../../lib/structures');

module.exports = {
  fn: 'goodNodes',
  prepare: ([arr]) => [arrayToTree(arr)],
  cases: [
    { args: [[3, 1, 4, 3, null, 1, 5]], expected: 4 },
    { args: [[3, 3, null, 4, 2]], expected: 3 },
    { name: 'single node', args: [[1]], expected: 1 },
    { name: 'all equal values count', args: [[2, 2, 2, 2]], expected: 4 },
    { name: 'only the root is good', args: [[5, 4, 3, 2, 1]], expected: 1 },
    { name: 'increasing chain', args: [[1, null, 2, null, 3]], expected: 3 },
    { name: 'negative values', args: [[-1, -5, -2, null, null, -1]], expected: 2 },
    { args: [[2, null, 4, 10, 8, null, null, 4]], expected: 4 },
  ],
};
