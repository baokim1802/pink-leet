/**
 * Longest Common Subsequence — 2D DP over prefixes, kept to two rows.
 * Time O(m · n), Space O(n)
 *
 * dp[i][j] = LCS of text1[0..i) and text2[0..j).
 *   match:    dp[i][j] = dp[i-1][j-1] + 1
 *   no match: dp[i][j] = max(dp[i-1][j], dp[i][j-1])
 * Row i only reads row i - 1, so we keep `prev` and `cur` rows.
 */
function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;
  let prev = new Array(n + 1).fill(0);
  for (let i = 1; i <= m; i++) {
    const cur = new Array(n + 1).fill(0);
    for (let j = 1; j <= n; j++) {
      cur[j] = text1[i - 1] === text2[j - 1]
        ? prev[j - 1] + 1
        : Math.max(prev[j], cur[j - 1]);
    }
    prev = cur;
  }
  return prev[n];
}

module.exports = longestCommonSubsequence;
