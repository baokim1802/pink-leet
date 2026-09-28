/**
 * Same Tree — walk both trees in lockstep.
 * Time O(n), Space O(h) for the call stack
 *
 * Two empty trees match; one empty and one not don't. Otherwise the roots'
 * values must be equal and both pairs of subtrees must match recursively.
 */
function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q || p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

module.exports = isSameTree;
