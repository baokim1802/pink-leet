const { arrayToTree } = require('../../../lib/structures');

// A root with a 500-node chain going left and another 500-node chain going right.
const K = 500;
const twoArms = [0, 1, 1];
for (let i = 1; i < K; i++) twoArms.push(1, null, null, 1);

module.exports = {
  fn: 'diameterOfBinaryTree',
  prepare: ([arr]) => [arrayToTree(arr)],
  cases: [
    { args: [[1, 2, 3, 4, 5]], expected: 3 },
    { args: [[1, 2]], expected: 1 },
    { name: 'single node', args: [[1]], expected: 0 },
    { name: 'longest path skips the root', args: [[1, 2, null, 3, 4, 5, null, null, 6, 7, null, null, 8]], expected: 6 },
    { name: 'left chain', args: [[1, 2, null, 3, null, 4]], expected: 3 },
    { name: 'perfect tree', args: [[1, 2, 3, 4, 5, 6, 7]], expected: 4 },
    {
      name: 'bigger mixed tree',
      args: [[4, -7, -3, null, null, -9, -3, 9, -7, -4, null, 6, null, -6, -6, null, null, 0, 6, 5, null, 9, null, null, -1, -4, null, null, null, -2]],
      expected: 8,
    },
    { name: 'two long arms (1001 nodes)', args: [twoArms], expected: 2 * K },
  ],
};
