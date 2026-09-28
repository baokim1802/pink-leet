// large: 0, 1, 2, ..., 29999 with target 59997 → only 29998 + 29999 works
const big = Array.from({ length: 30000 }, (_, i) => i);

module.exports = {
  fn: 'twoSum',
  cases: [
    { args: [[2, 7, 11, 15], 9], expected: [1, 2] },
    { args: [[2, 3, 4], 6], expected: [1, 3] },
    { name: 'two elements, negatives', args: [[-1, 0], -1], expected: [1, 2] },
    { name: 'duplicates', args: [[1, 3, 3, 8], 6], expected: [2, 3] },
    { name: 'all negatives', args: [[-10, -8, -3, -1], -9], expected: [2, 4] },
    { name: 'zeros', args: [[-5, 0, 0, 7], 0], expected: [2, 3] },
    { name: 'answer in the middle', args: [[1, 3, 5, 6, 12, 20], 11], expected: [3, 4] },
    { name: 'large', args: [big, 59997], expected: [29999, 30000] },
  ],
};
