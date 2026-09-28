// large: "AB" repeated 50000 times → with k changes you can cover 2k + 1 characters
const big = 'AB'.repeat(50000);

module.exports = {
  fn: 'characterReplacement',
  cases: [
    { args: ['ABAB', 2], expected: 4 },
    { args: ['AABABBA', 1], expected: 4 },
    { name: 'single character', args: ['A', 0], expected: 1 },
    { name: 'k = 0', args: ['AABBBCC', 0], expected: 3 },
    { name: 'already uniform', args: ['BBBB', 2], expected: 4 },
    { name: 'k covers the whole string', args: ['ABCDE', 5], expected: 5 },
    { name: 'all different', args: ['ABCDE', 1], expected: 2 },
    { args: ['ABBB', 2], expected: 4 },
    { args: ['AAAB', 0], expected: 3 },
    { args: ['ABAA', 0], expected: 2 },
    { name: 'large alternating', args: [big, 1000], expected: 2001 },
  ],
};
