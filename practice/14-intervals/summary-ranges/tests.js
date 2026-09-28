module.exports = {
  fn: 'summaryRanges',
  cases: [
    { args: [[0, 1, 2, 4, 5, 7]], expected: ['0->2', '4->5', '7'] },
    { args: [[0, 2, 3, 4, 6, 8, 9]], expected: ['0', '2->4', '6', '8->9'] },
    { name: 'empty array', args: [[]], expected: [] },
    { name: 'single number', args: [[5]], expected: ['5'] },
    { name: 'negatives', args: [[-3, -2, -1, 1]], expected: ['-3->-1', '1'] },
    { name: 'no neighbors at all', args: [[1, 3, 5]], expected: ['1', '3', '5'] },
    { name: 'one long run', args: [[-1, 0, 1, 2, 3, 4, 5, 6, 7, 8]], expected: ['-1->8'] },
    { name: '32-bit extremes', args: [[-2147483648, 2147483647]], expected: ['-2147483648', '2147483647'] },
    { name: 'run at the top of the range', args: [[0, 2147483646, 2147483647]], expected: ['0', '2147483646->2147483647'] },
  ],
};
