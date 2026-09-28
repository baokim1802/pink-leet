// 50x50 all zeros, filled with 1 from the middle -> everything becomes 1
const zeros = Array.from({ length: 50 }, () => new Array(50).fill(0));
const ones = Array.from({ length: 50 }, () => new Array(50).fill(1));

module.exports = {
  fn: 'floodFill',
  cases: [
    { args: [[[1, 1, 1], [1, 1, 0], [1, 0, 1]], 1, 1, 2], expected: [[2, 2, 2], [2, 2, 0], [2, 0, 1]] },
    { name: 'new color equals old color', args: [[[0, 0, 0], [0, 0, 0]], 0, 0, 0], expected: [[0, 0, 0], [0, 0, 0]] },
    { name: 'single pixel', args: [[[5]], 0, 0, 7], expected: [[7]] },
    { name: 'diagonal pixel is not connected', args: [[[1, 0], [0, 1]], 0, 0, 3], expected: [[3, 0], [0, 1]] },
    { name: 'isolated pixel in the middle', args: [[[0, 0, 0], [0, 1, 0]], 1, 1, 2], expected: [[0, 0, 0], [0, 2, 0]] },
    {
      name: 'start inside the surrounding color',
      args: [[[0, 0, 0], [0, 1, 0], [0, 0, 0]], 0, 0, 4],
      expected: [[4, 4, 4], [4, 1, 4], [4, 4, 4]],
    },
    {
      name: 'snake-shaped region',
      args: [[[1, 1, 1], [0, 0, 1], [1, 1, 1]], 2, 0, 9],
      expected: [[9, 9, 9], [0, 0, 9], [9, 9, 9]],
    },
    { name: '50x50 fill from the middle', args: [zeros, 25, 25, 1], expected: ones },
  ],
};
