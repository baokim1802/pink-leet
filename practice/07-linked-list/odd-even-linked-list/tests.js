const { arrayToList, listToArray } = require('../../../lib/structures');

// 0..9999: odd positions hold the even numbers, even positions hold the odd numbers
const big = Array.from({ length: 10000 }, (_, i) => i);
const bigExpected = [...big.filter((v) => v % 2 === 0), ...big.filter((v) => v % 2 === 1)];

module.exports = {
  fn: 'oddEvenList',
  prepare: ([arr]) => [arrayToList(arr)],
  transform: (head) => listToArray(head, 20000),
  cases: [
    { args: [[1, 2, 3, 4, 5]], expected: [1, 3, 5, 2, 4] },
    { args: [[2, 1, 3, 5, 6, 4, 7]], expected: [2, 3, 6, 7, 1, 5, 4] },
    { name: 'empty list', args: [[]], expected: [] },
    { name: 'single node', args: [[1]], expected: [1] },
    { name: 'two nodes', args: [[1, 2]], expected: [1, 2] },
    { name: 'three nodes', args: [[1, 2, 3]], expected: [1, 3, 2] },
    { name: 'even length', args: [[1, 2, 3, 4]], expected: [1, 3, 2, 4] },
    { name: 'positions, not values', args: [[5, 5, -1, -1, 8]], expected: [5, -1, 8, 5, -1] },
    { name: '10k nodes', args: [big], expected: bigExpected },
  ],
};
