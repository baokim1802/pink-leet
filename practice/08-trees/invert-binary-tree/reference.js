/**
 * Invert Binary Tree — recursive DFS, swap children at every node.
 * Time O(n), Space O(h) for the call stack
 */
function invertTree(root) {
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  return root;
}

module.exports = invertTree;
