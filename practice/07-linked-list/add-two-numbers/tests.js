const { arrayToList, listToArray } = require('../../../lib/structures');

// Independent check for the long cases: add with BigInt, then split into reversed digits.
const toBig = (digits) => BigInt([...digits].reverse().join(''));
const fromBig = (n) => n.toString().split('').reverse().map(Number);

const longA = Array.from({ length: 100 }, (_, i) => (i * 7 + 3) % 10); // last digit is 6, no leading zero
const longB = Array.from({ length: 73 }, (_, i) => (i * 3 + 5) % 10); // last digit is 1

module.exports = {
  fn: 'addTwoNumbers',
  prepare: ([a, b]) => [arrayToList(a), arrayToList(b)],
  transform: (head) => listToArray(head),
  cases: [
    { args: [[2, 4, 3], [5, 6, 4]], expected: [7, 0, 8] },
    { name: 'zero plus zero', args: [[0], [0]], expected: [0] },
    { name: 'carry ripples into new digits', args: [[9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9]], expected: [8, 9, 9, 9, 0, 0, 0, 1] },
    { name: 'final carry adds a digit', args: [[5], [5]], expected: [0, 1] },
    { name: 'shorter first list', args: [[1], [9, 9]], expected: [0, 0, 1] },
    { name: 'adding zero', args: [[1, 8], [0]], expected: [1, 8] },
    { name: 'no carries at all', args: [[1, 2, 3], [4, 5]], expected: [5, 7, 3] },
    { name: '100 nines plus one', args: [Array(100).fill(9), [1]], expected: [...Array(100).fill(0), 1] },
    { name: '100 digits + 73 digits', args: [longA, longB], expected: fromBig(toBig(longA) + toBig(longB)) },
  ],
};
