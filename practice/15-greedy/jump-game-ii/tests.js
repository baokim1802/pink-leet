const allOnes = new Array(10000).fill(1);
// 10000 twos: each jump covers 2 indices
const allTwos = new Array(10000).fill(2);

module.exports = {
  fn: 'jump',
  cases: [
    { args: [[2, 3, 1, 1, 4]], expected: 2 },
    { args: [[2, 3, 0, 1, 4]], expected: 2 },
    { name: 'already at the end', args: [[0]], expected: 0 },
    { name: 'two elements', args: [[1, 2]], expected: 1 },
    { name: 'forced single steps', args: [[1, 1, 1, 1]], expected: 3 },
    { name: 'one jump covers everything', args: [[10, 1, 1, 1]], expected: 1 },
    { name: 'every jump is short', args: [[2, 1, 1, 1, 1]], expected: 3 },
    { name: 'shorter first jump pays off', args: [[3, 4, 1, 1, 1, 1, 1]], expected: 3 },
    { name: '10000 ones', args: [allOnes], expected: 9999 },
    { name: '10000 twos', args: [allTwos], expected: 5000 },
  ],
};
