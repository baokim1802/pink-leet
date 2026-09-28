/**
 * Subtree of Another Tree — try every node of `root` as a match start.
 * Time O(m * n), Space O(h) for the call stack
 *
 * For each node in `root`, check whether the tree hanging from it is identical
 * to `subRoot` using a lockstep "same tree" comparison.
 */
function isSame(a, b) {
  if (!a && !b) return true;
  if (!a || !b || a.val !== b.val) return false;
  return isSame(a.left, b.left) && isSame(a.right, b.right);
}

function isSubtree(root, subRoot) {
  if (!root) return false;
  return isSame(root, subRoot) || isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

module.exports = isSubtree;
