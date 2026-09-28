module.exports = {
  fn: 'numDecodings',
  cases: [
    { args: ['12'], expected: 2 },
    { args: ['226'], expected: 3 },
    { args: ['06'], expected: 0 },
    { name: 'single zero', args: ['0'], expected: 0 },
    { name: 'single digit', args: ['7'], expected: 1 },
    { name: 'zero must pair up', args: ['10'], expected: 1 },
    { name: '27 is too big', args: ['27'], expected: 1 },
    { name: 'zero in the middle', args: ['11106'], expected: 2 },
    { name: 'double zero', args: ['100'], expected: 0 },
    { name: 'forty-five 1s', args: ['1'.repeat(45)], expected: 1836311903 },
  ],
};
