module.exports = {
  fn: 'lengthOfLIS',
  cases: [
    { args: [[10, 9, 2, 5, 3, 7, 101, 18]], expected: 4 },
    { args: [[0, 1, 0, 3, 2, 3]], expected: 4 },
    { name: 'all equal (strictly increasing)', args: [[7, 7, 7, 7, 7]], expected: 1 },
    { name: 'single element', args: [[5]], expected: 1 },
    { name: 'decreasing', args: [[5, 4, 3, 2, 1]], expected: 1 },
    { name: 'already increasing', args: [[1, 2, 3, 4, 5]], expected: 5 },
    { name: 'negatives', args: [[-2, -1, -5, 0]], expected: 3 },
    { name: 'answer does not end at the last element', args: [[4, 10, 4, 3, 8, 9, 1]], expected: 3 },
    { name: 'duplicates inside', args: [[1, 3, 3, 2, 2, 4, 4, 5]], expected: 4 },
    {
      name: '2500 elements',
      args: [Array.from({ length: 2500 }, (_, i) => (i % 2 ? i : -i))],
      expected: 1251,
    },
  ],
};
