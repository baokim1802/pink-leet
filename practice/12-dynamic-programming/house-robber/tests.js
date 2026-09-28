module.exports = {
  fn: 'rob',
  cases: [
    { args: [[1, 2, 3, 1]], expected: 4 },
    { args: [[2, 7, 9, 3, 1]], expected: 12 },
    { name: 'single house', args: [[5]], expected: 5 },
    { name: 'two houses', args: [[2, 1]], expected: 2 },
    { name: 'every-other fails', args: [[2, 1, 1, 2]], expected: 4 },
    { name: 'middle is best', args: [[1, 3, 1]], expected: 3 },
    { name: 'all zeros', args: [[0, 0, 0]], expected: 0 },
    { name: 'mixed', args: [[6, 7, 1, 30, 8, 2, 4]], expected: 41 },
    { name: '100 equal houses', args: [new Array(100).fill(400)], expected: 20000 },
  ],
};
