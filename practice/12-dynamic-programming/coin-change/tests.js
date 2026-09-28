module.exports = {
  fn: 'coinChange',
  cases: [
    { args: [[1, 2, 5], 11], expected: 3 },
    { args: [[2], 3], expected: -1 },
    { name: 'amount zero', args: [[1], 0], expected: 0 },
    { name: 'greedy trap', args: [[1, 3, 4], 6], expected: 2 },
    { name: 'unsorted coins', args: [[2, 5, 10, 1], 27], expected: 4 },
    { name: 'all coins too big', args: [[3, 7], 1], expected: -1 },
    { name: 'coin larger than amount is ignored', args: [[2147483647, 2], 4], expected: 2 },
    { name: 'awkward denominations', args: [[186, 419, 83, 408], 6249], expected: 20 },
    { name: 'large amount with 1-coin', args: [[1], 10000], expected: 10000 },
  ],
};
