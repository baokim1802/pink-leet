module.exports = {
  fn: 'combinationSum',
  // each combination is a multiset, and the list of combinations is unordered
  compare: 'unorderedNested',
  cases: [
    { args: [[2, 3, 6, 7], 7], expected: [[2, 2, 3], [7]] },
    { args: [[2, 3, 5], 8], expected: [[2, 2, 2, 2], [2, 3, 3], [3, 5]] },
    { name: 'no combination', args: [[2], 1], expected: [] },
    { name: 'single candidate hits exactly', args: [[1], 1], expected: [[1]] },
    { name: 'single candidate reused', args: [[1], 3], expected: [[1, 1, 1]] },
    { name: 'unsorted candidates', args: [[8, 7, 4, 3], 11], expected: [[3, 8], [4, 7], [3, 4, 4]] },
    { name: 'everything too big', args: [[5, 10], 3], expected: [] },
    {
      name: 'many combinations',
      args: [[7, 2, 5, 3], 15],
      expected: [
        [5, 5, 5], [3, 5, 7], [3, 3, 3, 3, 3], [2, 3, 5, 5], [2, 3, 3, 7],
        [2, 2, 3, 3, 5], [2, 2, 2, 3, 3, 3], [2, 2, 2, 2, 7], [2, 2, 2, 2, 2, 5], [2, 2, 2, 2, 2, 2, 3],
      ],
    },
  ],
};
