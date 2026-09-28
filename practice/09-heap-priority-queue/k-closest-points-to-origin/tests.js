// Points (i, 0) for i = 0..999 in a scrambled order; the 10 closest are (0,0)..(9,0).
const scrambled = Array.from({ length: 1000 }, (_, i) => [(i * 7919) % 1000, 0]);
const firstTen = Array.from({ length: 10 }, (_, i) => [i, 0]);

module.exports = {
  fn: 'kClosest',
  compare: 'unordered',
  cases: [
    { args: [[[1, 3], [-2, 2]], 1], expected: [[-2, 2]] },
    { args: [[[3, 3], [5, -1], [-2, 4]], 2], expected: [[3, 3], [-2, 4]] },
    { name: 'single point at origin', args: [[[0, 0]], 1], expected: [[0, 0]] },
    { name: 'k equals n', args: [[[1, 1], [2, 2], [3, 3]], 3], expected: [[1, 1], [2, 2], [3, 3]] },
    { name: 'negative coordinates', args: [[[-5, -5], [1, 0], [0, -2], [-1, -1]], 2], expected: [[1, 0], [-1, -1]] },
    { name: 'tie fully included', args: [[[0, 1], [1, 0]], 2], expected: [[0, 1], [1, 0]] },
    { args: [[[6, 10], [-3, 3], [-2, 5], [0, 2]], 3], expected: [[0, 2], [-3, 3], [-2, 5]] },
    { name: 'large coordinates', args: [[[10000, 10000], [-10000, 0], [0, 9999]], 1], expected: [[0, 9999]] },
    { name: '1000 points', args: [scrambled, 10], expected: firstTen },
  ],
};
