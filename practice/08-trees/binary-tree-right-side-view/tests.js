const { arrayToTree } = require('../../../lib/structures');

module.exports = {
  fn: 'rightSideView',
  prepare: ([arr]) => [arrayToTree(arr)],
  cases: [
    { args: [[1, 2, 3, null, 5, null, 4]], expected: [1, 3, 4] },
    { args: [[1, null, 3]], expected: [1, 3] },
    { name: 'empty tree', args: [[]], expected: [] },
    { name: 'single node', args: [[1]], expected: [1] },
    { name: 'left node visible on a deeper level', args: [[1, 2, 3, 4]], expected: [1, 3, 4] },
    { name: 'left subtree is deeper', args: [[1, 2, 3, 4, 5, null, null, 6]], expected: [1, 3, 5, 6] },
    { name: 'left chain', args: [[1, 2, null, 3]], expected: [1, 2, 3] },
    { name: 'negative values', args: [[-1, -2, -3]], expected: [-1, -3] },
  ],
};
