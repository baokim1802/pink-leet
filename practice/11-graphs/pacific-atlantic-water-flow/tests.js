// 40x40 "ramp" with heights r + c: everything drains toward the top-left
// (Pacific), but only the bottom row and right column can reach the Atlantic.
const N = 40;
const ramp = Array.from({ length: N }, (_, r) => Array.from({ length: N }, (_, c) => r + c));
const rampAnswer = [];
for (let c = 0; c < N; c++) rampAnswer.push([N - 1, c]);
for (let r = 0; r < N - 1; r++) rampAnswer.push([r, N - 1]);

module.exports = {
  fn: 'pacificAtlantic',
  compare: 'unordered', // cells may come back in any order
  cases: [
    {
      args: [[
        [1, 2, 2, 3, 5],
        [3, 2, 3, 4, 4],
        [2, 4, 5, 3, 1],
        [6, 7, 1, 4, 5],
        [5, 1, 1, 2, 4],
      ]],
      expected: [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]],
    },
    { name: 'single cell', args: [[[1]]], expected: [[0, 0]] },
    { name: 'flat 2x2 (equal heights flow)', args: [[[7, 7], [7, 7]]], expected: [[0, 0], [0, 1], [1, 0], [1, 1]] },
    { name: 'single row touches both oceans', args: [[[1, 2, 3]]], expected: [[0, 0], [0, 1], [0, 2]] },
    { name: 'low corner only reaches the Pacific', args: [[[1, 2], [4, 3]]], expected: [[0, 1], [1, 0], [1, 1]] },
    {
      name: 'valley in the middle is trapped',
      args: [[[3, 3, 3], [3, 1, 3], [3, 3, 3]]],
      expected: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2]],
    },
    {
      name: 'peak in the middle flows everywhere',
      args: [[[1, 1, 1], [1, 2, 1], [1, 1, 1]]],
      expected: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]],
    },
    { name: '40x40 ramp', args: [ramp], expected: rampAnswer },
  ],
};
