module.exports = {
  fn: 'subsetsWithDup',
  // order doesn't matter at either level (a subset is a multiset of values)
  compare: 'unorderedNested',
  cases: [
    { args: [[1, 2, 2]], expected: [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]] },
    { name: 'single element', args: [[0]], expected: [[], [0]] },
    { name: 'all the same', args: [[2, 2, 2]], expected: [[], [2], [2, 2], [2, 2, 2]] },
    { name: 'no duplicates (plain subsets)', args: [[1, 2, 3]], expected: [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]] },
    {
      name: 'unsorted with duplicates',
      args: [[4, 4, 4, 1, 4]],
      expected: [[], [1], [1, 4], [1, 4, 4], [1, 4, 4, 4], [1, 4, 4, 4, 4], [4], [4, 4], [4, 4, 4], [4, 4, 4, 4]],
    },
    {
      name: 'negatives, duplicates apart',
      args: [[-1, 1, -1]],
      expected: [[], [-1], [1], [-1, -1], [-1, 1], [-1, -1, 1]],
    },
    {
      name: 'two pairs',
      args: [[3, 1, 3, 1]],
      expected: [[], [1], [3], [1, 1], [3, 3], [1, 3], [1, 1, 3], [1, 3, 3], [1, 1, 3, 3]],
    },
    {
      name: 'ten equal values',
      args: [[5, 5, 5, 5, 5, 5, 5, 5, 5, 5]],
      expected: [
        [], [5], [5, 5], [5, 5, 5], [5, 5, 5, 5], [5, 5, 5, 5, 5], [5, 5, 5, 5, 5, 5],
        [5, 5, 5, 5, 5, 5, 5], [5, 5, 5, 5, 5, 5, 5, 5], [5, 5, 5, 5, 5, 5, 5, 5, 5], [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      ],
    },
  ],
};
