module.exports = {
  fn: 'partitionLabels',
  cases: [
    { args: ['ababcbacadefegdehijhklij'], expected: [9, 7, 8] },
    { args: ['eccbbbbdec'], expected: [10] },
    { name: 'single character', args: ['a'], expected: [1] },
    { name: 'all distinct letters', args: ['abc'], expected: [1, 1, 1] },
    { name: 'one repeated letter', args: ['aaaa'], expected: [4] },
    { name: 'short tail piece', args: ['abac'], expected: [3, 1] },
    { name: 'first letter reappears at the end', args: ['abca'], expected: [4] },
    { name: 'short first piece', args: ['caedbdedda'], expected: [1, 9] },
    { name: 'nested ranges', args: ['abcbadd'], expected: [5, 2] },
    { name: '500 characters in blocks', args: ['a'.repeat(200) + 'b'.repeat(100) + 'c'.repeat(200)], expected: [200, 100, 200] },
  ],
};
