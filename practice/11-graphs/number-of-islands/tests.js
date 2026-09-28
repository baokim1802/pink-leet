// 10x10 checkerboard: land where (r + c) is even -> 50 isolated single-cell islands
const checkerboard = Array.from({ length: 10 }, (_, r) =>
  Array.from({ length: 10 }, (_, c) => ((r + c) % 2 === 0 ? '1' : '0')),
);
// 50x50 all land -> one big island
const allLand = Array.from({ length: 50 }, () => new Array(50).fill('1'));

module.exports = {
  fn: 'numIslands',
  cases: [
    {
      args: [[
        ['1', '1', '1', '1', '0'],
        ['1', '1', '0', '1', '0'],
        ['1', '1', '0', '0', '0'],
        ['0', '0', '0', '0', '0'],
      ]],
      expected: 1,
    },
    {
      args: [[
        ['1', '1', '0', '0', '0'],
        ['1', '1', '0', '0', '0'],
        ['0', '0', '1', '0', '0'],
        ['0', '0', '0', '1', '1'],
      ]],
      expected: 3,
    },
    { name: 'single water cell', args: [[['0']]], expected: 0 },
    { name: 'single land cell', args: [[['1']]], expected: 1 },
    { name: 'diagonals do not connect', args: [[['1', '0'], ['0', '1']]], expected: 2 },
    { name: 'single row', args: [[['1', '0', '1', '1', '0', '1']]], expected: 3 },
    {
      name: 'island wraps around a lake',
      args: [[
        ['1', '1', '1'],
        ['1', '0', '1'],
        ['1', '1', '1'],
      ]],
      expected: 1,
    },
    {
      name: 'U-shape needs to walk back up',
      args: [[
        ['1', '0', '1'],
        ['1', '0', '1'],
        ['1', '1', '1'],
      ]],
      expected: 1,
    },
    { name: '10x10 checkerboard', args: [checkerboard], expected: 50 },
    { name: '50x50 all land', args: [allLand], expected: 1 },
  ],
};
