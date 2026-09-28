const evens = Array.from({ length: 10000 }, (_, i) => i * 2); // 0, 2, 4, ..., 19998

module.exports = {
  fn: 'search',
  cases: [
    { args: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 },
    { name: 'missing target', args: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 },
    { name: 'single element, found', args: [[5], 5], expected: 0 },
    { name: 'single element, missing', args: [[5], -5], expected: -1 },
    { name: 'first element', args: [[1, 3], 1], expected: 0 },
    { name: 'last element', args: [[1, 3], 3], expected: 1 },
    { name: 'smaller than everything', args: [[1, 3], 0], expected: -1 },
    { name: 'larger than everything', args: [[1, 3], 4], expected: -1 },
    { args: [[2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 23], expected: 5 },
    { name: 'large input, found', args: [evens, 12346], expected: 6173 },
    { name: 'large input, missing', args: [evens, 7], expected: -1 },
  ],
};
