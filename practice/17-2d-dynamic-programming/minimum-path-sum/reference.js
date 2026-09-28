/**
 * Minimum Path Sum — grid DP with one rolling row.
 * Time O(m · n), Space O(n)
 *
 * row[c] = cheapest cost to reach cell (r, c). Before the update row[c] is the
 * cell above and row[c - 1] is the (already updated) cell to the left.
 * Starting with Infinity everywhere except a virtual 0 feeding the first cell
 * means the top row and left column need no special handling.
 */
function minPathSum(grid) {
  const n = grid[0].length;
  const row = new Array(n).fill(Infinity);
  row[0] = 0;
  for (const cells of grid) {
    for (let c = 0; c < n; c++) {
      const left = c > 0 ? row[c - 1] : Infinity;
      row[c] = cells[c] + Math.min(row[c], left);
    }
  }
  return row[n - 1];
}

module.exports = minPathSum;
