const { arrayToTree } = require('../../../lib/structures');

// Complete tree of 3000 nodes, all equal to 1, so the answer is the longest path in nodes.
// Levels 0..10 hold 2047 nodes; the remaining 953 fill level 11 from the left and all fit
// under the root's left child (which has 1024 slots there). The left arm is 11 nodes deep,
// the right arm 10, so the best path is 11 + 1 (root) + 10 = 22.
const ones = new Array(3000).fill(1);

module.exports = {
  fn: 'maxPathSum',
  prepare: ([arr]) => [arrayToTree(arr)],
  cases: [
    { args: [[1, 2, 3]], expected: 6 },
    { name: 'skip the negative root', args: [[-10, 9, 20, null, null, 15, 7]], expected: 42 },
    { name: 'single negative node', args: [[-3]], expected: -3 },
    { name: 'all negative', args: [[-2, -1]], expected: -1 },
    { name: 'drop a negative child', args: [[2, -1]], expected: 2 },
    { args: [[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1]], expected: 48 },
    { args: [[1, -2, 3]], expected: 4 },
    { name: 'best path sits below the root', args: [[-1, 5, null, 4, null, null, 2, -4]], expected: 11 },
    { args: [[9, 6, -3, null, null, -6, 2, null, null, 2, null, -6, -6, -6]], expected: 16 },
    { name: '3000 ones', args: [ones], expected: 22 },
  ],
};
