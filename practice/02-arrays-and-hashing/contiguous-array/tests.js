// large: 10^5 alternating 0,1 → the whole array is balanced
const N = 100000;

module.exports = {
  fn: 'findMaxLength',
  cases: [
    { args: [[0, 1]], expected: 2 },
    { args: [[0, 1, 0]], expected: 2 },
    { args: [[0, 1, 1, 1, 1, 1, 0, 0, 0]], expected: 6 },
    { name: 'single element', args: [[0]], expected: 0 },
    { name: 'all ones', args: [[1, 1, 1]], expected: 0 },
    { name: 'balanced slice in the middle', args: [[0, 0, 1, 0, 0, 0, 1, 1]], expected: 6 },
    { name: 'whole array from index 0', args: [[1, 1, 0, 0]], expected: 4 },
    { name: 'large, alternating', args: [Array.from({ length: N }, (_, i) => i % 2)], expected: N },
  ],
};
