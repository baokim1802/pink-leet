// Boards are written as 9 strings of 9 chars for readability, then split into cells.
const grid = (rows) => rows.map((row) => row.split(''));

const example = [
  '53..7....',
  '6..195...',
  '.98....6.',
  '8...6...3',
  '4..8.3..1',
  '7...2...6',
  '.6....28.',
  '...419..5',
  '....8..79',
];

const withCell = (rows, r, c, d) => rows.map((row, i) => (i === r ? row.slice(0, c) + d + row.slice(c + 1) : row));

const solved = [
  '534678912',
  '672195348',
  '198342567',
  '859761423',
  '426853791',
  '713924856',
  '961537284',
  '287419635',
  '345286179',
];

module.exports = {
  fn: 'isValidSudoku',
  cases: [
    { args: [grid(example)], expected: true },
    { name: 'duplicate in a column and box', args: [grid(withCell(example, 0, 0, '8'))], expected: false },
    { name: 'empty board', args: [grid(new Array(9).fill('.........'))], expected: true },
    { name: 'fully solved board', args: [grid(solved)], expected: true },
    // row 0 gets a second 5 at column 6 (column 6 and the top-right box don't have a 5 yet)
    { name: 'duplicate only in a row', args: [grid(withCell(example, 0, 6, '5'))], expected: false },
    // '1' at (0,0) and (8,0): same column, different rows and boxes
    {
      name: 'duplicate only in a column',
      args: [grid(['1........', '.........', '.........', '.........', '.........', '.........', '.........', '.........', '1........'])],
      expected: false,
    },
    // '7' at (3,3) and (5,5): same middle box, different rows and columns
    {
      name: 'duplicate only in a box',
      args: [grid(['.........', '.........', '.........', '...7.....', '.........', '.....7...', '.........', '.........', '.........'])],
      expected: false,
    },
    // the same digit may appear many times as long as rows, columns and boxes all differ
    {
      name: 'same digit in different row, column and box',
      args: [grid(['9........', '.........', '.........', '....9....', '.........', '.........', '.........', '.........', '........9'])],
      expected: true,
    },
    { name: 'one wrong cell in a solved board', args: [grid(withCell(solved, 0, 0, '3'))], expected: false },
  ],
};
