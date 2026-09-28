// 1000 children with greed 1..1000, 500 cookies all of size 1000
const manyChildren = Array.from({ length: 1000 }, (_, i) => i + 1);
const bigCookies = new Array(500).fill(1000);

module.exports = {
  fn: 'findContentChildren',
  cases: [
    { args: [[1, 2, 3], [1, 1]], expected: 1 },
    { args: [[1, 2], [1, 2, 3]], expected: 2 },
    { name: 'no cookies at all', args: [[1, 2], []], expected: 0 },
    { name: 'every cookie is too small', args: [[5, 6], [1, 2, 3]], expected: 0 },
    { name: 'unsorted inputs', args: [[10, 9, 8, 7], [5, 6, 7, 8]], expected: 2 },
    { name: 'duplicate greed factors', args: [[1, 1, 1], [1, 1]], expected: 2 },
    { name: 'one huge cookie feeds only one child', args: [[1, 1, 1], [100]], expected: 1 },
    { name: 'small cookie must not be wasted', args: [[1, 3], [3, 1]], expected: 2 },
    { name: 'single child, single cookie', args: [[2], [2]], expected: 1 },
    { name: '1000 children, 500 big cookies', args: [manyChildren, bigCookies], expected: 500 },
  ],
};
