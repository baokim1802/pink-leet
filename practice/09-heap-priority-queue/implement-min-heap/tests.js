// Build an op list: push every value, then pop them all.
function pushAllThenPopAll(values) {
  const sorted = [...values].sort((a, b) => a - b);
  return {
    ops: ['MinHeap', ...values.map(() => 'push'), ...values.map(() => 'pop'), 'size'],
    args: [[], ...values.map((v) => [v]), ...values.map(() => []), []],
    expected: [null, ...values.map(() => null), ...sorted, 0],
  };
}

// 0..999 in a scrambled order (7919 is coprime with 1000, so every value appears once)
const scrambled = Array.from({ length: 1000 }, (_, i) => (i * 7919) % 1000);

module.exports = {
  cls: 'MinHeap',
  cases: [
    {
      ops: ['MinHeap', 'push', 'push', 'push', 'peek', 'pop', 'pop', 'size'],
      args: [[], [5], [3], [8], [], [], [], []],
      expected: [null, null, null, null, 3, 3, 5, 1],
    },
    {
      name: 'empty heap',
      ops: ['MinHeap', 'pop', 'peek', 'size'],
      args: [[], [], [], []],
      expected: [null, null, null, 0],
    },
    {
      name: 'single element',
      ops: ['MinHeap', 'push', 'peek', 'size', 'pop', 'pop', 'size'],
      args: [[], [42], [], [], [], [], []],
      expected: [null, null, 42, 1, 42, null, 0],
    },
    {
      name: 'duplicates',
      ops: ['MinHeap', 'push', 'push', 'push', 'push', 'pop', 'pop', 'pop', 'pop', 'pop', 'size'],
      args: [[], [2], [2], [1], [1], [], [], [], [], [], []],
      expected: [null, null, null, null, null, 1, 1, 2, 2, null, 0],
    },
    {
      name: 'negatives',
      ops: ['MinHeap', 'push', 'push', 'push', 'push', 'push', 'pop', 'pop', 'pop', 'pop', 'pop'],
      args: [[], [-1], [-5], [0], [3], [-2], [], [], [], [], []],
      expected: [null, null, null, null, null, null, -5, -2, -1, 0, 3],
    },
    {
      name: 'interleaved push and pop',
      ops: ['MinHeap', 'push', 'push', 'pop', 'push', 'push', 'peek', 'pop', 'pop', 'push', 'size', 'pop', 'pop', 'size'],
      args: [[], [10], [4], [], [7], [1], [], [], [], [3], [], [], [], []],
      expected: [null, null, null, 4, null, null, 1, 1, 7, null, 2, 3, 10, 0],
    },
    { name: 'heap sort 10 values', ...pushAllThenPopAll([9, 1, 8, 2, 7, 3, 6, 4, 5, 0]) },
    { name: '1000 scrambled values', ...pushAllThenPopAll(scrambled) },
  ],
};
