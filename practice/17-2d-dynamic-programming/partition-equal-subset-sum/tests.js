module.exports = {
  fn: 'canPartition',
  cases: [
    { args: [[1, 5, 11, 5]], expected: true },
    { args: [[1, 2, 3, 5]], expected: false },
    { args: [[3, 3, 3, 4, 5]], expected: true },
    { name: 'single element', args: [[1]], expected: false },
    { name: 'two equal elements', args: [[2, 2]], expected: true },
    { name: 'using an item twice would lie', args: [[1, 2, 5]], expected: false },
    { name: 'even total but no split', args: [[2, 2, 3, 5]], expected: false },
    { name: 'one element bigger than half', args: [[1, 1, 1, 7]], expected: false },
    { name: 'many equal values', args: [new Array(200).fill(100)], expected: true },
    { name: 'all even, odd half', args: [[...new Array(199).fill(2), 4]], expected: false },
    { name: 'larger mixed input', args: [Array.from({ length: 200 }, (_, i) => ((i * 37) % 100) + 1)], expected: true },
  ],
};
