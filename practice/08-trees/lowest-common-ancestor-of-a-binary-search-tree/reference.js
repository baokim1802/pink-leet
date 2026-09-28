/**
 * Lowest Common Ancestor of a BST — walk down from the root using BST order.
 * Time O(h), Space O(1)
 *
 * While both targets are on the same side of the current node, move to that
 * side. The first node where they split (or that equals one of them) is the LCA.
 */
function lowestCommonAncestor(root, p, q) {
  let node = root;
  while (node) {
    if (p.val < node.val && q.val < node.val) node = node.left;
    else if (p.val > node.val && q.val > node.val) node = node.right;
    else return node;
  }
  return null;
}

module.exports = lowestCommonAncestor;
