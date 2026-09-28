/**
 * Palindromic Substrings — expand around every center.
 * Time O(n²), Space O(1)
 *
 * Every palindrome has a center: a single character (odd length) or the gap
 * between two characters (even length). From each of the 2n - 1 centers,
 * grow outward while both ends match; each step is one more palindrome.
 * (This is the space-optimized version of the isPal[i][j] DP table.)
 */
function countSubstrings(s) {
  const n = s.length;
  let count = 0;
  const expand = (l, r) => {
    while (l >= 0 && r < n && s[l] === s[r]) {
      count++;
      l--;
      r++;
    }
  };
  for (let i = 0; i < n; i++) {
    expand(i, i);     // odd length, centered on s[i]
    expand(i, i + 1); // even length, centered between s[i] and s[i+1]
  }
  return count;
}

module.exports = countSubstrings;
