module.exports = {
  fn: 'lengthOfLongestSubstring',
  cases: [
    { args: ['abcabcbb'], expected: 3 },
    { args: ['bbbbb'], expected: 1 },
    { args: ['pwwkew'], expected: 3 },
    { name: 'empty string', args: [''], expected: 0 },
    { name: 'single space', args: [' '], expected: 1 },
    { args: ['dvdf'], expected: 3 },
    { name: 'left must not move backwards', args: ['abba'], expected: 2 },
    { args: ['tmmzuxt'], expected: 5 },
    { name: 'all unique', args: ['abcdef'], expected: 6 },
    { name: 'large repeating alphabet', args: ['abcdefghijklmnopqrstuvwxyz'.repeat(500)], expected: 26 },
  ],
};
