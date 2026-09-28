/**
 * Maximum Depth of Binary Tree — recursive DFS.
 * Time O(n), Space O(h) for the call stack (h = tree height)
 *
 * An empty tree has depth 0; otherwise a node adds one level on top
 * of its deeper child.
 */
function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

module.exports = maxDepth;
