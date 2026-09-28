/**
 * Binary Tree Right Side View — BFS, keep the last node of each level.
 * Time O(n), Space O(w) where w is the widest level
 *
 * Process the queue one level at a time; the final node dequeued in a level
 * is the rightmost one. Building a fresh array per level avoids O(n) `shift()` calls.
 */
function rightSideView(root) {
  const result = [];
  if (!root) return result;
  let level = [root];
  while (level.length) {
    result.push(level[level.length - 1].val);
    const next = [];
    for (const node of level) {
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    level = next;
  }
  return result;
}

module.exports = rightSideView;
