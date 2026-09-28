// JSON.stringify prints -0 as 0, so a "-0" in the answer is treated the same as 0.
const same = (a, e) => Array.isArray(a) && JSON.stringify(a) === JSON.stringify(e);

// large: 20000 ones with a single 2 and a single -3 → easy to compute by hand
const N = 20000;
const big = new Array(N).fill(1);
big[5] = 2;
big[N - 1] = -3;
const bigExpected = new Array(N).fill(-6);
bigExpected[5] = -3;
bigExpected[N - 1] = 2;

module.exports = {
  fn: 'productExceptSelf',
  compare: same,
  cases: [
    { args: [[1, 2, 3, 4]], expected: [24, 12, 8, 6] },
    { args: [[-1, 1, 0, -3, 3]], expected: [0, 0, 9, 0, 0] },
    { name: 'two elements', args: [[3, 5]], expected: [5, 3] },
    { name: 'two zeros', args: [[0, 4, 0, 2]], expected: [0, 0, 0, 0] },
    { name: 'single zero', args: [[2, 0, 5]], expected: [0, 10, 0] },
    { name: 'negatives', args: [[-2, -3, 4]], expected: [-12, -8, 6] },
    { name: 'duplicates', args: [[2, 2, 2, 2]], expected: [8, 8, 8, 8] },
    { args: [[5, 1, 4, 2]], expected: [8, 40, 10, 20] },
    { name: 'large', args: [big], expected: bigExpected },
  ],
};
