// Deterministic shuffle of 0..n²-1 laid out as an n x n grid
function shuffledGrid(n, seed) {
  const rand = (m) => (seed = (seed * 48271) % 2147483647) % m;
  const vals = Array.from({ length: n * n }, (_, i) => i);
  for (let i = vals.length - 1; i > 0; i--) {
    const j = rand(i + 1);
    [vals[i], vals[j]] = [vals[j], vals[i]];
  }
  return Array.from({ length: n }, (_, r) => vals.slice(r * n, (r + 1) * n));
}

module.exports = {
  fn: 'swimInWater',
  cases: [
    { args: [[[0, 2], [1, 3]]], expected: 3 },
    {
      args: [[
        [0, 1, 2, 3, 4],
        [24, 23, 22, 21, 5],
        [12, 13, 14, 15, 16],
        [11, 17, 18, 19, 20],
        [10, 9, 8, 7, 6],
      ]],
      expected: 16,
    },
    { name: 'single cell', args: [[[0]]], expected: 0 },
    { name: 'start cell is the highest', args: [[[3, 2], [0, 1]]], expected: 3 },
    { name: 'goal cell is the bottleneck', args: [[[0, 1, 2], [5, 4, 3], [6, 7, 8]]], expected: 8 },
    { name: 'bottleneck in the middle of the route', args: [[[0, 7, 2], [8, 6, 3], [5, 4, 1]]], expected: 7 },
    { name: 'every exit from the start is high', args: [[[0, 8, 1], [7, 6, 2], [5, 4, 3]]], expected: 7 },
    { name: '30 x 30 shuffled grid', args: [shuffledGrid(30, 99)], expected: 729 },
    { name: '50 x 50 shuffled grid', args: [shuffledGrid(50, 31337)], expected: 2135 },
  ],
};
