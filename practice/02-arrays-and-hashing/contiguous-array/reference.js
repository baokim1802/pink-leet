/**
 * Contiguous Array — running balance + first index of each balance.
 * Time O(n), Space O(n)
 *
 * Count 1 as +1 and 0 as -1. A slice is balanced when the running total at
 * its end equals the running total just before its start. Remember where
 * each total first appeared (0 at index -1, before anything); the earliest
 * match gives the longest slice ending here.
 */
function findMaxLength(nums) {
  const firstSeen = new Map([[0, -1]]); // running total -> first index
  let sum = 0;
  let best = 0;
  for (let j = 0; j < nums.length; j++) {
    sum += nums[j] === 1 ? 1 : -1;
    if (firstSeen.has(sum)) best = Math.max(best, j - firstSeen.get(sum));
    else firstSeen.set(sum, j);
  }
  return best;
}

module.exports = findMaxLength;
