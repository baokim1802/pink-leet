// 60x60 of ones with a single 0 in the top-left corner:
// the distance to it is just r + c.
const N = 60;
const oneZero = Array.from({ length: N }, (_, r) => Array.from({ length: N }, (_, c) => (r === 0 && c === 0 ? 0 : 1)));
const manhattan = Array.from({ length: N }, (_, r) => Array.from({ length: N }, (_, c) => r + c));

module.exports = {
  fn: 'updateMatrix',
  cases: [
    { args: [[[0, 0, 0], [0, 1, 0], [0, 0, 0]]], expected: [[0, 0, 0], [0, 1, 0], [0, 0, 0]] },
    { args: [[[0, 0, 0], [0, 1, 0], [1, 1, 1]]], expected: [[0, 0, 0], [0, 1, 0], [1, 2, 1]] },
    { name: 'single zero', args: [[[0]]], expected: [[0]] },
    { name: 'all zeros', args: [[[0, 0], [0, 0]]], expected: [[0, 0], [0, 0]] },
    { name: 'single row', args: [[[1, 1, 0, 1, 1, 1]]], expected: [[2, 1, 0, 1, 2, 3]] },
    { name: 'single column', args: [[[1], [1], [0]]], expected: [[2], [1], [0]] },
    {
      name: 'zeros in opposite corners',
      args: [[[0, 1, 1], [1, 1, 1], [1, 1, 0]]],
      expected: [[0, 1, 2], [1, 2, 1], [2, 1, 0]],
    },
    {
      name: 'nearest zero is in a different direction per cell',
      args: [[[1, 1, 1, 1], [1, 0, 1, 1], [1, 1, 1, 0]]],
      expected: [[2, 1, 2, 2], [1, 0, 1, 1], [2, 1, 1, 0]],
    },
    { name: '60x60 with one zero in the corner', args: [oneZero], expected: manhattan },
  ],
};
