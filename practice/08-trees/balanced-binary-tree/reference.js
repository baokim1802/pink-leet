/**
 * Balanced Binary Tree — post-order DFS with an "unbalanced" sentinel.
 * Time O(n), Space O(h) for the call stack
 *
 * height(node) returns the subtree's height, or -1 if any node inside it is
 * unbalanced. Each node is visited once, and -1 short-circuits upward.
 */
function isBalanced(root) {
  function height(node) {
    if (!node) return 0;
    const left = height(node.left);
    if (left === -1) return -1;
    const right = height(node.right);
    if (right === -1) return -1;
    if (Math.abs(left - right) > 1) return -1;
    return 1 + Math.max(left, right);
  }
  return height(root) !== -1;
}

module.exports = isBalanced;
