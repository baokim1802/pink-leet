/**
 * Longest Substring Without Repeating Characters — variable sliding window.
 * Time O(n), Space O(k) where k = number of distinct characters
 *
 * The window s[left..right] never contains a duplicate. We remember the last
 * index where each character was seen. When s[right] was seen inside the
 * current window, we jump left just past that earlier occurrence.
 * Math.max keeps left from moving backwards (e.g. "abba").
 */
function lengthOfLongestSubstring(s) {
  const lastSeen = new Map(); // char -> last index
  let left = 0;
  let best = 0;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (lastSeen.has(ch)) left = Math.max(left, lastSeen.get(ch) + 1);
    lastSeen.set(ch, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}

module.exports = lengthOfLongestSubstring;
