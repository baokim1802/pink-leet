/**
 * Longest Increasing Path in a Matrix — memoized DFS on the grid.
 * Time O(m · n), Space O(m · n)
 *
 * best[r][c] = length of the longest strictly increasing path starting at
 * (r, c) = 1 + max over bigger neighbours. Strictly increasing values mean
 * the dependency graph has no cycles, so plain memoized recursion is safe and
 * no visited set is needed. 0 in the memo means "not computed yet" (every
 * real answer is at least 1).
 */
const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];

function longestIncreasingPath(matrix) {
  const m = matrix.length, n = matrix[0].length;
  const best = Array.from({ length: m }, () => new Array(n).fill(0));

  function dfs(r, c) {
    if (best[r][c]) return best[r][c];
    let len = 1;
    for (const [dr, dc] of DIRS) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && matrix[nr][nc] > matrix[r][c]) {
        len = Math.max(len, 1 + dfs(nr, nc));
      }
    }
    return (best[r][c] = len);
  }

  let answer = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) answer = Math.max(answer, dfs(r, c));
  }
  return answer;
}

module.exports = longestIncreasingPath;
