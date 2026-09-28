// Build an n x n matrix from an undirected edge list (diagonal is always 1).
function matrix(n, edges) {
  const m = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
  for (const [a, b] of edges) m[a][b] = m[b][a] = 1;
  return m;
}

// 200 cities linked in pairs (0-1, 2-3, ...) -> 100 provinces
const pairs = matrix(200, Array.from({ length: 100 }, (_, i) => [2 * i, 2 * i + 1]));
// 200 cities in one long chain 0-1-2-...-199 -> 1 province
const chain = matrix(200, Array.from({ length: 199 }, (_, i) => [i, i + 1]));

module.exports = {
  fn: 'findCircleNum',
  cases: [
    { args: [[[1, 1, 0], [1, 1, 0], [0, 0, 1]]], expected: 2 },
    { args: [[[1, 0, 0], [0, 1, 0], [0, 0, 1]]], expected: 3 },
    { name: 'single city', args: [[[1]]], expected: 1 },
    { name: 'everyone linked to everyone', args: [[[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]]], expected: 1 },
    {
      name: 'indirect connection through a middle city',
      args: [[[1, 1, 0, 0], [1, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 1]]],
      expected: 2,
    },
    {
      name: 'connected only via a later city',
      args: [[[1, 0, 0, 1], [0, 1, 1, 1], [0, 1, 1, 0], [1, 1, 0, 1]]],
      expected: 1,
    },
    { name: '200 cities in pairs', args: [pairs], expected: 100 },
    { name: '200 cities in one chain', args: [chain], expected: 1 },
  ],
};
