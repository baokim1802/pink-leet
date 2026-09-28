const big = Array.from({ length: 5000 }, (_, i) => (i * 7919 + ((i * i) % 97)) % 1001);

module.exports = {
  fn: 'maxProfit',
  cases: [
    { args: [[1, 2, 3, 0, 2]], expected: 3 },
    { name: 'single day', args: [[1]], expected: 0 },
    { args: [[1, 4, 2, 7]], expected: 6 },
    { name: 'falling prices', args: [[5, 4, 3, 2, 1]], expected: 0 },
    { name: 'rising prices', args: [[1, 2, 3, 4, 5]], expected: 4 },
    { name: 'two days', args: [[2, 1, 4]], expected: 3 },
    { name: 'flat prices', args: [[3, 3, 3, 3]], expected: 0 },
    { name: 'two separate trades', args: [[1, 5, 0, 0, 6]], expected: 10 },
    { name: 'zigzag', args: [[6, 1, 6, 4, 3, 0, 2]], expected: 7 },
    { name: 'mixed', args: [[1, 2, 4, 2, 5, 7, 2, 4, 9, 0]], expected: 11 },
    { name: '5000 days', args: [big], expected: 398711 },
  ],
};
