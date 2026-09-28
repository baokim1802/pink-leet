// large: 0, 1, 0, 2, 0, 3, ... → 1..N followed by N zeros
const N = 10000;
const big = [];
for (let i = 1; i <= N; i++) big.push(0, i);

module.exports = {
  fn: 'moveZeroes',
  inPlace: 0,
  cases: [
    { args: [[0, 1, 0, 3, 12]], expected: [1, 3, 12, 0, 0] },
    { name: 'single zero', args: [[0]], expected: [0] },
    { name: 'single non-zero', args: [[7]], expected: [7] },
    { name: 'no zeros', args: [[1, 2, 3]], expected: [1, 2, 3] },
    { name: 'all zeros', args: [[0, 0, 0]], expected: [0, 0, 0] },
    { name: 'zeros already at the end', args: [[4, 5, 0, 0]], expected: [4, 5, 0, 0] },
    { name: 'zeros at the start', args: [[0, 0, 1]], expected: [1, 0, 0] },
    { name: 'negatives keep their order', args: [[-1, 0, -3, 0, 2, -1]], expected: [-1, -3, 2, -1, 0, 0] },
    { name: 'large', args: [big], expected: [...Array.from({ length: N }, (_, i) => i + 1), ...new Array(N).fill(0)] },
  ],
};
