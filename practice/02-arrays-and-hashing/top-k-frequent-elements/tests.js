// large case: value v (1..300) appears v times, so the top 3 are 300, 299, 298
const big = [];
for (let v = 1; v <= 300; v++) for (let i = 0; i < v; i++) big.push(v);

module.exports = {
  fn: 'topKFrequent',
  compare: 'unordered',
  cases: [
    { args: [[1, 1, 1, 2, 2, 3], 2], expected: [1, 2] },
    { name: 'single element', args: [[1], 1], expected: [1] },
    { name: 'k equals distinct count', args: [[4, 4, 5, 6, 6, 6], 3], expected: [4, 5, 6] },
    { name: 'negatives', args: [[-1, -1, -2, -2, -2, 3], 2], expected: [-2, -1] },
    { name: 'most frequent appears last', args: [[5, 3, 1, 1, 1, 3, 73, 1], 1], expected: [1] },
    { name: 'unsorted input', args: [[4, 1, -1, 2, -1, 2, 3], 2], expected: [-1, 2] },
    { name: 'zeros', args: [[0, 0, 0, 7, 7, 9], 2], expected: [0, 7] },
    { name: 'large', args: [big, 3], expected: [300, 299, 298] },
  ],
};
