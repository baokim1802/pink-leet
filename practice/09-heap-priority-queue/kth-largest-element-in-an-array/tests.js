// Larger case: 50,000 pseudo-random values in [-10000, 10000].
// The expected answer is computed independently by sorting (brute force).
let seed = 12345;
const rand = () => (seed = (seed * 1103515245 + 12345) % 2147483648);
const big = Array.from({ length: 50000 }, () => (rand() % 20001) - 10000);
const bigSortedDesc = [...big].sort((a, b) => b - a);

module.exports = {
  fn: 'findKthLargest',
  cases: [
    { args: [[3, 2, 1, 5, 6, 4], 2], expected: 5 },
    { args: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4], expected: 4 },
    { name: 'single element', args: [[1], 1], expected: 1 },
    { name: 'k = n is the minimum', args: [[5, -2, 9, 0, 9, 3], 6], expected: -2 },
    { name: 'k = 1 is the maximum', args: [[-1, -3, -2], 1], expected: -1 },
    { name: 'duplicates count separately', args: [[5, 5, 4], 2], expected: 5 },
    { name: 'all equal', args: [[7, 7, 7, 7], 3], expected: 7 },
    { name: 'two elements', args: [[2, 1], 2], expected: 1 },
    { name: '50k values, k = 1000', args: [big, 1000], expected: bigSortedDesc[999] },
    { name: '50k values, k = 25000', args: [big, 25000], expected: bigSortedDesc[24999] },
  ],
};
