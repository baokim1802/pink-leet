/**
 * Count Number of Nice Subarrays — Subarray Sum Equals K in disguise.
 * Time O(n), Space O(n)
 *
 * Count odd numbers as 1 and even numbers as 0. A slice has exactly k odd
 * numbers when (odds so far) - (odds before the slice) = k, so count how
 * many earlier running counts equal odds - k.
 */
function numberOfSubarrays(nums, k) {
  const seen = new Map([[0, 1]]); // running odd count -> times seen
  let odds = 0;
  let count = 0;
  for (const num of nums) {
    if (num % 2 === 1) odds++;
    count += seen.get(odds - k) || 0;
    seen.set(odds, (seen.get(odds) || 0) + 1);
  }
  return count;
}

module.exports = numberOfSubarrays;
