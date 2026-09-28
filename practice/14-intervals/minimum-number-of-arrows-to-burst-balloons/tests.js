module.exports = {
  fn: 'findMinArrowShots',
  cases: [
    { args: [[[10, 16], [2, 8], [1, 6], [7, 12]]], expected: 2 },
    { name: 'no overlaps', args: [[[1, 2], [3, 4], [5, 6], [7, 8]]], expected: 4 },
    { name: 'touching shares an arrow', args: [[[1, 2], [2, 3], [3, 4], [4, 5]]], expected: 2 },
    { name: 'single balloon', args: [[[5, 5]]], expected: 1 },
    { name: '32-bit extremes', args: [[[-2147483648, 2147483647], [-2147483648, -2147483648], [2147483647, 2147483647]]], expected: 2 },
    { name: 'wide balloon with narrow ones inside', args: [[[1, 10], [2, 3], [4, 5]]], expected: 2 },
    { name: 'identical balloons', args: [[[3, 7], [3, 7], [3, 7]]], expected: 1 },
    { name: 'messy overlaps', args: [[[3, 9], [7, 12], [3, 8], [6, 8], [9, 10], [2, 9], [0, 9], [3, 9], [0, 6], [2, 8]]], expected: 2 },
    {
      name: '2000 balloons in pairs',
      args: [Array.from({ length: 2000 }, (_, i) => [3 * Math.floor(i / 2) + (i % 2), 3 * Math.floor(i / 2) + 1 + (i % 2)])],
      expected: 1000,
    },
  ],
};
