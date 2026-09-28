// Build a long valid interleaving: take 1, 2 or 3 characters at a time, alternating.
const longA = 'abcab'.repeat(20);
const longB = 'bacca'.repeat(20);
let woven = '';
for (let i = 0, j = 0, k = 0; i < longA.length || j < longB.length; k++) {
  const step = (k % 3) + 1;
  woven += longA.slice(i, i + step); i += step;
  woven += longB.slice(j, j + step); j += step;
}

module.exports = {
  fn: 'isInterleave',
  cases: [
    { args: ['aabcc', 'dbbca', 'aadbbcbcac'], expected: true },
    { args: ['aabcc', 'dbbca', 'aadbbbaccc'], expected: false },
    { name: 'all empty', args: ['', '', ''], expected: true },
    { name: 'first empty', args: ['', 'b', 'b'], expected: true },
    { name: 'second empty, mismatch', args: ['a', '', 'b'], expected: false },
    { name: 'lengths do not add up', args: ['a', 'b', 'abc'], expected: false },
    { name: 'greedy choice fails', args: ['aa', 'ab', 'aaba'], expected: true },
    { name: 'order inside s2 must be kept', args: ['a', 'bc', 'acb'], expected: false },
    { name: 'long valid interleaving', args: [longA, longB, woven], expected: true },
    { name: 'long, lots of backtracking, no answer', args: ['a'.repeat(50) + 'b' + 'a'.repeat(49), 'a'.repeat(100), 'a'.repeat(40) + 'b' + 'a'.repeat(159)], expected: false },
  ],
};
