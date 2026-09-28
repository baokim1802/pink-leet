// large: the values 0..49999 shuffled deterministically, plus far-away noise
const N = 50000;
const big = Array.from({ length: N }, (_, i) => (i * 7919) % N); // 7919 is prime, so this is a permutation
for (let i = 0; i < 1000; i++) big.push(1000000 + i * 2); // isolated values, runs of length 1

module.exports = {
  fn: 'longestConsecutive',
  cases: [
    { args: [[100, 4, 200, 1, 3, 2]], expected: 4 },
    { args: [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]], expected: 9 },
    { args: [[1, 0, 1, 2]], expected: 3 },
    { name: 'empty', args: [[]], expected: 0 },
    { name: 'single element', args: [[42]], expected: 1 },
    { name: 'all duplicates', args: [[5, 5, 5, 5]], expected: 1 },
    { name: 'negatives', args: [[-3, -1, -2, 5, 6, 0]], expected: 4 },
    { name: 'no neighbours', args: [[10, 20, 30]], expected: 1 },
    { name: 'two runs', args: [[9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6]], expected: 7 },
    { name: 'large', args: [big], expected: N },
  ],
};
