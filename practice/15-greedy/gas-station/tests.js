// 5000 stations: every leg loses 1 fuel, except station 3217 which gives a
// big surplus. Only starting there can work.
const N = 5000;
const bigGas = new Array(N).fill(0);
const bigCost = new Array(N).fill(1);
bigGas[3217] = N;

module.exports = {
  fn: 'canCompleteCircuit',
  cases: [
    { args: [[1, 2, 3, 4, 5], [3, 4, 5, 1, 2]], expected: 3 },
    { args: [[2, 3, 4], [3, 4, 3]], expected: -1 },
    { name: 'single station with enough gas', args: [[5], [4]], expected: 0 },
    { name: 'single station without enough gas', args: [[1], [2]], expected: -1 },
    { name: 'start at index 0', args: [[3, 1, 1], [1, 2, 2]], expected: 0 },
    { name: 'start at the last index', args: [[5, 1, 2, 3, 4], [4, 4, 1, 5, 1]], expected: 4 },
    { name: 'total exactly enough', args: [[1, 1, 3], [2, 2, 1]], expected: 2 },
    { name: 'stations with no gas', args: [[0, 0, 4, 0], [1, 1, 1, 1]], expected: 2 },
    { name: 'large circle, answer in the middle', args: [bigGas, bigCost], expected: 3217 },
    { name: 'large circle, one unit short', args: [bigGas, bigCost.map((c, i) => (i === 0 ? 2 : c))], expected: -1 },
  ],
};
