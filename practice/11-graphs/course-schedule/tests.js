// 2000 courses in a chain: course i + 1 requires course i
const chain = Array.from({ length: 1999 }, (_, i) => [i + 1, i]);

module.exports = {
  fn: 'canFinish',
  cases: [
    { args: [2, [[1, 0]]], expected: true },
    { args: [2, [[1, 0], [0, 1]]], expected: false },
    { name: 'no prerequisites', args: [5, []], expected: true },
    { name: 'single course', args: [1, []], expected: true },
    { name: 'three-course cycle', args: [3, [[0, 1], [1, 2], [2, 0]]], expected: false },
    {
      name: 'diamond (shared prerequisite is not a cycle)',
      args: [4, [[1, 0], [2, 0], [3, 1], [3, 2]]],
      expected: true,
    },
    { name: 'cycle in a separate component', args: [4, [[1, 0], [3, 2], [2, 3]]], expected: false },
    {
      name: 'cycle reachable only later',
      args: [5, [[1, 0], [2, 1], [3, 2], [4, 3], [2, 4]]],
      expected: false,
    },
    { name: 'long chain of 2000 courses', args: [2000, chain], expected: true },
    { name: 'long chain closed into a loop', args: [2000, [...chain, [0, 1999]]], expected: false },
  ],
};
