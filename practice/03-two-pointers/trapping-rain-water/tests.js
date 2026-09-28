// large: walls of height 100 at both ends with a 20000-wide floor of 0s in between
const N = 20000;

module.exports = {
  fn: 'trap',
  cases: [
    { args: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], expected: 6 },
    { args: [[4, 2, 0, 3, 2, 5]], expected: 9 },
    { name: 'single bar', args: [[5]], expected: 0 },
    { name: 'decreasing', args: [[3, 2, 1]], expected: 0 },
    { name: 'increasing', args: [[1, 2, 3, 4]], expected: 0 },
    { name: 'simple valley', args: [[3, 0, 3]], expected: 3 },
    { name: 'uneven walls', args: [[2, 0, 0, 5]], expected: 4 },
    { name: 'flat', args: [[2, 2, 2, 2]], expected: 0 },
    { name: 'peak in the middle', args: [[1, 0, 3, 0, 2]], expected: 3 },
    { name: 'large basin', args: [[100, ...new Array(N).fill(0), 100]], expected: 100 * N },
  ],
};
