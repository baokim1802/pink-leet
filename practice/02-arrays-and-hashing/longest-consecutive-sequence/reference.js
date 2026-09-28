/**
 * Longest Consecutive Sequence — hash set, only count up from run starts.
 * Time O(n), Space O(n)
 *
 * Put all values in a Set. A value x starts a run only if x - 1 is absent;
 * from each start, walk x + 1, x + 2, ... while present. Every value is part
 * of exactly one walk, so the total work is linear despite the inner loop.
 */
function longestConsecutive(nums) {
  const set = new Set(nums);
  let best = 0;
  for (const x of set) {
    if (set.has(x - 1)) continue; // not the start of a run
    let len = 1;
    while (set.has(x + len)) len++;
    best = Math.max(best, len);
  }
  return best;
}

module.exports = longestConsecutive;
