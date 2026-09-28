// Path 1-2-...-1000 with the extra edge [1, 500] slipped in after edge 499-500
const path = Array.from({ length: 999 }, (_, i) => [i + 1, i + 2]);
const longCycle = [...path.slice(0, 499), [1, 500], ...path.slice(499)];

module.exports = {
  fn: 'findRedundantConnection',
  cases: [
    { args: [[[1, 2], [1, 3], [2, 3]]], expected: [2, 3] },
    { args: [[[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]]], expected: [1, 4] },
    { name: 'cycle edge is not the last input edge', args: [[[1, 4], [3, 4], [1, 3], [1, 2], [4, 5]]], expected: [1, 3] },
    { name: 'cycle through a separate branch', args: [[[3, 4], [1, 2], [2, 4], [3, 5], [2, 5]]], expected: [2, 5] },
    { name: 'four-node cycle', args: [[[2, 3], [2, 5], [1, 5], [2, 4], [1, 4]]], expected: [1, 4] },
    { name: 'cycle closes at the very first opportunity', args: [[[1, 2], [2, 3], [1, 3], [3, 4], [4, 5]]], expected: [1, 3] },
    { name: 'star plus one extra edge', args: [[[1, 2], [1, 3], [1, 4], [1, 5], [4, 5]]], expected: [4, 5] },
    { name: 'long path closed into a big loop', args: [[...path, [1, 1000]]], expected: [1, 1000] },
    { name: 'long path with a mid-way cycle', args: [longCycle], expected: [1, 500] },
  ],
};
