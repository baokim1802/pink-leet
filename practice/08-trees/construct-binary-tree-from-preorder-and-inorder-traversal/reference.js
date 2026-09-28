const { TreeNode } = require('../../../lib/structures');

/**
 * Construct Binary Tree from Preorder and Inorder — divide and conquer.
 * Time O(n), Space O(n) for the index map (+ O(h) call stack)
 *
 * Pre-order hands out roots left to right. For each root, its position in the
 * in-order array splits the remaining values into the left and right
 * subtrees. A value -> index Map makes each split O(1), and a moving pointer
 * into `preorder` avoids slicing.
 */
function buildTree(preorder, inorder) {
  const indexOf = new Map(inorder.map((v, i) => [v, i]));
  let next = 0; // next root to take from preorder

  function build(lo, hi) {
    if (lo > hi) return null;
    const val = preorder[next++];
    const mid = indexOf.get(val);
    const node = new TreeNode(val);
    node.left = build(lo, mid - 1);
    node.right = build(mid + 1, hi);
    return node;
  }

  return build(0, inorder.length - 1);
}

module.exports = buildTree;
