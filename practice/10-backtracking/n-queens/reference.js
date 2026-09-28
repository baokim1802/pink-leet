/**
 * N-Queens — place one queen per row, tracking attacked columns/diagonals.
 * Time O(n!) (at most n choices in row 0, n-1 in row 1, ... after pruning),
 * Space O(n) for the sets, the queen positions and the recursion.
 *
 * Squares on one diagonal share r - c; squares on one anti-diagonal share
 * r + c. Three Sets tell us in O(1) whether (r, c) is attacked. We only turn
 * the column positions into strings once a full board has been placed.
 */
function solveNQueens(n) {
  const res = [];
  const queenCol = []; // queenCol[r] = column of the queen in row r
  const cols = new Set();
  const diags = new Set();     // r - c
  const antiDiags = new Set(); // r + c

  function dfs(r) {
    if (r === n) {
      res.push(queenCol.map((c) => '.'.repeat(c) + 'Q' + '.'.repeat(n - c - 1)));
      return;
    }
    for (let c = 0; c < n; c++) {
      if (cols.has(c) || diags.has(r - c) || antiDiags.has(r + c)) continue; // attacked
      cols.add(c); diags.add(r - c); antiDiags.add(r + c); queenCol.push(c); // choose
      dfs(r + 1);                                                             // explore
      cols.delete(c); diags.delete(r - c); antiDiags.delete(r + c); queenCol.pop(); // unchoose
    }
  }

  dfs(0);
  return res;
}

module.exports = solveNQueens;
