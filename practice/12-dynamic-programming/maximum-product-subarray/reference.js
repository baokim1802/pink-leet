/**
 * Maximum Product Subarray — DP tracking the max AND min product ending here.
 * Time O(n), Space O(1)
 *
 * A negative number turns the smallest product into the largest one, so for
 * every index we keep both extremes of "products of subarrays ending at i":
 *   hi = max(x, x * hi, x * lo)
 *   lo = min(x, x * hi, x * lo)
 * (computed from the previous hi/lo). The answer is the best hi seen.
 */
function maxProduct(nums) {
  let hi = nums[0];
  let lo = nums[0];
  let best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const x = nums[i];
    const a = x * hi;
    const b = x * lo;
    hi = Math.max(x, a, b);
    lo = Math.min(x, a, b);
    best = Math.max(best, hi);
  }
  return best;
}

module.exports = maxProduct;
