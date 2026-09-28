const { arrayToTree } = require('../../../lib/structures');

module.exports = {
  fn: 'isSameTree',
  prepare: ([a, b]) => [arrayToTree(a), arrayToTree(b)],
  cases: [
    { args: [[1, 2, 3], [1, 2, 3]], expected: true },
    { name: 'same values, different shape', args: [[1, 2], [1, null, 2]], expected: false },
    { name: 'children swapped', args: [[1, 2, 1], [1, 1, 2]], expected: false },
    { name: 'both empty', args: [[], []], expected: true },
    { name: 'one empty', args: [[], [0]], expected: false },
    { name: 'single equal nodes', args: [[5], [5]], expected: true },
    { name: 'single different nodes', args: [[5], [6]], expected: false },
    { args: [[1, 2, 3, 4, null, null, 5], [1, 2, 3, 4, null, null, 5]], expected: true },
    { name: 'differs deep down', args: [[1, 2, 3, 4], [1, 2, 3, null, 4]], expected: false },
    { name: 'negative values', args: [[-1, -2], [-1, -2]], expected: true },
  ],
};
