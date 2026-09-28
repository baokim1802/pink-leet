/**
 * Minimum Window Substring — variable sliding window with a "missing" counter.
 * Time O(m + n), Space O(k) where k = distinct characters in t
 *
 * need[c] = how many more c's the window still needs (can go negative when the
 * window has extras). `missing` = total characters of t not yet covered.
 * Expand right; each time a needed char arrives, missing drops. When
 * missing === 0 the window is valid: record it, then shrink from the left
 * until it becomes invalid again.
 */
function minWindow(s, t) {
  if (t.length > s.length) return '';
  const need = new Map();
  for (const c of t) need.set(c, (need.get(c) || 0) + 1);

  let missing = t.length;
  let left = 0;
  let bestStart = 0;
  let bestLen = Infinity;

  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    if (need.has(c)) {
      if (need.get(c) > 0) missing--;
      need.set(c, need.get(c) - 1);
    }

    while (missing === 0) {
      if (right - left + 1 < bestLen) {
        bestLen = right - left + 1;
        bestStart = left;
      }
      const out = s[left++];
      if (need.has(out)) {
        need.set(out, need.get(out) + 1);
        if (need.get(out) > 0) missing++;
      }
    }
  }

  return bestLen === Infinity ? '' : s.slice(bestStart, bestStart + bestLen);
}

module.exports = minWindow;
