/**
 * Continuous Subarray Sum — first index of each remainder.
 * Time O(n), Space O(min(n, k))
 *
 * A slice's sum is a multiple of k when the running totals at its end and
 * just before its start share a remainder. Keep the earliest index of each
 * remainder (0 at index -1, before anything) and check the slice is at
 * least 2 long. nums[i] >= 0, so the remainder is never negative here.
 */
function checkSubarraySum(nums, k) {
  const firstSeen = new Map([[0, -1]]); // remainder -> first index
  let sum = 0;
  for (let j = 0; j < nums.length; j++) {
    sum = (sum + nums[j]) % k;
    if (firstSeen.has(sum)) {
      if (j - firstSeen.get(sum) >= 2) return true;
    } else {
      firstSeen.set(sum, j);
    }
  }
  return false;
}

module.exports = checkSubarraySum;
