// large: 5000 small right-movers, then one huge left-mover that wipes them all out
const big = [...new Array(5000).fill(1), -1000];

module.exports = {
  fn: 'asteroidCollision',
  cases: [
    { args: [[5, 10, -5]], expected: [5, 10] },
    { args: [[8, -8]], expected: [] },
    { args: [[10, 2, -5]], expected: [10] },
    { name: 'moving apart', args: [[-2, -1, 1, 2]], expected: [-2, -1, 1, 2] },
    { name: 'left-mover wins everything', args: [[1, 2, 3, -10]], expected: [-10] },
    { name: 'all right-moving', args: [[3, 4, 5]], expected: [3, 4, 5] },
    { name: 'all left-moving', args: [[-3, -4, -5]], expected: [-3, -4, -5] },
    { name: 'chain of equal collisions', args: [[1, -1, 2, -2]], expected: [] },
    { name: 'left-mover survives some, dies later', args: [[6, 2, 3, -4]], expected: [6] },
    { args: [[-2, 2, 1, -2]], expected: [-2] },
    { name: 'large', args: [big], expected: [-1000] },
  ],
};
