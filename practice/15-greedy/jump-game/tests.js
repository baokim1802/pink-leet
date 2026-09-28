const allOnes = new Array(10000).fill(1);
const onesWithHole = [...allOnes];
onesWithHole[5000] = 0;

module.exports = {
  fn: 'canJump',
  cases: [
    { args: [[2, 3, 1, 1, 4]], expected: true },
    { args: [[3, 2, 1, 0, 4]], expected: false },
    { name: 'single element is already at the end', args: [[0]], expected: true },
    { name: 'stuck at the start', args: [[0, 1]], expected: false },
    { name: 'zero at the last index is fine', args: [[1, 0]], expected: true },
    { name: 'jump over zeros', args: [[2, 0, 0]], expected: true },
    { name: 'trapped by a zero in the middle', args: [[1, 1, 0, 1]], expected: false },
    { name: 'one big jump covers everything', args: [[5, 0, 0, 0, 0, 0]], expected: true },
    { name: 'earlier index reaches past a trap', args: [[4, 1, 1, 0, 1]], expected: true },
    { name: '10000 ones', args: [allOnes], expected: true },
    { name: '10000 ones with one hole', args: [onesWithHole], expected: false },
  ],
};
