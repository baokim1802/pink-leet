/**
 * Binary Tree Maximum Path Sum — post-order DFS with "one-sided gain".
 * Time O(n), Space O(h) for the call stack
 *
 * gain(node) = best sum of a downward path starting at node (never negative
 * contributions from children, since we can just not take them). The best
 * path that bends at node uses both sides: node.val + left + right. Track the
 * max bend globally, but return only one side upward because a parent can't
 * branch into both.
 */
function maxPathSum(root) {
  let best = -Infinity;
  function gain(node) {
    if (!node) return 0;
    const left = Math.max(0, gain(node.left));
    const right = Math.max(0, gain(node.right));
    best = Math.max(best, node.val + left + right);
    return node.val + Math.max(left, right);
  }
  gain(root);
  return best;
}

module.exports = maxPathSum;
