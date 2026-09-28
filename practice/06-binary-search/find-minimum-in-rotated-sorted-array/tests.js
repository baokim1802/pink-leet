// -5000, -4998, ..., 4998 (5000 values), rotated so it starts at index 3210
const sorted = Array.from({ length: 5000 }, (_, i) => i * 2 - 5000);
const rotated = [...sorted.slice(3210), ...sorted.slice(0, 3210)];

module.exports = {
  fn: 'findMin',
  cases: [
    { args: [[3, 4, 5, 1, 2]], expected: 1 },
    { args: [[4, 5, 6, 7, 0, 1, 2]], expected: 0 },
    { name: 'not rotated', args: [[11, 13, 15, 17]], expected: 11 },
    { name: 'single element', args: [[1]], expected: 1 },
    { name: 'two elements, rotated', args: [[2, 1]], expected: 1 },
    { name: 'two elements, sorted', args: [[1, 2]], expected: 1 },
    { name: 'minimum is last', args: [[2, 3, 4, 5, 1]], expected: 1 },
    { name: 'negatives', args: [[5, -3, -2, 0, 2]], expected: -3 },
    { name: '5000 values, rotated', args: [rotated], expected: -5000 },
  ],
};
