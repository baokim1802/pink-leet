const { arrayToTree } = require('../../../lib/structures');

module.exports = {
  fn: 'levelOrder',
  prepare: ([arr]) => [arrayToTree(arr)],
  cases: [
    { args: [[3, 9, 20, null, null, 15, 7]], expected: [[3], [9, 20], [15, 7]] },
    { name: 'single node', args: [[1]], expected: [[1]] },
    { name: 'empty tree', args: [[]], expected: [] },
    { name: 'perfect tree', args: [[1, 2, 3, 4, 5, 6, 7]], expected: [[1], [2, 3], [4, 5, 6, 7]] },
    { name: 'left-skewed', args: [[1, 2, null, 3, null, 4]], expected: [[1], [2], [3], [4]] },
    { name: 'gaps in a level', args: [[1, 2, 3, null, 4, null, 5]], expected: [[1], [2, 3], [4, 5]] },
    { name: 'negatives', args: [[-1, -2, -3]], expected: [[-1], [-2, -3]] },
    { name: 'right spine', args: [[1, null, 2, null, 3]], expected: [[1], [2], [3]] },
  ],
};
