module.exports = {
  fn: 'intervalIntersection',
  cases: [
    {
      args: [[[0, 2], [5, 10], [13, 23], [24, 25]], [[1, 5], [8, 12], [15, 24], [25, 26]]],
      expected: [[1, 2], [5, 5], [8, 10], [15, 23], [24, 24], [25, 25]],
    },
    { name: 'second list empty', args: [[[1, 3], [5, 9]], []], expected: [] },
    { name: 'first list empty', args: [[], [[4, 8]]], expected: [] },
    { name: 'simple overlap', args: [[[1, 7]], [[3, 10]]], expected: [[3, 7]] },
    { name: 'identical lists', args: [[[1, 2], [5, 6]], [[1, 2], [5, 6]]], expected: [[1, 2], [5, 6]] },
    { name: 'disjoint', args: [[[1, 2]], [[3, 4]]], expected: [] },
    { name: 'one interval covers many', args: [[[0, 100]], [[1, 2], [5, 6], [99, 100]]], expected: [[1, 2], [5, 6], [99, 100]] },
    { name: 'touching gives a point', args: [[[1, 5]], [[5, 10]]], expected: [[5, 5]] },
    { name: 'interleaved', args: [[[1, 4], [6, 9], [11, 14]], [[3, 7], [8, 12]]], expected: [[3, 4], [6, 7], [8, 9], [11, 12]] },
    {
      name: '1000 intervals each, big coordinates',
      args: [
        Array.from({ length: 1000 }, (_, i) => [i * 1000000, i * 1000000 + 600000]),
        Array.from({ length: 1000 }, (_, i) => [i * 1000000 + 500000, i * 1000000 + 900000]),
      ],
      expected: Array.from({ length: 1000 }, (_, i) => [i * 1000000 + 500000, i * 1000000 + 600000]),
    },
  ],
};
