const { arrayToList, listToArray } = require('../../../lib/structures');

const big = Array.from({ length: 1000 }, (_, i) => i + 1);

module.exports = {
  fn: 'reverseList',
  prepare: ([arr]) => [arrayToList(arr)],
  transform: (head) => listToArray(head),
  cases: [
    { args: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1] },
    { args: [[1, 2]], expected: [2, 1] },
    { name: 'empty list', args: [[]], expected: [] },
    { name: 'single node', args: [[7]], expected: [7] },
    { name: 'duplicates', args: [[1, 1, 2, 2]], expected: [2, 2, 1, 1] },
    { name: 'negatives', args: [[-1, 0, -5]], expected: [-5, 0, -1] },
    { name: '1000 nodes', args: [big], expected: [...big].reverse() },
  ],
};
