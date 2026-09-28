const { arrayToTree } = require('../../../lib/structures');

module.exports = {
  fn: 'isValidBST',
  prepare: ([arr]) => [arrayToTree(arr)],
  cases: [
    { args: [[2, 1, 3]], expected: true },
    { args: [[5, 1, 4, null, null, 3, 6]], expected: false },
    { name: 'single node', args: [[1]], expected: true },
    { name: 'grandchild breaks the rule', args: [[5, 4, 6, null, null, 3, 7]], expected: false },
    { name: 'duplicates are not allowed', args: [[2, 2, 2]], expected: false },
    { name: 'duplicate on the left', args: [[1, 1]], expected: false },
    { name: '32-bit extremes', args: [[-2147483648, null, 2147483647]], expected: true },
    { args: [[10, 5, 15, null, null, 12, 20]], expected: true },
    { name: 'perfect BST', args: [[3, 1, 5, 0, 2, 4, 6]], expected: true },
    { name: 'deep violation', args: [[32, 26, 47, 19, null, null, 56, null, 27]], expected: false },
  ],
};
