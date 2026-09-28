module.exports = {
  fn: 'eraseOverlapIntervals',
  cases: [
    { args: [[[1, 2], [2, 3], [3, 4], [1, 3]]], expected: 1 },
    { name: 'duplicates', args: [[[1, 2], [1, 2], [1, 2]]], expected: 2 },
    { name: 'touching is fine', args: [[[1, 2], [2, 3]]], expected: 0 },
    { name: 'single interval', args: [[[0, 5]]], expected: 0 },
    { name: 'sorting by start is a trap', args: [[[1, 100], [11, 22], [1, 11], [2, 12]]], expected: 2 },
    { name: 'negatives', args: [[[-5, -1], [-3, 2], [0, 4]]], expected: 1 },
    { name: 'one long interval covers many', args: [[[1, 10], [2, 3], [4, 5], [6, 7]]], expected: 1 },
    { name: 'staircase', args: [[[0, 2], [1, 3], [2, 4], [3, 5], [4, 6]]], expected: 2 },
    {
      name: '2000 overlapping pairs',
      args: [Array.from({ length: 2000 }, (_, i) => (i % 2 ? [i - 1, i + 1] : [i, i + 1]))],
      expected: 1000,
    },
  ],
};
