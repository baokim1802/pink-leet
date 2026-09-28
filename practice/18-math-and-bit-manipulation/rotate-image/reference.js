/**
 * Rotate Image — transpose, then reverse every row.
 * Time O(n²), Space O(1)
 *
 * Clockwise rotation sends (r, c) to (c, n - 1 - r).
 * Transposing sends (r, c) to (c, r); reversing each row then sends
 * (c, r) to (c, n - 1 - r). Both steps are simple in-place swaps.
 */
function rotate(matrix) {
  const n = matrix.length;
  for (let r = 0; r < n; r++) {
    for (let c = r + 1; c < n; c++) {
      [matrix[r][c], matrix[c][r]] = [matrix[c][r], matrix[r][c]];
    }
  }
  for (const row of matrix) row.reverse();
}

module.exports = rotate;
