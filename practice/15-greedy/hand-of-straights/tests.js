// 0..9999 in a scrambled (but deterministic) order: 2500 runs of 4
const shuffled = Array.from({ length: 10000 }, (_, i) => (i * 7919) % 10000);
// same cards, but 5001 swapped for 20000: the run 5000..5003 breaks
const broken = [...shuffled];
broken[broken.indexOf(5001)] = 20000;

module.exports = {
  fn: 'isNStraightHand',
  cases: [
    { args: [[1, 2, 3, 6, 2, 3, 4, 7, 8], 3], expected: true },
    { args: [[1, 2, 3, 4, 5], 4], expected: false },
    { name: 'groupSize 1 always works', args: [[5, 3, 9], 1], expected: true },
    { name: 'duplicates in parallel runs', args: [[1, 1, 2, 2, 3, 3], 3], expected: true },
    { name: 'runs that share a value', args: [[1, 2, 3, 3, 4, 5], 3], expected: true },
    { name: 'missing middle card', args: [[1, 2, 4, 5, 6, 7], 3], expected: false },
    { name: 'no consecutive cards', args: [[8, 10, 12], 3], expected: false },
    { name: 'extra duplicate of the smallest', args: [[1, 1, 2, 3, 4, 5], 3], expected: false },
    { name: 'unsorted pair', args: [[2, 1], 2], expected: true },
    { name: 'single card', args: [[0], 1], expected: true },
    { name: '10000 scrambled cards', args: [shuffled, 4], expected: true },
    { name: '10000 cards with one gap', args: [broken, 4], expected: false },
  ],
};
