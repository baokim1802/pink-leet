// Deterministic pseudo-random graph: 100 nodes, a directed ring (so all are
// reachable) plus ~3000 random extra edges.
function bigGraph() {
  let seed = 12345;
  const rand = (m) => (seed = (seed * 48271) % 2147483647) % m;
  const edges = new Map();
  for (let u = 1; u <= 100; u++) edges.set(`${u},${(u % 100) + 1}`, [u, (u % 100) + 1, 50 + rand(51)]);
  for (let i = 0; i < 3000; i++) {
    const u = 1 + rand(100);
    const v = 1 + rand(100);
    if (u !== v && !edges.has(`${u},${v}`)) edges.set(`${u},${v}`, [u, v, rand(101)]);
  }
  return [...edges.values()];
}
const big = bigGraph();

module.exports = {
  fn: 'networkDelayTime',
  cases: [
    { args: [[[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 2], expected: 2 },
    { args: [[[1, 2, 1]], 2, 1], expected: 1 },
    { args: [[[1, 2, 1]], 2, 2], expected: -1 },
    { name: 'single node, no edges', args: [[], 1, 1], expected: 0 },
    { name: 'longer path is faster', args: [[[1, 2, 10], [1, 3, 1], [3, 2, 1]], 3, 1], expected: 2 },
    { name: 'one node unreachable', args: [[[1, 2, 1], [2, 3, 1]], 4, 1], expected: -1 },
    { name: 'cycle back to earlier nodes', args: [[[1, 2, 1], [2, 3, 2], [3, 1, 4]], 3, 2], expected: 6 },
    { name: 'zero-weight edges', args: [[[1, 2, 0], [2, 3, 0]], 3, 1], expected: 0 },
    {
      name: 'greedy by first edge is wrong',
      args: [[[1, 2, 1], [2, 4, 10], [1, 3, 4], [3, 4, 1], [4, 5, 1]], 5, 1],
      expected: 6,
    },
    { name: '100 nodes, ~3000 edges', args: [big, 100, 37], expected: 30 },
  ],
};
