// `===` so that returning -0 (e.g. from -2 * 0) still counts as 0.
module.exports = {
  fn: 'maxProduct',
  compare: (actual, expected) => actual === expected,
  cases: [
    { args: [[2, 3, -2, 4]], expected: 6 },
    { args: [[-2, 0, -1]], expected: 0 },
    { args: [[-2, 3, -4]], expected: 24 },
    { name: 'single negative', args: [[-2]], expected: -2 },
    { name: 'zero then positive', args: [[0, 2]], expected: 2 },
    { name: 'pair of negatives wins', args: [[-3, -1, -1]], expected: 3 },
    { name: 'odd number of negatives', args: [[2, -5, -2, -4, 3]], expected: 24 },
    { name: 'zero splits the array', args: [[-2, -3, 0, -4, -5]], expected: 20 },
    { name: 'all zeros', args: [[0, 0, 0]], expected: 0 },
    {
      name: '2000 elements split by one zero',
      args: [Array.from({ length: 2000 }, (_, i) => (i === 1000 ? 0 : i % 100 === 7 ? -2 : i % 3 === 0 ? -1 : 1))],
      expected: 1024,
    },
  ],
};
