// 50x50 board: "X" border around an "O" interior -> everything is captured
const N = 50;
const boxed = Array.from({ length: N }, (_, r) =>
  Array.from({ length: N }, (_, c) => (r === 0 || c === 0 || r === N - 1 || c === N - 1 ? 'X' : 'O')),
);
const allX = Array.from({ length: N }, () => new Array(N).fill('X'));
// same board with one hole in the top border -> the whole interior escapes
const leaky = boxed.map((row) => [...row]);
leaky[0][25] = 'O';

module.exports = {
  fn: 'solve',
  inPlace: 0, // we check the board after your function runs
  cases: [
    {
      args: [[
        ['X', 'X', 'X', 'X'],
        ['X', 'O', 'O', 'X'],
        ['X', 'X', 'O', 'X'],
        ['X', 'O', 'X', 'X'],
      ]],
      expected: [
        ['X', 'X', 'X', 'X'],
        ['X', 'X', 'X', 'X'],
        ['X', 'X', 'X', 'X'],
        ['X', 'O', 'X', 'X'],
      ],
    },
    { name: 'single X', args: [[['X']]], expected: [['X']] },
    { name: 'single O is on the border', args: [[['O']]], expected: [['O']] },
    {
      name: 'all O touches the border',
      args: [[['O', 'O', 'O'], ['O', 'O', 'O'], ['O', 'O', 'O']]],
      expected: [['O', 'O', 'O'], ['O', 'O', 'O'], ['O', 'O', 'O']],
    },
    {
      name: 'lone O in the center is captured',
      args: [[['X', 'X', 'X'], ['X', 'O', 'X'], ['X', 'X', 'X']]],
      expected: [['X', 'X', 'X'], ['X', 'X', 'X'], ['X', 'X', 'X']],
    },
    {
      name: 'interior region escapes through a winding path',
      args: [[
        ['X', 'X', 'X', 'X'],
        ['X', 'O', 'O', 'X'],
        ['X', 'O', 'X', 'X'],
        ['X', 'O', 'X', 'X'],
      ]],
      expected: [
        ['X', 'X', 'X', 'X'],
        ['X', 'O', 'O', 'X'],
        ['X', 'O', 'X', 'X'],
        ['X', 'O', 'X', 'X'],
      ],
    },
    {
      name: 'one region captured, one escapes',
      args: [[
        ['X', 'X', 'X', 'X', 'X'],
        ['X', 'O', 'X', 'O', 'X'],
        ['X', 'O', 'X', 'O', 'O'],
        ['X', 'X', 'X', 'X', 'X'],
        ['O', 'X', 'X', 'X', 'O'],
      ]],
      expected: [
        ['X', 'X', 'X', 'X', 'X'],
        ['X', 'X', 'X', 'O', 'X'],
        ['X', 'X', 'X', 'O', 'O'],
        ['X', 'X', 'X', 'X', 'X'],
        ['O', 'X', 'X', 'X', 'O'],
      ],
    },
    { name: '50x50 boxed-in interior', args: [boxed], expected: allX },
    { name: '50x50 interior with a leak in the border', args: [leaky], expected: leaky },
  ],
};
