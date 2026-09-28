/**
 * Graph node — use this to build your copy: new Node(val)
 */
class Node {
  /**
   * @param {number} [val]
   * @param {Node[]} [neighbors]
   */
  constructor(val = 0, neighbors = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

/**
 * Clone Graph
 * @param {Node | null} node
 * @return {Node | null}
 */
function cloneGraph(node) {
  // your code here 🎀
}

module.exports = cloneGraph;
