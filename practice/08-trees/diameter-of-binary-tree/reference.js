/**
 * Diameter of Binary Tree — post-order DFS returning heights.
 * Time O(n), Space O(h) for the call stack
 *
 * depth(node) returns how many nodes long the deepest downward path from
 * `node` is. The longest path that bends at `node` has
 * depth(left) + depth(right) edges; track the max of that across all nodes.
 */
function diameterOfBinaryTree(root) {
  let best = 0;
  function depth(node) {
    if (!node) return 0;
    const left = depth(node.left);
    const right = depth(node.right);
    best = Math.max(best, left + right);
    return 1 + Math.max(left, right);
  }
  depth(root);
  return best;
}

module.exports = diameterOfBinaryTree;
