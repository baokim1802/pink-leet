/**
 * Interleaving String — two-sequence DP over (chars used from s1, chars used from s2).
 * Time O(m · n), Space O(n)
 *
 * dp[j] (for the current i) = can s1[0..i) and s2[0..j) interleave into
 * s3[0..i+j)? Coming "from above" (dp[j] of the previous row) means the last
 * character came from s1; "from the left" (dp[j - 1], already updated) means
 * it came from s2.
 */
function isInterleave(s1, s2, s3) {
  const m = s1.length, n = s2.length;
  if (m + n !== s3.length) return false;
  const dp = new Array(n + 1).fill(false);
  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0 && j === 0) dp[j] = true;
      else {
        const fromS1 = i > 0 && dp[j] && s1[i - 1] === s3[i + j - 1];
        const fromS2 = j > 0 && dp[j - 1] && s2[j - 1] === s3[i + j - 1];
        dp[j] = fromS1 || fromS2;
      }
    }
  }
  return dp[n];
}

module.exports = isInterleave;
