const { TreeNode, treeToArray } = require('../../../lib/structures');

// Large case: a perfect tree with 1023 nodes whose values are their level-order
// index, so the expected level-order array is simply [0, 1, ..., 1022].
const SIZE = 1023;
function perfect(i) {
  return i < SIZE ? new TreeNode(i, perfect(2 * i + 1), perfect(2 * i + 2)) : null;
}
const bigRoot = perfect(0);
const bigPre = [];
const bigIn = [];
(function walk(n) {
  if (!n) return;
  bigPre.push(n.val);
  walk(n.left);
  walk(n.right);
})(bigRoot);
(function walk(n) {
  if (!n) return;
  walk(n.left);
  bigIn.push(n.val);
  walk(n.right);
})(bigRoot);

module.exports = {
  fn: 'buildTree',
  transform: (root) => treeToArray(root),
  cases: [
    { args: [[3, 9, 20, 15, 7], [9, 3, 15, 20, 7]], expected: [3, 9, 20, null, null, 15, 7] },
    { name: 'single node', args: [[-1], [-1]], expected: [-1] },
    { name: 'left child', args: [[1, 2], [2, 1]], expected: [1, 2] },
    { name: 'right child', args: [[1, 2], [1, 2]], expected: [1, null, 2] },
    { name: 'left chain', args: [[1, 2, 3], [3, 2, 1]], expected: [1, 2, null, 3] },
    { name: 'right chain', args: [[1, 2, 3, 4], [1, 2, 3, 4]], expected: [1, null, 2, null, 3, null, 4] },
    { name: 'perfect tree', args: [[1, 2, 4, 5, 3, 6, 7], [4, 2, 5, 1, 6, 3, 7]], expected: [1, 2, 3, 4, 5, 6, 7] },
    { args: [[3, 1, 2, 4], [1, 2, 3, 4]], expected: [3, 1, 4, null, 2] },
    { name: '1023 nodes', args: [bigPre, bigIn], expected: Array.from({ length: SIZE }, (_, i) => i) },
  ],
};
