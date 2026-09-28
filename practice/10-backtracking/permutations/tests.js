// Order of the permutations in the output doesn't matter, but the order of
// numbers INSIDE each permutation does. So we compare the outer list as a
// multiset of JSON strings and leave each inner array untouched.
const byJson = (arr) => arr.map((p) => JSON.stringify(p)).sort();

module.exports = {
  fn: 'permute',
  compare: (actual, expected) =>
    Array.isArray(actual) &&
    actual.length === expected.length &&
    JSON.stringify(byJson(actual)) === JSON.stringify(byJson(expected)),
  cases: [
    { args: [[1, 2, 3]], expected: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]] },
    { args: [[0, 1]], expected: [[0, 1], [1, 0]] },
    { name: 'single element', args: [[1]], expected: [[1]] },
    { name: 'negatives', args: [[-1, 5]], expected: [[-1, 5], [5, -1]] },
    { name: 'unsorted input', args: [[3, -2, 0]], expected: [[3, -2, 0], [3, 0, -2], [-2, 3, 0], [-2, 0, 3], [0, 3, -2], [0, -2, 3]] },
    {
      name: 'four elements (24 permutations)',
      args: [[1, 2, 3, 4]],
      expected: [
        [1, 2, 3, 4], [1, 2, 4, 3], [1, 3, 2, 4], [1, 3, 4, 2], [1, 4, 2, 3], [1, 4, 3, 2],
        [2, 1, 3, 4], [2, 1, 4, 3], [2, 3, 1, 4], [2, 3, 4, 1], [2, 4, 1, 3], [2, 4, 3, 1],
        [3, 1, 2, 4], [3, 1, 4, 2], [3, 2, 1, 4], [3, 2, 4, 1], [3, 4, 1, 2], [3, 4, 2, 1],
        [4, 1, 2, 3], [4, 1, 3, 2], [4, 2, 1, 3], [4, 2, 3, 1], [4, 3, 1, 2], [4, 3, 2, 1],
      ],
    },
  ],
};
