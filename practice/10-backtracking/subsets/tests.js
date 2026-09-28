module.exports = {
  fn: 'subsets',
  compare: 'unorderedNested',
  cases: [
    { args: [[1, 2, 3]], expected: [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]] },
    { name: 'single element', args: [[0]], expected: [[], [0]] },
    { name: 'empty input', args: [[]], expected: [[]] },
    { name: 'two elements', args: [[5, 9]], expected: [[], [5], [9], [5, 9]] },
    { name: 'negatives', args: [[-1, 0, 2]], expected: [[], [-1], [0], [2], [-1, 0], [-1, 2], [0, 2], [-1, 0, 2]] },
    {
      name: 'four elements, unsorted',
      args: [[4, 1, 3, 2]],
      expected: [
        [], [1], [2], [3], [4],
        [1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4],
        [1, 2, 3], [1, 2, 4], [1, 3, 4], [2, 3, 4],
        [1, 2, 3, 4],
      ],
    },
  ],
};
