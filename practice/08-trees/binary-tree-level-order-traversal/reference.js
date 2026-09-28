/**
 * Binary Tree Level Order Traversal — BFS one level at a time.
 * Time O(n), Space O(w) where w is the widest level
 *
 * Keep the current level as an array. For each level, record its values
 * and collect all children (left then right) into the next level.
 * No shift() needed, so every step is O(1).
 */
function levelOrder(root) {
  const result = [];
  let level = root ? [root] : [];
  while (level.length) {
    const values = [];
    const next = [];
    for (const node of level) {
      values.push(node.val);
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    result.push(values);
    level = next;
  }
  return result;
}

module.exports = levelOrder;
