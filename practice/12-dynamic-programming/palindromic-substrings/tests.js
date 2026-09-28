module.exports = {
  fn: 'countSubstrings',
  cases: [
    { args: ['abc'], expected: 3 },
    { args: ['aaa'], expected: 6 },
    { name: 'single character', args: ['z'], expected: 1 },
    { name: 'two different', args: ['ab'], expected: 2 },
    { name: 'even palindrome', args: ['abba'], expected: 6 },
    { name: 'nested palindromes', args: ['aabaa'], expected: 9 },
    { args: ['racecar'], expected: 10 },
    { args: ['abcbad'], expected: 8 },
    { name: '1000 identical letters', args: ['a'.repeat(1000)], expected: 500500 },
  ],
};
