// 5000 ones, a huge dip, then 4999 ones: the dip is too deep to cross
const deepDip = [...new Array(5000).fill(1), -10000, ...new Array(4999).fill(1)];
// 10000 values alternating 3, -1: crossing every dip pays off
const zigzag = Array.from({ length: 10000 }, (_, i) => (i % 2 === 0 ? 3 : -1));

module.exports = {
  fn: 'maxSubArray',
  cases: [
    { args: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
    { args: [[1]], expected: 1 },
    { args: [[5, 4, -1, 7, 8]], expected: 23 },
    { name: 'all negative picks the largest single element', args: [[-3, -1, -2]], expected: -1 },
    { name: 'single negative', args: [[-5]], expected: -5 },
    { name: 'zero beats negatives', args: [[-1, 0, -2]], expected: 0 },
    { name: 'worth crossing a small dip', args: [[2, -1, 2]], expected: 3 },
    { name: 'not worth crossing a big dip', args: [[3, -5, 4]], expected: 4 },
    { name: 'deep dip in a long array', args: [deepDip], expected: 5000 },
    { name: 'long zigzag', args: [zigzag], expected: 10001 },
  ],
};
