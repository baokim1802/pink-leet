module.exports = {
  fn: 'merge',
  compare: 'unordered',
  cases: [
    { args: [[[1, 3], [2, 6], [8, 10], [15, 18]]], expected: [[1, 6], [8, 10], [15, 18]] },
    { name: 'touching intervals merge', args: [[[1, 4], [4, 5]]], expected: [[1, 5]] },
    { name: 'unsorted input', args: [[[4, 7], [1, 4]]], expected: [[1, 7]] },
    { name: 'single interval', args: [[[1, 1]]], expected: [[1, 1]] },
    { name: 'no overlaps, unsorted', args: [[[1, 4], [0, 0]]], expected: [[0, 0], [1, 4]] },
    { name: 'contained intervals', args: [[[1, 10], [2, 3], [4, 5]]], expected: [[1, 10]] },
    { name: 'big one comes last', args: [[[2, 3], [4, 5], [6, 7], [8, 9], [1, 10]]], expected: [[1, 10]] },
    { name: 'duplicates', args: [[[2, 4], [2, 4], [2, 4]]], expected: [[2, 4]] },
    { name: 'chain reaction', args: [[[5, 6], [1, 2], [2, 3], [3, 5], [8, 9]]], expected: [[1, 6], [8, 9]] },
    {
      name: '1000 chained intervals, reversed',
      args: [Array.from({ length: 1000 }, (_, i) => [999 - i, 1000 - i])],
      expected: [[0, 1000]],
    },
  ],
};
