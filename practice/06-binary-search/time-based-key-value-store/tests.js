// Larger case: key "k" set at times 2, 4, ..., 10000 with value "v<time>",
// then get at every odd time 1, 3, ..., 10001. get(k, t) is the value set at t - 1
// (or "" when t = 1, before the first set).
const bigOps = ['TimeMap'];
const bigArgs = [[]];
const bigExpected = [null];
for (let t = 2; t <= 10000; t += 2) {
  bigOps.push('set');
  bigArgs.push(['k', 'v' + t, t]);
  bigExpected.push(null);
}
for (let t = 1; t <= 10001; t += 2) {
  bigOps.push('get');
  bigArgs.push(['k', t]);
  bigExpected.push(t === 1 ? '' : 'v' + (t - 1));
}

module.exports = {
  cls: 'TimeMap',
  cases: [
    {
      ops: ['TimeMap', 'set', 'get', 'get', 'set', 'get', 'get'],
      args: [[], ['foo', 'bar', 1], ['foo', 1], ['foo', 3], ['foo', 'bar2', 4], ['foo', 4], ['foo', 5]],
      expected: [null, null, 'bar', 'bar', null, 'bar2', 'bar2'],
    },
    {
      ops: ['TimeMap', 'set', 'set', 'get', 'get', 'get', 'get', 'get'],
      args: [[], ['love', 'high', 10], ['love', 'low', 20], ['love', 5], ['love', 10], ['love', 15], ['love', 20], ['love', 25]],
      expected: [null, null, null, '', 'high', 'high', 'low', 'low'],
    },
    {
      name: 'unknown key',
      ops: ['TimeMap', 'get', 'set', 'get'],
      args: [[], ['a', 1], ['b', 'x', 2], ['a', 5]],
      expected: [null, '', null, ''],
    },
    {
      name: 'several keys interleaved',
      ops: ['TimeMap', 'set', 'set', 'set', 'set', 'get', 'get', 'get', 'get', 'get'],
      args: [[], ['a', 'a1', 1], ['b', 'b1', 2], ['a', 'a2', 3], ['b', 'b2', 4], ['a', 2], ['b', 2], ['a', 4], ['b', 3], ['b', 1]],
      expected: [null, null, null, null, null, 'a1', 'b1', 'a2', 'b1', ''],
    },
    {
      name: 'same value stored twice',
      ops: ['TimeMap', 'set', 'set', 'set', 'get', 'get'],
      args: [[], ['x', 'same', 5], ['x', 'other', 6], ['x', 'same', 7], ['x', 6], ['x', 100]],
      expected: [null, null, null, null, 'other', 'same'],
    },
    {
      name: 'query far in the future',
      ops: ['TimeMap', 'set', 'get'],
      args: [[], ['key', 'val', 1], ['key', 10000000]],
      expected: [null, null, 'val'],
    },
    { name: '5000 sets then 5001 gets', ops: bigOps, args: bigArgs, expected: bigExpected },
  ],
};
