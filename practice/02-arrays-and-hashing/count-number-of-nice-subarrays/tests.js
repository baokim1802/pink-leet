// large: 50000 odd numbers, k = 1 → every single element is nice, nothing longer
const N = 50000;

module.exports = {
  fn: 'numberOfSubarrays',
  cases: [
    { args: [[1, 1, 2, 1, 1], 3], expected: 2 },
    { args: [[2, 4, 6], 1], expected: 0 },
    { args: [[2, 2, 2, 1, 2, 2, 1, 2, 2, 2], 2], expected: 16 },
    { name: 'single odd', args: [[3], 1], expected: 1 },
    { name: 'single even', args: [[4], 1], expected: 0 },
    { name: 'all odd, k = whole array', args: [[1, 3, 5], 3], expected: 1 },
    { name: 'evens around one odd', args: [[2, 1, 2], 1], expected: 4 },
    { name: 'large, all odd', args: [new Array(N).fill(7), 1], expected: N },
  ],
};
