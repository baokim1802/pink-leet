// Build the original graph from a 1-indexed adjacency list using plain objects.
function buildGraph(adj) {
  const nodes = adj.map((_, i) => ({ val: i + 1, neighbors: [] }));
  adj.forEach((list, i) => {
    for (const v of list) nodes[i].neighbors.push(nodes[v - 1]);
  });
  return nodes;
}

// Walk a graph from `start` and turn it back into a 1-indexed adjacency list.
// Throws if the walk meets a node from `forbidden` or two different nodes with the same val.
function toAdjList(start, forbidden) {
  const byVal = new Map();
  const stack = [start];
  while (stack.length) {
    const node = stack.pop();
    if (!node || typeof node !== 'object') throw new Error(`Expected a node object, got ${node}`);
    if (forbidden && forbidden.has(node)) {
      throw new Error(`Node ${node.val} of your result is a node of the original graph — it must be a new copy`);
    }
    const seen = byVal.get(node.val);
    if (seen === node) continue;
    if (seen) throw new Error(`Found two different copies of node ${node.val} — each node should be copied once`);
    byVal.set(node.val, node);
    if (!Array.isArray(node.neighbors)) throw new Error(`Node ${node.val} has no neighbors array`);
    for (const next of node.neighbors) stack.push(next);
  }
  const n = Math.max(...byVal.keys());
  const adj = Array.from({ length: n }, () => []);
  for (const [val, node] of byVal) adj[val - 1] = node.neighbors.map((x) => x.val);
  return adj;
}

// 100 nodes in a ring: i is linked to i - 1 and i + 1 (wrapping around)
const ring = Array.from({ length: 100 }, (_, i) => [((i + 99) % 100) + 1, ((i + 1) % 100) + 1]);
// complete graph on 6 nodes
const complete = Array.from({ length: 6 }, (_, i) =>
  Array.from({ length: 6 }, (_, j) => j + 1).filter((v) => v !== i + 1),
);

module.exports = {
  run: (cloneGraph, [adj]) => {
    if (adj.length === 0) return cloneGraph(null);
    const nodes = buildGraph(adj);
    const result = cloneGraph(nodes[0]);
    if (result === null || result === undefined) return result;
    const copy = toAdjList(result, new Set(nodes));
    // the original must be left untouched
    const originalAfter = toAdjList(nodes[0]);
    if (JSON.stringify(originalAfter) !== JSON.stringify(adj)) throw new Error('The original graph was modified');
    return copy;
  },
  compare: 'exact',
  cases: [
    { args: [[[2, 4], [1, 3], [2, 4], [1, 3]]], expected: [[2, 4], [1, 3], [2, 4], [1, 3]] },
    { name: 'single node, no neighbors', args: [[[]]], expected: [[]] },
    { name: 'empty graph', args: [[]], expected: null },
    { name: 'two nodes', args: [[[2], [1]]], expected: [[2], [1]] },
    { name: 'triangle', args: [[[2, 3], [1, 3], [1, 2]]], expected: [[2, 3], [1, 3], [1, 2]] },
    { name: 'neighbor order is kept', args: [[[3, 2], [1], [1]]], expected: [[3, 2], [1], [1]] },
    { name: 'star', args: [[[2, 3, 4, 5], [1], [1], [1], [1]]], expected: [[2, 3, 4, 5], [1], [1], [1], [1]] },
    { name: 'path of 5', args: [[[2], [1, 3], [2, 4], [3, 5], [4]]], expected: [[2], [1, 3], [2, 4], [3, 5], [4]] },
    { name: 'complete graph on 6 nodes', args: [complete], expected: complete },
    { name: 'ring of 100 nodes', args: [ring], expected: ring },
  ],
};
