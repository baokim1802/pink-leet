const { arrayToList, listToArray } = require('../../../lib/structures');

module.exports = {
  fn: 'mergeTwoLists',
  prepare: ([a, b]) => [arrayToList(a), arrayToList(b)],
  transform: (head) => listToArray(head),
  cases: [
    { args: [[1, 2, 4], [1, 3, 4]], expected: [1, 1, 2, 3, 4, 4] },
    { name: 'both empty', args: [[], []], expected: [] },
    { name: 'first empty', args: [[], [0]], expected: [0] },
    { name: 'second empty', args: [[1, 2, 3], []], expected: [1, 2, 3] },
    { args: [[5], [1, 2, 3]], expected: [1, 2, 3, 5] },
    { name: 'no overlap', args: [[1, 2, 3], [4, 5, 6]], expected: [1, 2, 3, 4, 5, 6] },
    { name: 'negatives and ties', args: [[-10, -3, 0], [-5, -3, 8]], expected: [-10, -5, -3, -3, 0, 8] },
    { args: [[2], [1]], expected: [1, 2] },
  ],
};
