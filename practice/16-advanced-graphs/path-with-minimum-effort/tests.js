// Deterministic pseudo-random 60 x 60 terrain with heights 1..1000
function terrain(n) {
  let seed = 2024;
  const rand = (m) => (seed = (seed * 48271) % 2147483647) % m;
  return Array.from({ length: n }, () => Array.from({ length: n }, () => 1 + rand(1000)));
}

module.exports = {
  fn: 'minimumEffortPath',
  cases: [
    { args: [[[1, 2, 2], [3, 8, 2], [5, 3, 5]]], expected: 2 },
    { args: [[[1, 2, 3], [3, 8, 4], [5, 3, 5]]], expected: 1 },
    {
      name: 'a flat route exists',
      args: [[[1, 2, 1, 1, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 1, 1, 2, 1]]],
      expected: 0,
    },
    { name: 'single cell', args: [[[5]]], expected: 0 },
    { name: 'single row', args: [[[1, 10]]], expected: 9 },
    { name: 'single column', args: [[[1], [4], [2]]], expected: 3 },
    { name: 'long way around beats the wall', args: [[[1, 100, 1], [1, 100, 1], [1, 1, 1]]], expected: 0 },
    { name: 'one row: every step is forced', args: [[[1, 10, 6, 7, 9, 10, 4, 9]]], expected: 9 },
    { name: '60 x 60 random terrain', args: [terrain(60)], expected: 585 },
  ],
};
