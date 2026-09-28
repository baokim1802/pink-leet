const letters = 'abcdefghijklmnopqrstuvwxyz';
const big = Array.from({ length: 50000 }, (_, i) => letters[(i * 7) % 26]).join('');
const bigShuffled = big.split('').reverse().join('');
const bigOff = bigShuffled.slice(0, -1) + (bigShuffled.endsWith('z') ? 'y' : 'z');

module.exports = {
  fn: 'isAnagram',
  cases: [
    { args: ['anagram', 'nagaram'], expected: true },
    { args: ['rat', 'car'], expected: false },
    { name: 'single equal letters', args: ['a', 'a'], expected: true },
    { name: 'different lengths', args: ['ab', 'a'], expected: false },
    { name: 'same letters, different counts', args: ['aacc', 'ccac'], expected: false },
    { name: 'identical strings', args: ['listen', 'listen'], expected: true },
    { args: ['listen', 'silent'], expected: true },
    { name: 'large anagram', args: [big, bigShuffled], expected: true },
    { name: 'large, one letter off', args: [big, bigOff], expected: false },
  ],
};
