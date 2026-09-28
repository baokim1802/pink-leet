/**
 * Longest Palindromic Substring — expand around every center.
 * Time O(n²), Space O(1)
 *
 * For each of the 2n - 1 centers (a character, or the gap between two),
 * expand while s[l] === s[r]. When the loop stops, the palindrome is
 * s[l+1..r-1], of length r - l - 1. Keep the widest one and slice once.
 */
function longestPalindrome(s) {
  let start = 0;
  let best = 0;
  const expand = (l, r) => {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      l--;
      r++;
    }
    if (r - l - 1 > best) {
      best = r - l - 1;
      start = l + 1;
    }
  };
  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }
  return s.slice(start, start + best);
}

module.exports = longestPalindrome;
