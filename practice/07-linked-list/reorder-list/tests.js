const { arrayToList, listToArray } = require('../../../lib/structures');

// 1..10000 -> 1, 10000, 2, 9999, ..., 5000, 5001
const big = Array.from({ length: 10000 }, (_, i) => i + 1);
const bigExpected = [];
for (let i = 1; i <= 5000; i++) bigExpected.push(i, 10001 - i);

module.exports = {
  // Build the list, call reorderList(head), then read the list from the original head.
  // Also checks that the result is made of the original nodes with their original values.
  run: (reorderList, [arr]) => {
    const head = arrayToList(arr);
    const original = new Map(); // node -> its original value
    for (let n = head; n; n = n.next) original.set(n, n.val);
    reorderList(head);
    const seen = new Set();
    for (let n = head; n && seen.size <= original.size; n = n.next) {
      if (!original.has(n)) throw new Error('The list contains a node that was not in the original list — rewire, don\'t create');
      if (n.val !== original.get(n)) throw new Error('A node\'s value changed — move the nodes, don\'t swap values');
      if (seen.has(n)) throw new Error('The list has a cycle — did you cut the first half with next = null?');
      seen.add(n);
    }
    return listToArray(head, arr.length + 1);
  },
  cases: [
    { args: [[1, 2, 3, 4]], expected: [1, 4, 2, 3] },
    { args: [[1, 2, 3, 4, 5]], expected: [1, 5, 2, 4, 3] },
    { name: 'single node', args: [[1]], expected: [1] },
    { name: 'two nodes', args: [[1, 2]], expected: [1, 2] },
    { name: 'three nodes', args: [[1, 2, 3]], expected: [1, 3, 2] },
    { name: 'six nodes', args: [[1, 2, 3, 4, 5, 6]], expected: [1, 6, 2, 5, 3, 4] },
    { name: 'duplicate values', args: [[7, 7, 8, 8]], expected: [7, 8, 7, 8] },
    { name: '10k nodes', args: [big], expected: bigExpected },
  ],
};
