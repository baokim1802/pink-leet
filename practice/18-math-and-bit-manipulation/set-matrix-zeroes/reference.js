/**
 * Set Matrix Zeroes — use the first row and first column as marker storage.
 * Time O(m·n), Space O(1)
 *
 * Pass 1: for every zero at (r, c), mark matrix[r][0] = 0 and matrix[0][c] = 0.
 * Column 0's own flag would collide with row 0's at matrix[0][0], so a separate
 * boolean remembers whether column 0 itself had a zero.
 * Pass 2: fill cells from the bottom-right, so the markers in row 0 / column 0
 * are read before they're overwritten.
 */
function setZeroes(matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  let firstColZero = false;

  for (let r = 0; r < m; r++) {
    if (matrix[r][0] === 0) firstColZero = true;
    for (let c = 1; c < n; c++) {
      if (matrix[r][c] === 0) {
        matrix[r][0] = 0;
        matrix[0][c] = 0;
      }
    }
  }

  for (let r = m - 1; r >= 0; r--) {
    for (let c = n - 1; c >= 1; c--) {
      if (matrix[r][0] === 0 || matrix[0][c] === 0) matrix[r][c] = 0;
    }
    if (firstColZero) matrix[r][0] = 0;
  }
}

module.exports = setZeroes;
