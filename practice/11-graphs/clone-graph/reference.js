/**
 * Clone Graph — BFS with an original -> copy map.
 * Time O(V + E), Space O(V)
 *
 * The map doubles as the visited set: a node gets its copy the first time we
 * see it (and is queued once). For every original we dequeue, we wire its
 * copy to the copies of its neighbors, in the same order.
 */
class Node {
  constructor(val = 0, neighbors = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

function cloneGraph(node) {
  if (!node) return null;

  const copies = new Map([[node, new Node(node.val)]]);
  const queue = [node];
  for (let head = 0; head < queue.length; head++) {
    const original = queue[head];
    const copy = copies.get(original);
    for (const neighbor of original.neighbors) {
      if (!copies.has(neighbor)) {
        copies.set(neighbor, new Node(neighbor.val));
        queue.push(neighbor);
      }
      copy.neighbors.push(copies.get(neighbor));
    }
  }
  return copies.get(node);
}

module.exports = cloneGraph;
