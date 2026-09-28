// Deterministic pseudo-random set of 400 distinct points in [-10000, 10000]²
function randomPoints(count) {
  let seed = 777;
  const rand = (m) => (seed = (seed * 48271) % 2147483647) % m;
  const seen = new Set();
  const pts = [];
  while (pts.length < count) {
    const x = rand(20001) - 10000;
    const y = rand(20001) - 10000;
    if (!seen.has(`${x},${y}`)) {
      seen.add(`${x},${y}`);
      pts.push([x, y]);
    }
  }
  return pts;
}

module.exports = {
  fn: 'minCostConnectPoints',
  cases: [
    { args: [[[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]]], expected: 20 },
    { args: [[[3, 12], [-2, 5], [-4, 1]]], expected: 18 },
    { name: 'single point', args: [[[0, 0]]], expected: 0 },
    { name: 'two points', args: [[[0, 0], [1, 1]]], expected: 2 },
    { name: 'extreme coordinates', args: [[[-1000000, -1000000], [1000000, 1000000]]], expected: 4000000 },
    { name: 'points on a line', args: [[[0, 5], [0, 0], [0, 2], [0, 1]]], expected: 5 },
    { name: 'square corners', args: [[[0, 0], [0, 3], [3, 0], [3, 3]]], expected: 9 },
    { name: 'cluster plus far outlier', args: [[[0, 0], [1, 0], [0, 1], [1, 1], [100, 100]]], expected: 201 },
    { name: '400 random points', args: [randomPoints(400)], expected: 328833 },
  ],
};
