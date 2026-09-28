module.exports = {
  fn: 'lastStoneWeight',
  cases: [
    { args: [[2, 7, 4, 1, 8, 1]], expected: 1 },
    { name: 'single stone', args: [[1]], expected: 1 },
    { name: 'two equal stones', args: [[2, 2]], expected: 0 },
    { name: 'two different stones', args: [[10, 4]], expected: 6 },
    { args: [[3, 7, 2]], expected: 2 },
    { name: 'three ones', args: [[1, 1, 1]], expected: 1 },
    { name: 'everything cancels', args: [[9, 3, 2, 10]], expected: 0 },
    { name: 'four equal stones', args: [[5, 5, 5, 5]], expected: 0 },
    { name: '30 max-weight stones', args: [Array(30).fill(1000)], expected: 0 },
    { name: '29 max-weight stones', args: [Array(29).fill(1000)], expected: 1000 },
  ],
};
