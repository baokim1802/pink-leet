module.exports = {
  fn: 'hammingWeight',
  cases: [
    { args: [11], expected: 3 },
    { args: [128], expected: 1 },
    { args: [2147483645], expected: 30 },
    { name: 'smallest input', args: [1], expected: 1 },
    { name: 'largest input (all 31 bits)', args: [2147483647], expected: 31 },
    { name: 'only the top bit', args: [1073741824], expected: 1 },
    { name: 'eight ones', args: [255], expected: 8 },
    { name: 'alternating bits', args: [682], expected: 5 },
    { args: [1000000], expected: 7 },
  ],
};
