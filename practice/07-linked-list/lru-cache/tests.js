// Larger case: capacity 3000, put keys 0..4999 (value = 2 * key), then get every key.
// Only the last 3000 inserted (2000..4999) survive; gets go in increasing key order,
// so each get refreshes a key that is never evicted afterwards.
const bigOps = ['LRUCache'];
const bigArgs = [[3000]];
const bigExpected = [null];
for (let k = 0; k < 5000; k++) {
  bigOps.push('put');
  bigArgs.push([k, 2 * k]);
  bigExpected.push(null);
}
for (let k = 0; k < 5000; k++) {
  bigOps.push('get');
  bigArgs.push([k]);
  bigExpected.push(k < 2000 ? -1 : 2 * k);
}

module.exports = {
  cls: 'LRUCache',
  cases: [
    {
      ops: ['LRUCache', 'put', 'put', 'get', 'put', 'get', 'put', 'get', 'get', 'get'],
      args: [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]],
      expected: [null, null, null, 1, null, -1, null, -1, 3, 4],
    },
    {
      name: 'capacity 1',
      ops: ['LRUCache', 'put', 'get', 'put', 'get', 'get'],
      args: [[1], [2, 1], [2], [3, 2], [2], [3]],
      expected: [null, null, 1, null, -1, 2],
    },
    {
      name: 'updating a key counts as a use',
      ops: ['LRUCache', 'put', 'put', 'put', 'put', 'get', 'get'],
      args: [[2], [2, 1], [1, 1], [2, 3], [4, 1], [1], [2]],
      expected: [null, null, null, null, null, -1, 3],
    },
    {
      name: 'get counts as a use',
      ops: ['LRUCache', 'put', 'put', 'get', 'put', 'get', 'get', 'get'],
      args: [[2], [1, 1], [2, 2], [1], [3, 3], [1], [2], [3]],
      expected: [null, null, null, 1, null, 1, -1, 3],
    },
    {
      name: 'get on an empty cache',
      ops: ['LRUCache', 'get'],
      args: [[1], [5]],
      expected: [null, -1],
    },
    {
      name: 'value 0 is a real value',
      ops: ['LRUCache', 'put', 'get', 'put', 'get'],
      args: [[1], [1, 0], [1], [0, 7], [0]],
      expected: [null, null, 0, null, 7],
    },
    {
      name: 'updating does not grow the cache',
      ops: ['LRUCache', 'put', 'put', 'put', 'put', 'get', 'get'],
      args: [[2], [1, 1], [1, 10], [1, 100], [2, 2], [1], [2]],
      expected: [null, null, null, null, null, 100, 2],
    },
    { name: '5000 puts, then 5000 gets', ops: bigOps, args: bigArgs, expected: bigExpected },
  ],
};
