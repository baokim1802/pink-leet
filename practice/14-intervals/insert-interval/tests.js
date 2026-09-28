module.exports = {
  fn: 'insert',
  cases: [
    { args: [[[1, 3], [6, 9]], [2, 5]], expected: [[1, 5], [6, 9]] },
    { args: [[[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]], expected: [[1, 2], [3, 10], [12, 16]] },
    { name: 'empty list', args: [[], [5, 7]], expected: [[5, 7]] },
    { name: 'goes first', args: [[[3, 5]], [1, 2]], expected: [[1, 2], [3, 5]] },
    { name: 'goes last', args: [[[1, 2]], [3, 4]], expected: [[1, 2], [3, 4]] },
    { name: 'touching merges', args: [[[1, 5]], [5, 7]], expected: [[1, 7]] },
    { name: 'swallows everything', args: [[[2, 3], [5, 6], [8, 9]], [1, 10]], expected: [[1, 10]] },
    { name: 'fits in a gap', args: [[[1, 2], [8, 9]], [4, 5]], expected: [[1, 2], [4, 5], [8, 9]] },
    { name: 'already covered', args: [[[1, 5]], [2, 3]], expected: [[1, 5]] },
    {
      name: '1000 intervals, merge a middle chunk',
      args: [Array.from({ length: 1000 }, (_, i) => [3 * i, 3 * i + 1]), [301, 600]],
      expected: [
        ...Array.from({ length: 100 }, (_, i) => [3 * i, 3 * i + 1]),
        [300, 601],
        ...Array.from({ length: 799 }, (_, i) => [3 * (i + 201), 3 * (i + 201) + 1]),
      ],
    },
  ],
};
