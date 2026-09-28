module.exports = {
  cls: 'KthLargest',
  cases: [
    {
      ops: ['KthLargest', 'add', 'add', 'add', 'add', 'add'],
      args: [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]],
      expected: [null, 4, 5, 5, 8, 8],
    },
    {
      name: 'duplicates count separately',
      ops: ['KthLargest', 'add', 'add', 'add', 'add'],
      args: [[4, [7, 7, 7, 7, 8, 3]], [2], [10], [9], [9]],
      expected: [null, 7, 7, 7, 8],
    },
    {
      name: 'k = 1, empty start, negatives',
      ops: ['KthLargest', 'add', 'add', 'add', 'add', 'add'],
      args: [[1, []], [-3], [-2], [-4], [0], [4]],
      expected: [null, -3, -2, -2, 0, 4],
    },
    {
      name: 'fewer than k to start',
      ops: ['KthLargest', 'add', 'add', 'add', 'add', 'add'],
      args: [[2, [0]], [-1], [1], [-2], [-4], [3]],
      expected: [null, -1, 0, 0, 0, 1],
    },
    {
      name: 'all equal',
      ops: ['KthLargest', 'add', 'add', 'add'],
      args: [[3, [5, 5, 5]], [5], [1], [6]],
      expected: [null, 5, 5, 5],
    },
    {
      name: 'k-th fills up on first add',
      ops: ['KthLargest', 'add', 'add', 'add'],
      args: [[3, [1, 2]], [3], [0], [4]],
      expected: [null, 1, 1, 2],
    },
  ],
};
