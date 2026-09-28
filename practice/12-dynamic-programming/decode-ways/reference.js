/**
 * Decode Ways — Climbing Stairs with rules about which steps are allowed.
 * Time O(n), Space O(1)
 *
 * dp[i] = ways to decode s[0..i).  dp[0] = 1.
 *   one-digit piece s[i-1]:       allowed if it's not '0'      -> + dp[i-1]
 *   two-digit piece s[i-2..i-1]:  allowed if it's 10..26       -> + dp[i-2]
 * Only the last two dp values are needed.
 */
function numDecodings(s) {
  let prev2 = 1; // dp[i - 2]
  let prev1 = 1; // dp[i - 1]  (dp[0] = 1 to start)
  for (let i = 1; i <= s.length; i++) {
    let cur = 0;
    if (s[i - 1] !== '0') cur += prev1;
    if (i >= 2) {
      const two = Number(s.slice(i - 2, i));
      if (two >= 10 && two <= 26) cur += prev2;
    }
    prev2 = prev1;
    prev1 = cur;
  }
  return prev1;
}

module.exports = numDecodings;
