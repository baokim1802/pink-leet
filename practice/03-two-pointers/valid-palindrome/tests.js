module.exports = {
  fn: 'isPalindrome',
  cases: [
    { args: ['A man, a plan, a canal: Panama'], expected: true },
    { args: ['race a car'], expected: false },
    { name: 'only a space', args: [' '], expected: true },
    { name: 'single character', args: ['a'], expected: true },
    { name: 'digit vs letter', args: ['0P'], expected: false },
    { name: 'only punctuation', args: ['.,!?'], expected: true },
    { name: 'mixed case', args: ['No lemon, no melon'], expected: true },
    { name: 'digits', args: ['12a21'], expected: true },
    { name: 'almost palindrome', args: ['ab_a b'], expected: false },
    { name: 'large', args: ['x'.repeat(50000) + '!y?' + 'x'.repeat(50000)], expected: true },
  ],
};
