const { arrayToList } = require('../../../lib/structures');

// 0,1,...,9,0,1,... for 10,000 values, then mirrored -> 20,000-node palindrome
const half = Array.from({ length: 10000 }, (_, i) => i % 10);
const bigPal = [...half, ...[...half].reverse()];
const bigAlmost = [...bigPal];
bigAlmost[12345] = (bigAlmost[12345] + 1) % 10; // break the symmetry once

module.exports = {
  fn: 'isPalindrome',
  prepare: ([arr]) => [arrayToList(arr)],
  cases: [
    { args: [[1, 2, 2, 1]], expected: true },
    { args: [[1, 2]], expected: false },
    { name: 'odd length palindrome', args: [[1, 2, 3, 2, 1]], expected: true },
    { name: 'single node', args: [[7]], expected: true },
    { name: 'two equal nodes', args: [[4, 4]], expected: true },
    { name: 'odd length, not a palindrome', args: [[1, 2, 3]], expected: false },
    { name: 'same ends, different middle pair', args: [[1, 2, 3, 2, 2, 1]], expected: false },
    { name: 'all equal values', args: [[0, 0, 0, 0, 0]], expected: true },
    { name: '20k-node palindrome', args: [bigPal], expected: true },
    { name: '20k nodes, one value off', args: [bigAlmost], expected: false },
  ],
};
