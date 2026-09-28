const { arrayToTree } = require('../../../lib/structures');

module.exports = {
  fn: 'isBalanced',
  prepare: ([arr]) => [arrayToTree(arr)],
  cases: [
    { args: [[3, 9, 20, null, null, 15, 7]], expected: true },
    { args: [[1, 2, 2, 3, 3, null, null, 4, 4]], expected: false },
    { name: 'empty tree', args: [[]], expected: true },
    { name: 'single node', args: [[1]], expected: true },
    { name: 'one child', args: [[1, 2]], expected: true },
    { name: 'chain of three', args: [[1, 2, null, 3]], expected: false },
    { name: 'root balanced, children not', args: [[1, 2, 2, 3, null, null, 3, 4, null, null, 4]], expected: false },
    { name: 'uneven but within 1 everywhere', args: [[1, 2, 3, 4, 5, 6, null, 8]], expected: true },
    { name: 'perfect tree', args: [[1, 2, 3, 4, 5, 6, 7]], expected: true },
  ],
};
