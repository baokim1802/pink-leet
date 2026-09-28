/**
 * Unique Paths II — grid DP squeezed into one row.
 * Time O(m · n), Space O(n)
 *
 * row[c] = number of paths to cell (r, c) of the current row. Before we
 * update it, row[c] still holds the value from the row above, and row[c - 1]
 * already holds the new value to the left, so row[c] += row[c - 1].
 * An obstacle forces the count to 0. Seeding row[0] = 1 handles the start
 * (and a blocked start zeroes it right away).
 */
function uniquePathsWithObstacles(obstacleGrid) {
  const n = obstacleGrid[0].length;
  const row = new Array(n).fill(0);
  row[0] = 1;
  for (const cells of obstacleGrid) {
    for (let c = 0; c < n; c++) {
      if (cells[c] === 1) row[c] = 0;
      else if (c > 0) row[c] += row[c - 1];
    }
  }
  return row[n - 1];
}

module.exports = uniquePathsWithObstacles;
