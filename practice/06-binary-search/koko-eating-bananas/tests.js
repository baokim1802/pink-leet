module.exports = {
  fn: 'minEatingSpeed',
  cases: [
    { args: [[3, 6, 7, 11], 8], expected: 4 },
    { name: 'h equals number of piles', args: [[30, 11, 23, 4, 20], 5], expected: 30 },
    { args: [[30, 11, 23, 4, 20], 6], expected: 23 },
    { name: 'single tiny pile', args: [[1], 1], expected: 1 },
    { name: 'lots of spare time', args: [[5, 5, 5], 15], expected: 1 },
    { name: 'equal piles, no spare time', args: [[5, 5, 5], 3], expected: 5 },
    { name: 'huge pile, two hours', args: [[1000000000], 2], expected: 500000000 },
    { name: 'huge pile, one hour short', args: [[312884470], 312884469], expected: 2 },
    { name: 'huge piles and huge h', args: [[1000000000, 1000000000], 1000000000], expected: 2 },
  ],
};
