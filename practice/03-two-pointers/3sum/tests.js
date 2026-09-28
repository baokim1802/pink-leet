// Order doesn't matter: sort numbers inside each triplet, then sort the list of triplets.
// Duplicated triplets are NOT forgiven (lengths must match).
const normalize = (list) =>
  list.map((t) => JSON.stringify([...t].sort((a, b) => a - b))).sort();

module.exports = {
  fn: 'threeSum',
  compare: (actual, expected) =>
    Array.isArray(actual) &&
    actual.every(Array.isArray) &&
    JSON.stringify(normalize(actual)) === JSON.stringify(normalize(expected)),
  cases: [
    { args: [[-1, 0, 1, 2, -1, -4]], expected: [[-1, -1, 2], [-1, 0, 1]] },
    { name: 'no triplet', args: [[0, 1, 1]], expected: [] },
    { name: 'all zeros', args: [[0, 0, 0]], expected: [[0, 0, 0]] },
    { name: 'many zeros', args: [[0, 0, 0, 0, 0]], expected: [[0, 0, 0]] },
    { name: 'all positive', args: [[1, 2, 3, 4]], expected: [] },
    { name: 'duplicates everywhere', args: [[-2, 0, 0, 2, 2]], expected: [[-2, 0, 2]] },
    {
      name: 'several triplets',
      args: [[-4, -2, -2, -2, 0, 1, 2, 2, 2, 3, 3, 4, 4, 6, 6]],
      expected: [[-4, -2, 6], [-4, 0, 4], [-4, 1, 3], [-4, 2, 2], [-2, -2, 4], [-2, 0, 2]],
    },
    { name: 'large values', args: [[-100000, 50000, 50000, 1]], expected: [[-100000, 50000, 50000]] },
  ],
};
