module.exports = {
  cls: 'MinStack',
  cases: [
    {
      ops: ['MinStack', 'push', 'push', 'push', 'getMin', 'pop', 'top', 'getMin'],
      args: [[], [-2], [0], [-3], [], [], [], []],
      expected: [null, null, null, null, -3, null, 0, -2],
    },
    {
      name: 'single element',
      ops: ['MinStack', 'push', 'top', 'getMin'],
      args: [[], [7], [], []],
      expected: [null, null, 7, 7],
    },
    {
      name: 'duplicate minimums',
      ops: ['MinStack', 'push', 'push', 'push', 'getMin', 'pop', 'getMin'],
      args: [[], [0], [1], [0], [], [], []],
      expected: [null, null, null, null, 0, null, 0],
    },
    {
      name: 'pop a duplicate of the min',
      ops: ['MinStack', 'push', 'getMin', 'top', 'push', 'getMin', 'push', 'pop', 'getMin', 'pop', 'getMin'],
      args: [[], [2], [], [], [1], [], [1], [], [], [], []],
      expected: [null, null, 2, 2, null, 1, null, null, 1, null, 2],
    },
    {
      name: 'negatives',
      ops: ['MinStack', 'push', 'push', 'push', 'getMin', 'top', 'pop', 'pop', 'getMin', 'top'],
      args: [[], [-1], [-5], [3], [], [], [], [], [], []],
      expected: [null, null, null, null, -5, 3, null, null, -1, -1],
    },
    {
      name: 'min stays at the bottom',
      ops: ['MinStack', 'push', 'push', 'push', 'getMin', 'pop', 'pop', 'getMin', 'top'],
      args: [[], [1], [5], [4], [], [], [], [], []],
      expected: [null, null, null, null, 1, null, null, 1, 1],
    },
    {
      name: 'extreme 32-bit values',
      ops: ['MinStack', 'push', 'push', 'getMin', 'pop', 'getMin'],
      args: [[], [2147483647], [-2147483648], [], [], []],
      expected: [null, null, null, -2147483648, null, 2147483647],
    },
  ],
};
