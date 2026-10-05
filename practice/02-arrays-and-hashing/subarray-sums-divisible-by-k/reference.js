/**
 * Subarray Sums Divisible by K — count running totals by remainder.
 * Time O(n), Space O(k)
 *
 * current - earlier is divisible by k exactly when both have the same
 * remainder mod k. JS's % can return a negative number, so normalize it into
 * 0..k-1 before using it as a key.
 */
function subarraysDivByK(nums, k) {
  const seen = new Map([[0, 1]]); // remainder -> times seen
  let sum = 0;
  let count = 0;
  for (const num of nums) {
    sum += num;
    const rem = ((sum % k) + k) % k;
    count += seen.get(rem) || 0;
    seen.set(rem, (seen.get(rem) || 0) + 1);
  }
  return count;
}

module.exports = subarraysDivByK;
