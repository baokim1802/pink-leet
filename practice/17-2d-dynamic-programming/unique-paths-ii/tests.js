const open = (m, n) => Array.from({ length: m }, () => new Array(n).fill(0));

const bigOpen = open(17, 17);
const bigWithWall = open(10, 10);
bigWithWall[5][5] = 1;

module.exports = {
  fn: 'uniquePathsWithObstacles',
  cases: [
    { args: [[[0, 0, 0], [0, 1, 0], [0, 0, 0]]], expected: 2 },
    { args: [[[0, 1], [0, 0]]], expected: 1 },
    { name: 'single open cell', args: [[[0]]], expected: 1 },
    { name: 'single blocked cell', args: [[[1]]], expected: 0 },
    { name: 'start blocked', args: [[[1, 0], [0, 0]]], expected: 0 },
    { name: 'finish blocked', args: [[[0, 0], [0, 1]]], expected: 0 },
    { name: 'obstacle in first row blocks the rest of it', args: [[[0, 1, 0], [0, 0, 0]]], expected: 1 },
    { name: 'single row with obstacle', args: [[[0, 0, 1, 0]]], expected: 0 },
    { name: 'wall cuts the grid', args: [[[0, 0], [1, 1], [0, 0]]], expected: 0 },
    { name: 'single column', args: [[[0], [0], [0], [0]]], expected: 1 },
    { name: '17x17 open grid', args: [bigOpen], expected: 601080390 },
    { name: '10x10 with one obstacle in the middle', args: [bigWithWall], expected: 30980 },
  ],
};
