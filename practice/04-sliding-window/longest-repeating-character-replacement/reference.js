/**
 * Longest Repeating Character Replacement — variable window, track the top count.
 * Time O(n), Space O(1) (26 counters)
 *
 * A window can be made uniform with (length - count of its most frequent
 * letter) changes. Expand right; while that exceeds k, drop the left char.
 * `maxCount` is never decreased: the window length can only grow past the
 * best answer when a genuinely larger maxCount shows up, so a stale value
 * never yields a too-large result.
 */
function characterReplacement(s, k) {
  const counts = new Array(26).fill(0);
  let left = 0;
  let maxCount = 0;
  let best = 0;
  for (let right = 0; right < s.length; right++) {
    const c = s.charCodeAt(right) - 65;
    counts[c]++;
    maxCount = Math.max(maxCount, counts[c]);
    while (right - left + 1 - maxCount > k) {
      counts[s.charCodeAt(left) - 65]--;
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}

module.exports = characterReplacement;
