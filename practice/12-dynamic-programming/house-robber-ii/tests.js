module.exports = {
  fn: 'rob',
  cases: [
    { args: [[2, 3, 2]], expected: 3 },
    { args: [[1, 2, 3, 1]], expected: 4 },
    { args: [[1, 2, 3]], expected: 3 },
    { name: 'single house', args: [[7]], expected: 7 },
    { name: 'two houses are neighbors', args: [[1, 2]], expected: 2 },
    { name: 'first and last compete', args: [[200, 3, 140, 20, 10]], expected: 340 },
    { name: 'last house is the prize', args: [[1, 3, 1, 3, 100]], expected: 103 },
    { name: 'all zeros', args: [[0, 0, 0, 0]], expected: 0 },
    { name: 'odd circle of equals', args: [[5, 5, 5, 5, 5]], expected: 10 },
    { name: '100 equal houses', args: [new Array(100).fill(1000)], expected: 50000 },
  ],
};
