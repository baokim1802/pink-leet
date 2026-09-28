const { arrayToList, listToArray } = require('../../../lib/structures');

module.exports = {
  fn: 'removeNthFromEnd',
  prepare: ([arr, n]) => [arrayToList(arr), n],
  transform: (head) => listToArray(head),
  cases: [
    { args: [[1, 2, 3, 4, 5], 2], expected: [1, 2, 3, 5] },
    { name: 'only node', args: [[1], 1], expected: [] },
    { name: 'remove tail', args: [[1, 2], 1], expected: [1] },
    { name: 'remove head of two', args: [[1, 2], 2], expected: [2] },
    { name: 'remove head', args: [[1, 2, 3], 3], expected: [2, 3] },
    { args: [[10, 20, 30, 40], 1], expected: [10, 20, 30] },
    { name: 'duplicates', args: [[1, 1, 1], 2], expected: [1, 1] },
    { name: 'middle of longer list', args: [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 5], expected: [0, 1, 2, 3, 4, 6, 7, 8, 9] },
  ],
};
