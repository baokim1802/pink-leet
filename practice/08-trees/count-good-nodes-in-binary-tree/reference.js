/**
 * Count Good Nodes in Binary Tree — DFS carrying the path maximum.
 * Time O(n), Space O(h) for the call stack
 *
 * A node is good when it's >= every value above it, i.e. >= the running max
 * of its root-to-node path. Pass that max down and sum the good nodes up.
 */
function goodNodes(root) {
  function dfs(node, maxSoFar) {
    if (!node) return 0;
    const good = node.val >= maxSoFar ? 1 : 0;
    const nextMax = Math.max(maxSoFar, node.val);
    return good + dfs(node.left, nextMax) + dfs(node.right, nextMax);
  }
  return dfs(root, -Infinity);
}

module.exports = goodNodes;
