/**
 * Validate Binary Search Tree — DFS carrying an open (low, high) range.
 * Time O(n), Space O(h) for the call stack
 *
 * Every node must fit strictly inside the bounds inherited from its ancestors.
 * Going left caps the range at the parent's value; going right floors it.
 */
function isValidBST(root) {
  function check(node, low, high) {
    if (!node) return true;
    if (node.val <= low || node.val >= high) return false;
    return check(node.left, low, node.val) && check(node.right, node.val, high);
  }
  return check(root, -Infinity, Infinity);
}

module.exports = isValidBST;
