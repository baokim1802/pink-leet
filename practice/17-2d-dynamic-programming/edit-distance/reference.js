/**
 * Edit Distance — classic two-sequence DP, one row plus a saved diagonal.
 * Time O(m · n), Space O(n)
 *
 * dp[i][j] = edits to turn word1[0..i) into word2[0..j).
 *   match:   dp[i-1][j-1]
 *   else:    1 + min(dp[i-1][j] (delete), dp[i][j-1] (insert), dp[i-1][j-1] (replace))
 * In the single row, row[j] is "above", row[j - 1] is "left", and `diag`
 * holds the old row[j - 1] from the previous row.
 */
function minDistance(word1, word2) {
  const m = word1.length, n = word2.length;
  const row = Array.from({ length: n + 1 }, (_, j) => j); // dp[0][j] = j
  for (let i = 1; i <= m; i++) {
    let diag = row[0]; // dp[i-1][0]
    row[0] = i;        // dp[i][0]
    for (let j = 1; j <= n; j++) {
      const above = row[j];
      row[j] = word1[i - 1] === word2[j - 1]
        ? diag
        : 1 + Math.min(above, row[j - 1], diag);
      diag = above;
    }
  }
  return row[n];
}

module.exports = minDistance;
