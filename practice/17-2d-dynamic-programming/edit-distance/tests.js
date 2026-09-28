module.exports = {
  fn: 'minDistance',
  cases: [
    { args: ['horse', 'ros'], expected: 3 },
    { args: ['intention', 'execution'], expected: 5 },
    { name: 'both empty', args: ['', ''], expected: 0 },
    { name: 'insert everything', args: ['', 'abc'], expected: 3 },
    { name: 'delete everything', args: ['abc', ''], expected: 3 },
    { name: 'identical', args: ['same', 'same'], expected: 0 },
    { name: 'single replace', args: ['a', 'b'], expected: 1 },
    { args: ['kitten', 'sitting'], expected: 3 },
    { args: ['sunday', 'saturday'], expected: 3 },
    { name: 'long rotation (delete front, add back)', args: ['abcdefghij'.repeat(50), 'bcdefghija'.repeat(50)], expected: 2 },
    { name: 'long, nothing in common', args: ['a'.repeat(500), 'b'.repeat(500)], expected: 500 },
  ],
};
