const BOARD = [
  ['A', 'B', 'C', 'E'],
  ['S', 'F', 'C', 'S'],
  ['A', 'D', 'E', 'E'],
];
const allA = (n) => Array.from({ length: n }, () => new Array(n).fill('A'));

module.exports = {
  fn: 'exist',
  cases: [
    { args: [BOARD, 'ABCCED'], expected: true },
    { args: [BOARD, 'SEE'], expected: true },
    { name: 'would reuse a cell', args: [BOARD, 'ABCB'], expected: false },
    { name: 'single cell match', args: [[['a']], 'a'], expected: true },
    { name: 'single cell miss', args: [[['a']], 'b'], expected: false },
    { name: 'cannot bounce back and forth', args: [[['a', 'a']], 'aaa'], expected: false },
    { name: 'no diagonal moves', args: [[['a', 'b'], ['c', 'd']], 'ad'], expected: false },
    {
      name: 'first path is a dead end, must backtrack',
      args: [[['C', 'A', 'A'], ['A', 'A', 'A'], ['B', 'C', 'D']], 'AAB'],
      expected: true,
    },
    {
      name: 'winding path',
      args: [[['A', 'B', 'C', 'E'], ['S', 'F', 'E', 'S'], ['A', 'D', 'E', 'E']], 'ABCESEEEFS'],
      expected: true,
    },
    { name: 'snake through every cell', args: [allA(4), 'AAAAAAAAAAAAAAAA'], expected: true },
    { name: 'larger: letter missing from a 6x6 board', args: [allA(6), 'AAAAAAAAAAAAAAB'], expected: false },
  ],
};
