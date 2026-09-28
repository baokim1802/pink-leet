// Several substrings can tie for longest, so accept any answer that is
// (1) a substring of s, (2) a palindrome, and (3) as long as the expected one.
const isPalindrome = (t) => t === [...t].reverse().join('');

module.exports = {
  fn: 'longestPalindrome',
  compare: (actual, expected, [s]) =>
    typeof actual === 'string' &&
    actual.length === expected.length &&
    s.includes(actual) &&
    isPalindrome(actual),
  cases: [
    { name: 'tie: "bab" or "aba"', args: ['babad'], expected: 'bab' },
    { args: ['cbbd'], expected: 'bb' },
    { name: 'single character', args: ['a'], expected: 'a' },
    { name: 'no repeats: any single char', args: ['ac'], expected: 'a' },
    { name: 'whole string', args: ['racecar'], expected: 'racecar' },
    { name: 'even-length inside', args: ['forgeeksskeegfor'], expected: 'geeksskeeg' },
    { name: 'reversed copy is not a palindrome', args: ['abacdfgdcaba'], expected: 'aba' },
    { name: 'all same', args: ['aaaa'], expected: 'aaaa' },
    { name: 'digits and mixed case', args: ['Aa1221aB'], expected: 'a1221a' },
    {
      name: 'long string',
      args: ['xy'.repeat(200) + 'abcdefgfedcba' + 'z'.repeat(450) + 'q'],
      expected: 'z'.repeat(450),
    },
  ],
};
