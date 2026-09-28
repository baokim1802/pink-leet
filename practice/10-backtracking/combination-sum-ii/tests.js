module.exports = {
  fn: 'combinationSum2',
  // each combination is a multiset, and the list of combinations is unordered
  compare: 'unorderedNested',
  cases: [
    { args: [[10, 1, 2, 7, 6, 1, 5], 8], expected: [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]] },
    { args: [[2, 5, 2, 1, 2], 5], expected: [[1, 2, 2], [5]] },
    { name: 'no reuse allowed', args: [[2], 4], expected: [] },
    { name: 'single candidate hits exactly', args: [[1], 1], expected: [[1]] },
    { name: 'everything too big', args: [[7, 9], 3], expected: [] },
    { name: 'duplicates collapse to one answer', args: [[1, 1, 1, 1], 2], expected: [[1, 1]] },
    {
      name: 'mixed duplicates',
      args: [[4, 1, 1, 4, 4, 4, 4, 2, 3, 5], 10],
      expected: [[1, 1, 3, 5], [2, 3, 5], [1, 4, 5], [1, 2, 3, 4], [2, 4, 4], [1, 1, 4, 4]],
    },
    {
      name: 'twenty ones (dedupe must happen during the search)',
      args: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 10],
      expected: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
    },
  ],
};
