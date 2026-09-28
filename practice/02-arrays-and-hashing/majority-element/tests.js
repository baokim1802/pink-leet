// large: 25001 copies of 7 interleaved with 24999 other values
const big = [];
for (let i = 0; i < 24999; i++) big.push(7, i + 100);
big.push(7, 7);

module.exports = {
  fn: 'majorityElement',
  cases: [
    { args: [[3, 2, 3]], expected: 3 },
    { args: [[2, 2, 1, 1, 1, 2, 2]], expected: 2 },
    { name: 'single element', args: [[5]], expected: 5 },
    { name: 'all the same', args: [[4, 4, 4, 4]], expected: 4 },
    { name: 'negatives', args: [[-1, -1, 2, -1, 3]], expected: -1 },
    { name: 'majority at the end', args: [[1, 2, 3, 9, 9, 9, 9]], expected: 9 },
    { name: 'majority at the start', args: [[6, 6, 6, 1, 2]], expected: 6 },
    { name: 'large values', args: [[1000000000, -1000000000, 1000000000]], expected: 1000000000 },
    { name: 'large, interleaved', args: [big], expected: 7 },
  ],
};
