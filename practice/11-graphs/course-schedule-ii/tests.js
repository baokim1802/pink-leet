// 2000 courses in a chain: course i + 1 requires course i
const chain = Array.from({ length: 1999 }, (_, i) => [i + 1, i]);
const chainOrder = Array.from({ length: 2000 }, (_, i) => i);

// Any valid topological order is accepted. `expected` is one valid order
// (or [] when finishing is impossible); we check the answer's properties instead.
function isValidOrder(actual, expected, [numCourses, prerequisites]) {
  if (!Array.isArray(actual)) return false;
  if (expected.length === 0) return actual.length === 0;
  if (actual.length !== numCourses) return false;
  const pos = new Array(numCourses).fill(-1);
  for (let i = 0; i < actual.length; i++) {
    const course = actual[i];
    if (!Number.isInteger(course) || course < 0 || course >= numCourses || pos[course] !== -1) return false;
    pos[course] = i;
  }
  return prerequisites.every(([course, pre]) => pos[pre] < pos[course]);
}

module.exports = {
  fn: 'findOrder',
  compare: isValidOrder,
  cases: [
    { args: [2, [[1, 0]]], expected: [0, 1] },
    { args: [4, [[1, 0], [2, 0], [3, 1], [3, 2]]], expected: [0, 1, 2, 3] },
    { name: 'single course', args: [1, []], expected: [0] },
    { name: 'no prerequisites (any order)', args: [3, []], expected: [0, 1, 2] },
    { name: 'two courses need each other', args: [2, [[1, 0], [0, 1]]], expected: [] },
    { name: 'three-course cycle', args: [3, [[0, 1], [1, 2], [2, 0]]], expected: [] },
    { name: 'cycle in a separate component', args: [4, [[1, 0], [3, 2], [2, 3]]], expected: [] },
    { name: 'order is the reverse of the labels', args: [5, [[0, 1], [1, 2], [2, 3], [3, 4]]], expected: [4, 3, 2, 1, 0] },
    {
      name: 'several independent pieces',
      args: [6, [[5, 4], [3, 1], [1, 0], [2, 0]]],
      expected: [0, 4, 1, 2, 5, 3],
    },
    { name: 'long chain of 2000 courses', args: [2000, chain], expected: chainOrder },
    { name: 'long chain closed into a loop', args: [2000, [...chain, [0, 1999]]], expected: [] },
  ],
};
