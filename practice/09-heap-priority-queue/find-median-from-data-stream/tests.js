// Numbers are compared with a small tolerance; null (constructor / addNum) must be null.
const close = (actual, expected) =>
  Array.isArray(actual) &&
  actual.length === expected.length &&
  expected.every((e, i) =>
    e === null ? actual[i] === null : typeof actual[i] === 'number' && Math.abs(actual[i] - e) < 1e-5,
  );

/** Build an op list from a sequence of numbers, asking for the median after each `every` adds. */
function stream(nums, every) {
  const ops = ['MedianFinder'];
  const args = [[]];
  const expected = [null];
  const seen = [];
  nums.forEach((x, i) => {
    ops.push('addNum');
    args.push([x]);
    expected.push(null);
    seen.push(x);
    if ((i + 1) % every === 0) {
      // Independent brute force: sort everything seen so far and take the middle.
      const s = [...seen].sort((a, b) => a - b);
      const m = s.length >> 1;
      ops.push('findMedian');
      args.push([]);
      expected.push(s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2);
    }
  });
  return { ops, args, expected };
}

// 1..20000 in a scrambled order (7919 is prime, so i * 7919 mod 20000 is a permutation)
const scrambled = Array.from({ length: 20000 }, (_, i) => ((i * 7919) % 20000) + 1);

module.exports = {
  cls: 'MedianFinder',
  compare: close,
  cases: [
    {
      ops: ['MedianFinder', 'addNum', 'addNum', 'findMedian', 'addNum', 'findMedian'],
      args: [[], [1], [2], [], [3], []],
      expected: [null, null, null, 1.5, null, 2],
    },
    {
      name: 'single number',
      ops: ['MedianFinder', 'addNum', 'findMedian'],
      args: [[], [-7], []],
      expected: [null, null, -7],
    },
    {
      name: 'descending input',
      ops: ['MedianFinder', 'addNum', 'findMedian', 'addNum', 'findMedian', 'addNum', 'findMedian', 'addNum', 'findMedian'],
      args: [[], [5], [], [4], [], [3], [], [2], []],
      expected: [null, null, 5, null, 4.5, null, 4, null, 3.5],
    },
    {
      name: 'negatives and zero',
      ops: ['MedianFinder', 'addNum', 'addNum', 'findMedian', 'addNum', 'findMedian', 'addNum', 'findMedian'],
      args: [[], [-1], [-2], [], [0], [], [-100000], []],
      expected: [null, null, null, -1.5, null, -1, null, -1.5],
    },
    {
      name: 'duplicates',
      ops: ['MedianFinder', 'addNum', 'addNum', 'addNum', 'findMedian', 'addNum', 'findMedian'],
      args: [[], [2], [2], [2], [], [9], []],
      expected: [null, null, null, null, 2, null, 2],
    },
    {
      name: 'zig-zag values',
      ops: ['MedianFinder', 'addNum', 'addNum', 'addNum', 'addNum', 'addNum', 'findMedian', 'addNum', 'findMedian'],
      args: [[], [10], [-10], [20], [-20], [0], [], [100000], []],
      expected: [null, null, null, null, null, null, 0, null, 5],
    },
    { name: '20k scrambled numbers, median every 1000', ...stream(scrambled, 1000) },
  ],
};
