const { arrayToTree } = require('../../../lib/structures');

module.exports = {
  fn: 'maxDepth',
  prepare: ([arr]) => [arrayToTree(arr)],
  cases: [
    { args: [[3, 9, 20, null, null, 15, 7]], expected: 3 },
    { args: [[1, null, 2]], expected: 2 },
    { name: 'empty tree', args: [[]], expected: 0 },
    { name: 'single node', args: [[1]], expected: 1 },
    { name: 'left-skewed', args: [[1, 2, null, 3, null, 4]], expected: 4 },
    { name: 'perfect tree', args: [[1, 2, 3, 4, 5, 6, 7]], expected: 3 },
    { name: 'deep on one side', args: [[1, 2, 3, 4, null, null, null, 5]], expected: 4 },
    { name: 'negatives', args: [[-1, -2, -3, null, -4]], expected: 3 },
  ],
};
