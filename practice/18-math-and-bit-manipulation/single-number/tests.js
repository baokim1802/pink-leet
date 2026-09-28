// Larger case: pairs of 1..5000 with 30000 hidden in the middle.
const big = [];
for (let i = 1; i <= 5000; i++) big.push(i);
big.push(30000);
for (let i = 5000; i >= 1; i--) big.push(i);

module.exports = {
  fn: 'singleNumber',
  cases: [
    { args: [[2, 2, 1]], expected: 1 },
    { args: [[4, 1, 2, 1, 2]], expected: 4 },
    { name: 'single element', args: [[1]], expected: 1 },
    { name: 'negative answer', args: [[-1, -1, -2]], expected: -2 },
    { name: 'negative among positives', args: [[1, -1, 1, 2, 2]], expected: -1 },
    { name: 'answer is zero', args: [[5, 0, 5]], expected: 0 },
    { name: 'answer first', args: [[-30000, 7, 30000, 7, 30000]], expected: -30000 },
    { name: 'large input', args: [big], expected: 30000 },
  ],
};
