// Expected for the larger case, computed the slow way: count '1' chars in the binary string.
const slow = (n) => Array.from({ length: n + 1 }, (_, i) => i.toString(2).split('').filter((c) => c === '1').length);

module.exports = {
  fn: 'countBits',
  cases: [
    { args: [2], expected: [0, 1, 1] },
    { args: [5], expected: [0, 1, 1, 2, 1, 2] },
    { name: 'n = 0', args: [0], expected: [0] },
    { name: 'n = 1', args: [1], expected: [0, 1] },
    { name: 'up to a power of two', args: [8], expected: [0, 1, 1, 2, 1, 2, 2, 3, 1] },
    { args: [16], expected: [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4, 1] },
    { args: [7], expected: [0, 1, 1, 2, 1, 2, 2, 3] },
    { name: 'large n', args: [100000], expected: slow(100000) },
  ],
};
