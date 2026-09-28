module.exports = {
  fn: 'change',
  cases: [
    { args: [5, [1, 2, 5]], expected: 4 },
    { args: [3, [2]], expected: 0 },
    { args: [10, [10]], expected: 1 },
    { name: 'amount zero has one way (take nothing)', args: [0, [7]], expected: 1 },
    { name: 'order must not matter', args: [4, [1, 2, 3]], expected: 4 },
    { name: 'coins larger than amount', args: [3, [5, 10]], expected: 0 },
    { name: 'unsorted coins', args: [11, [10, 1, 5]], expected: 4 },
    { name: 'impossible with only even coins', args: [7, [2, 4]], expected: 0 },
    { name: 'larger amount', args: [500, [1, 2, 5]], expected: 12701 },
    { name: 'many combinations', args: [500, [3, 5, 7, 8, 9, 10, 11]], expected: 35502874 },
  ],
};
