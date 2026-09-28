const { arrayToTree, TreeNode, treeToArray } = require('../../../lib/structures');

// Balanced BST holding 1..1023, converted to a level-order array.
function balanced(lo, hi) {
  if (lo > hi) return null;
  const mid = (lo + hi) >> 1;
  return new TreeNode(mid, balanced(lo, mid - 1), balanced(mid + 1, hi));
}
const big = treeToArray(balanced(1, 1023));

module.exports = {
  fn: 'kthSmallest',
  prepare: ([arr, k]) => [arrayToTree(arr), k],
  cases: [
    { args: [[3, 1, 4, null, 2], 1], expected: 1 },
    { args: [[5, 3, 6, 2, 4, null, null, 1], 3], expected: 3 },
    { name: 'single node', args: [[1], 1], expected: 1 },
    { name: 'k = n (the maximum)', args: [[3, 1, 4, null, 2], 4], expected: 4 },
    { args: [[5, 3, 6, 2, 4, null, null, 1], 6], expected: 6 },
    { name: 'right-skewed', args: [[1, null, 2, null, 3], 2], expected: 2 },
    { name: 'negative values', args: [[0, -10, 10, -20, -5], 2], expected: -10 },
    { name: '1023-node balanced BST', args: [big, 500], expected: 500 },
  ],
};
