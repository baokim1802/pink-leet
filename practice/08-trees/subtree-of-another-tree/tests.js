const { arrayToTree } = require('../../../lib/structures');

module.exports = {
  fn: 'isSubtree',
  prepare: ([a, b]) => [arrayToTree(a), arrayToTree(b)],
  cases: [
    { args: [[3, 4, 5, 1, 2], [4, 1, 2]], expected: true },
    { name: 'extra descendant breaks the match', args: [[3, 4, 5, 1, 2, null, null, null, null, 0], [4, 1, 2]], expected: false },
    { name: 'whole tree matches', args: [[1, 2, 3], [1, 2, 3]], expected: true },
    { name: 'single leaf', args: [[1, 2, 3], [3]], expected: true },
    { name: 'value not present', args: [[1, 2, 3], [4]], expected: false },
    { name: 'duplicate values, leaf matches', args: [[1, 1], [1]], expected: true },
    { name: 'digits trap', args: [[12], [2]], expected: false },
    { name: 'partial match is not enough', args: [[3, 4, 5, 1, null, 2], [3, 1, 2]], expected: false },
    {
      name: 'match deep in a chain of equal values',
      args: [[1, null, 1, null, 1, null, 1, null, 1, null, 1, 2], [1, null, 1, 2]],
      expected: true,
    },
  ],
};
