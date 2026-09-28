const example = [
  [1, 3, 5, 7],
  [10, 11, 16, 20],
  [23, 30, 34, 60],
];

// 100 x 100 matrix holding 0, 2, 4, ..., 19998 row by row
const big = Array.from({ length: 100 }, (_, r) => Array.from({ length: 100 }, (_, c) => (r * 100 + c) * 2));

module.exports = {
  fn: 'searchMatrix',
  cases: [
    { args: [example, 3], expected: true },
    { args: [example, 13], expected: false },
    { name: 'last element', args: [example, 60], expected: true },
    { name: 'smaller than everything', args: [example, 0], expected: false },
    { name: 'bigger than everything', args: [example, 61], expected: false },
    { name: '1x1 found', args: [[[1]], 1], expected: true },
    { name: '1x1 missing', args: [[[1]], 2], expected: false },
    { name: 'single column', args: [[[-5], [-1], [4]], 4], expected: true },
    { name: 'single column, gap value', args: [[[-5], [-1], [4]], 0], expected: false },
    { name: '100x100, present', args: [big, 12346], expected: true },
    { name: '100x100, odd value is missing', args: [big, 12345], expected: false },
  ],
};
