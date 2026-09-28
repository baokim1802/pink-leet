// Turn a list of queen columns (one per row) into LeetCode's board format,
// e.g. [1, 3, 0, 2] -> [".Q..", "...Q", "Q...", "..Q."]
const board = (cols) => cols.map((c) => '.'.repeat(c) + 'Q' + '.'.repeat(cols.length - c - 1));

// Brute force for the larger case: try every permutation of columns (so rows
// and columns are automatically distinct) and keep those with no shared diagonal.
const bruteForce = (n) => {
  const out = [];
  const perm = (cols, left) => {
    if (!left.length) {
      const ok = cols.every((c, r) => cols.every((c2, r2) => r === r2 || Math.abs(c - c2) !== Math.abs(r - r2)));
      if (ok) out.push(board(cols));
      return;
    }
    left.forEach((x, i) => perm([...cols, x], [...left.slice(0, i), ...left.slice(i + 1)]));
  };
  perm([], [...Array(n).keys()]);
  return out;
};

// Boards can come back in any order, but the rows INSIDE a board must stay
// top to bottom. So we sort only the outer list (by JSON).
const byJson = (arr) => arr.map((b) => JSON.stringify(b)).sort();

module.exports = {
  fn: 'solveNQueens',
  compare: (actual, expected) =>
    Array.isArray(actual) &&
    actual.length === expected.length &&
    JSON.stringify(byJson(actual)) === JSON.stringify(byJson(expected)),
  cases: [
    { args: [4], expected: [['.Q..', '...Q', 'Q...', '..Q.'], ['..Q.', 'Q...', '...Q', '.Q..']] },
    { name: 'one square', args: [1], expected: [['Q']] },
    { name: 'no solution (n = 2)', args: [2], expected: [] },
    { name: 'no solution (n = 3)', args: [3], expected: [] },
    {
      name: 'n = 5 (10 boards)',
      args: [5],
      expected: [
        [0, 2, 4, 1, 3], [0, 3, 1, 4, 2], [1, 3, 0, 2, 4], [1, 4, 2, 0, 3], [2, 0, 3, 1, 4],
        [2, 4, 1, 3, 0], [3, 0, 2, 4, 1], [3, 1, 4, 2, 0], [4, 1, 3, 0, 2], [4, 2, 0, 3, 1],
      ].map(board),
    },
    {
      name: 'n = 6 (only 4 boards)',
      args: [6],
      expected: [[1, 3, 5, 0, 2, 4], [2, 5, 1, 4, 0, 3], [3, 0, 4, 1, 5, 2], [4, 2, 0, 5, 3, 1]].map(board),
    },
    { name: 'larger: n = 8 (92 boards)', args: [8], expected: bruteForce(8) },
  ],
};
