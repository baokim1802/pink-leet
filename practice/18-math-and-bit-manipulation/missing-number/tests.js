// Larger case: 0..10000 without 7777, in descending order.
const big = [];
for (let v = 10000; v >= 0; v--) if (v !== 7777) big.push(v);

module.exports = {
  fn: 'missingNumber',
  cases: [
    { args: [[3, 0, 1]], expected: 2 },
    { name: 'missing n itself', args: [[0, 1]], expected: 2 },
    { args: [[9, 6, 4, 2, 3, 5, 7, 0, 1]], expected: 8 },
    { name: 'single element 0', args: [[0]], expected: 1 },
    { name: 'single element 1', args: [[1]], expected: 0 },
    { name: 'missing zero', args: [[1, 2]], expected: 0 },
    { args: [[5, 4, 2, 1, 0]], expected: 3 },
    { name: 'large input', args: [big], expected: 7777 },
  ],
};
