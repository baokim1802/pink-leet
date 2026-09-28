module.exports = {
  fn: 'maxProfit',
  cases: [
    { args: [[7, 1, 5, 3, 6, 4]], expected: 5 },
    { name: 'prices only fall', args: [[7, 6, 4, 3, 1]], expected: 0 },
    { name: 'single day', args: [[1]], expected: 0 },
    { name: 'two days, rising', args: [[1, 2]], expected: 1 },
    { name: 'all equal', args: [[3, 3, 3]], expected: 0 },
    { name: 'new low after the best trade', args: [[2, 4, 1]], expected: 2 },
    { name: 'best trade after a new low', args: [[3, 2, 6, 5, 0, 3]], expected: 4 },
    { args: [[2, 1, 2, 1, 0, 1, 2]], expected: 2 },
    { name: 'zero price', args: [[0, 5]], expected: 5 },
    { name: 'large rising input', args: [Array.from({ length: 10000 }, (_, i) => i)], expected: 9999 },
  ],
};
