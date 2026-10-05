// large: 9999 ones → the middle index has 4999 ones on each side
const N = 9999;

module.exports = {
  fn: 'pivotIndex',
  cases: [
    { args: [[1, 7, 3, 6, 5, 6]], expected: 3 },
    { args: [[1, 2, 3]], expected: -1 },
    { args: [[2, 1, -1]], expected: 0 },
    { name: 'single element', args: [[5]], expected: 0 },
    { name: 'leftmost of several', args: [[0, 0, 0]], expected: 0 },
    { name: 'pivot at the end', args: [[-1, -1, 0, 1, 1, 0]], expected: 5 },
    { name: 'negatives', args: [[-1, -1, -1, -1, -1, 0]], expected: 2 },
    { name: 'two elements, none', args: [[1, 2]], expected: -1 },
    { name: 'large, all ones', args: [new Array(N).fill(1)], expected: (N - 1) / 2 },
  ],
};
