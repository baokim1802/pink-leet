/**
 * Permutation in String — fixed-size window with a "matching letters" counter.
 * Time O(n + m), Space O(1) (26 counters)
 *
 * need[c] = count of c in s1 minus count of c in the current window.
 * `mismatched` is how many letters have need[c] !== 0. Sliding the window
 * changes two counters, and we update `mismatched` accordingly. The window is
 * a permutation of s1 exactly when mismatched === 0.
 */
function checkInclusion(s1, s2) {
  const m = s1.length;
  if (m > s2.length) return false;
  const need = new Array(26).fill(0);
  for (let i = 0; i < m; i++) need[s1.charCodeAt(i) - 97]++;
  let mismatched = need.filter((x) => x !== 0).length;

  const change = (code, delta) => {
    const i = code - 97;
    if (need[i] === 0) mismatched++;
    need[i] += delta;
    if (need[i] === 0) mismatched--;
  };

  for (let r = 0; r < s2.length; r++) {
    change(s2.charCodeAt(r), -1); // character enters the window
    if (r >= m) change(s2.charCodeAt(r - m), +1); // character leaves the window
    if (r >= m - 1 && mismatched === 0) return true;
  }
  return false;
}

module.exports = checkInclusion;
