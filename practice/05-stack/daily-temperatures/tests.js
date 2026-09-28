const N = 10000;

module.exports = {
  fn: 'dailyTemperatures',
  cases: [
    { args: [[73, 74, 75, 71, 69, 72, 76, 73]], expected: [1, 1, 4, 2, 1, 1, 0, 0] },
    { args: [[30, 40, 50, 60]], expected: [1, 1, 1, 0] },
    { args: [[30, 60, 90]], expected: [1, 1, 0] },
    { name: 'single day', args: [[50]], expected: [0] },
    { name: 'equal is not warmer', args: [[70, 70, 70]], expected: [0, 0, 0] },
    { name: 'strictly falling', args: [[90, 80, 70, 60]], expected: [0, 0, 0, 0] },
    { args: [[60, 50, 55, 70]], expected: [3, 1, 1, 0] },
    { args: [[89, 62, 70, 58, 47, 47, 46, 76, 100, 70]], expected: [8, 1, 5, 4, 3, 2, 1, 1, 0, 0] },
    {
      name: 'long flat run then one warm day',
      args: [[...new Array(N - 1).fill(50), 51]],
      expected: Array.from({ length: N }, (_, i) => N - 1 - i),
    },
  ],
};
