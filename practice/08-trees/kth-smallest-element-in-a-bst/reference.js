/**
 * Kth Smallest Element in a BST — iterative in-order traversal, stop at k.
 * Time O(h + k), Space O(h)
 *
 * In-order visits a BST's values in ascending order. Walk it with an explicit
 * stack and return the k-th value popped, without visiting the rest.
 */
function kthSmallest(root, k) {
  const stack = [];
  let node = root;
  while (node || stack.length) {
    while (node) {
      stack.push(node);
      node = node.left;
    }
    node = stack.pop();
    if (--k === 0) return node.val;
    node = node.right;
  }
  return -1;
}

module.exports = kthSmallest;
