module.exports = {
  fn: 'search',
  cases: [
    { args: [[4, 5, 6, 7, 0, 1, 2], 0], expected: 4 },
    { name: 'missing target', args: [[4, 5, 6, 7, 0, 1, 2], 3], expected: -1 },
    { name: 'single element, missing', args: [[1], 0], expected: -1 },
    { name: 'single element, found', args: [[1], 1], expected: 0 },
    { name: 'two elements, rotated', args: [[3, 1], 1], expected: 1 },
    { name: 'two elements, not rotated', args: [[1, 3], 3], expected: 1 },
    { args: [[5, 1, 3], 5], expected: 0 },
    { args: [[5, 1, 3], 3], expected: 2 },
    { name: 'target is the max, right before the drop', args: [[4, 5, 6, 7, 8, 1, 2, 3], 8], expected: 4 },
    { name: 'not rotated at all', args: [[1, 2, 3, 4, 5], 4], expected: 3 },
    { name: 'target at index 0', args: [[6, 7, 1, 2, 3, 4, 5], 6], expected: 0 },
  ],
};
