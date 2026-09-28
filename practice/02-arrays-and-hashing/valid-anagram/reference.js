/**
 * Valid Anagram — count letters with a fixed-size array.
 * Time O(n), Space O(1) (26 counters)
 *
 * Different lengths can never be anagrams. Otherwise add 1 for every letter
 * of s and subtract 1 for every letter of t; the strings are anagrams exactly
 * when every counter returns to zero.
 */
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const counts = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    counts[s.charCodeAt(i) - 97]++;
    counts[t.charCodeAt(i) - 97]--;
  }
  return counts.every((c) => c === 0);
}

module.exports = isAnagram;
