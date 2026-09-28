const { arrayToList, listToArray } = require('../../../lib/structures');

// 0..4999 with k = 7: 714 full groups of 7 get reversed, the last 2 nodes stay put
const big = Array.from({ length: 5000 }, (_, i) => i);
const bigExpected = [];
for (let start = 0; start < 5000; start += 7) {
  const group = big.slice(start, start + 7);
  bigExpected.push(...(group.length === 7 ? group.reverse() : group));
}

module.exports = {
  fn: 'reverseKGroup',
  prepare: ([arr, k]) => [arrayToList(arr), k],
  transform: (head) => listToArray(head, 10000),
  cases: [
    { args: [[1, 2, 3, 4, 5], 2], expected: [2, 1, 4, 3, 5] },
    { args: [[1, 2, 3, 4, 5], 3], expected: [3, 2, 1, 4, 5] },
    { name: 'k = 1 changes nothing', args: [[1, 2, 3], 1], expected: [1, 2, 3] },
    { name: 'k = n reverses everything', args: [[1, 2, 3, 4, 5], 5], expected: [5, 4, 3, 2, 1] },
    { name: 'single node', args: [[1], 1], expected: [1] },
    { name: 'exact multiple of k', args: [[1, 2, 3, 4, 5, 6], 3], expected: [3, 2, 1, 6, 5, 4] },
    { name: 'leftover of k - 1 nodes', args: [[1, 2, 3, 4, 5, 6, 7, 8], 3], expected: [3, 2, 1, 6, 5, 4, 7, 8] },
    { name: 'duplicate values', args: [[1, 2, 1, 2, 3], 2], expected: [2, 1, 2, 1, 3] },
    { name: '5000 nodes, k = 7', args: [big, 7], expected: bigExpected },
  ],
};
