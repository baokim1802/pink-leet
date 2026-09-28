/**
 * Search a 2D Matrix — binary search over a "virtual" flattened array.
 * Time O(log(m * n)), Space O(1)
 *
 * Reading the rows in order gives one sorted sequence of m * n values, so we
 * binary search indices 0..m*n-1 and translate each flat index i into
 * matrix[Math.floor(i / n)][i % n] on the fly.
 */
function searchMatrix(matrix, target) {
  const m = matrix.length;
  const n = matrix[0].length;
  let lo = 0;
  let hi = m * n - 1;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    const val = matrix[Math.floor(mid / n)][mid % n];
    if (val === target) return true;
    if (val < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return false;
}

module.exports = searchMatrix;
