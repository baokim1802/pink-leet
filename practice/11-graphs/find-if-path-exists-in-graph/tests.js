// 2000 vertices in a line: 0 - 1 - 2 - ... - 1999
const chain = Array.from({ length: 1999 }, (_, i) => [i, i + 1]);
// same line with the edge 1000 - 1001 removed
const brokenChain = chain.filter(([u]) => u !== 1000);

module.exports = {
  fn: 'validPath',
  cases: [
    { args: [3, [[0, 1], [1, 2], [2, 0]], 0, 2], expected: true },
    { args: [6, [[0, 1], [0, 2], [3, 5], [5, 4], [4, 3]], 0, 5], expected: false },
    { name: 'single vertex, source is destination', args: [1, [], 0, 0], expected: true },
    { name: 'source is destination, no edges', args: [3, [], 1, 1], expected: true },
    { name: 'two vertices, no edge', args: [2, [], 0, 1], expected: false },
    { name: 'edge listed in the other direction', args: [2, [[1, 0]], 0, 1], expected: true },
    { name: 'path needs several hops', args: [5, [[0, 4], [4, 2], [2, 3], [3, 1]], 0, 1], expected: true },
    { name: 'long chain of 2000 vertices', args: [2000, chain, 0, 1999], expected: true },
    { name: 'long chain with one missing edge', args: [2000, brokenChain, 0, 1999], expected: false },
  ],
};
