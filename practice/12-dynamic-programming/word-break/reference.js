/**
 * Word Break — bottom-up DP over prefixes with a Set of words.
 * Time O(n · L) slices (each O(L)), where L = longest word; Space O(n + dict)
 *
 * dp[i] = can s[0..i) be split into dictionary words?  dp[0] = true.
 * dp[i] is true if for some j, dp[j] is true and s[j..i) is a word.
 * The last word is at most L long, so j only ranges over i-L..i-1.
 */
function wordBreak(s, wordDict) {
  const words = new Set(wordDict);
  const maxLen = Math.max(...wordDict.map((w) => w.length));
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (let j = Math.max(0, i - maxLen); j < i; j++) {
      if (dp[j] && words.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
}

module.exports = wordBreak;
