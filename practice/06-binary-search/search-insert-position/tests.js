// 0, 2, 4, ..., 19998 (10,000 even numbers)
const evens = Array.from({ length: 10000 }, (_, i) => i * 2);

module.exports = {
  fn: 'searchInsert',
  cases: [
    { args: [[1, 3, 5, 6], 5], expected: 2 },
    { args: [[1, 3, 5, 6], 2], expected: 1 },
    { name: 'insert past the end', args: [[1, 3, 5, 6], 7], expected: 4 },
    { name: 'insert at the front', args: [[1, 3, 5, 6], 0], expected: 0 },
    { name: 'single element, found', args: [[1], 1], expected: 0 },
    { name: 'single element, goes after', args: [[1], 2], expected: 1 },
    { name: 'single element, goes before', args: [[1], 0], expected: 0 },
    { name: 'negatives', args: [[-10, -5, 0, 3, 9], -6], expected: 1 },
    { name: '10k evens, odd target in the middle', args: [evens, 7777], expected: 3889 },
    { name: '10k evens, target after the last', args: [evens, 19999], expected: 10000 },
  ],
};
