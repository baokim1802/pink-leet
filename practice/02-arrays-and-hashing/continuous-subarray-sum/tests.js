// large: 10^5 ones with k bigger than the whole sum → no multiple of k besides 0
const N = 100000;

module.exports = {
  fn: 'checkSubarraySum',
  cases: [
    { args: [[23, 2, 4, 6, 7], 6], expected: true },
    { args: [[23, 2, 6, 4, 7], 6], expected: true },
    { args: [[23, 2, 6, 4, 7], 13], expected: false },
    { name: 'single zero is too short', args: [[0], 1], expected: false },
    { name: 'two zeros', args: [[0, 0], 1], expected: true },
    { name: 'only a 1-long slice works', args: [[1, 2, 12], 6], expected: false },
    { name: 'keep the first index', args: [[6, 0], 6], expected: true },
    { name: 'zeros in the middle', args: [[5, 0, 0, 0], 3], expected: true },
    { name: 'no match', args: [[1, 0], 2], expected: false },
    { name: 'large numbers', args: [[1000000000, 1000000000], 2000000000], expected: true },
    { name: 'large, no match', args: [new Array(N).fill(1), N + 1], expected: false },
  ],
};
