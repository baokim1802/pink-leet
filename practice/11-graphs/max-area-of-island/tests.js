// 10x10 checkerboard: every land cell is its own island of area 1
const checkerboard = Array.from({ length: 10 }, (_, r) =>
  Array.from({ length: 10 }, (_, c) => ((r + c) % 2 === 0 ? 1 : 0)),
);
// 50x50 all land -> one island of area 2500
const allLand = Array.from({ length: 50 }, () => new Array(50).fill(1));

module.exports = {
  fn: 'maxAreaOfIsland',
  cases: [
    {
      args: [[
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
        [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      ]],
      expected: 6,
    },
    { name: 'no land', args: [[[0, 0, 0, 0, 0, 0, 0, 0]]], expected: 0 },
    { name: 'single land cell', args: [[[1]]], expected: 1 },
    { name: 'diagonals do not connect', args: [[[1, 0], [0, 1]]], expected: 1 },
    { name: 'bigger island wins', args: [[[1, 1, 0], [1, 0, 0], [0, 0, 1]]], expected: 3 },
    {
      name: 'U-shape needs to walk back up',
      args: [[
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
      ]],
      expected: 7,
    },
    { name: '10x10 checkerboard', args: [checkerboard], expected: 1 },
    { name: '50x50 all land', args: [allLand], expected: 2500 },
  ],
};
