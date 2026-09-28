const { arrayToTree, treeToArray } = require('../../../lib/structures');

module.exports = {
  fn: 'invertTree',
  prepare: ([arr]) => [arrayToTree(arr)],
  transform: (root) => treeToArray(root),
  cases: [
    { args: [[4, 2, 7, 1, 3, 6, 9]], expected: [4, 7, 2, 9, 6, 3, 1] },
    { args: [[2, 1, 3]], expected: [2, 3, 1] },
    { name: 'empty tree', args: [[]], expected: [] },
    { name: 'single node', args: [[1]], expected: [1] },
    { name: 'only left child', args: [[1, 2]], expected: [1, null, 2] },
    { name: 'only right child', args: [[1, null, 2]], expected: [1, 2] },
    { name: 'lopsided', args: [[1, 2, 3, 4, 5]], expected: [1, 3, 2, null, null, 5, 4] },
    { name: 'negatives', args: [[0, -1, -2]], expected: [0, -2, -1] },
  ],
};
