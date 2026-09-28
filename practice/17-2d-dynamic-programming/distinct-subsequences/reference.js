/**
 * Distinct Subsequences — two-sequence counting DP in one row.
 * Time O(m · n), Space O(n)
 *
 * ways[j] = number of ways to form t[0..j) from the part of s seen so far.
 * ways[0] = 1 (the empty prefix of t can always be formed one way).
 * For each character ch of s, every j with t[j-1] === ch gains
 * ways[j - 1] (use ch as the j-th character). Looping j downwards keeps
 * ways[j - 1] at its "before ch" value, so ch is used at most once.
 */
function numDistinct(s, t) {
  const n = t.length;
  if (n > s.length) return 0;
  const ways = new Array(n + 1).fill(0);
  ways[0] = 1;
  for (const ch of s) {
    for (let j = n; j >= 1; j--) {
      if (t[j - 1] === ch) ways[j] += ways[j - 1];
    }
  }
  return ways[n];
}

module.exports = numDistinct;
