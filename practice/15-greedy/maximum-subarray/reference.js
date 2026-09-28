/**
 * Maximum Subarray — Kadane's algorithm.
 * Time O(n), Space O(1)
 *
 * `current` is the best sum of a subarray ending at the current index. A
 * negative prefix can only make the next subarray worse, so whenever extending
 * is worse than starting over (current + x < x, i.e. current < 0), restart at x.
 * The answer is the best `current` seen anywhere. Starting from nums[0] (not 0)
 * keeps all-negative arrays correct.
 */
function maxSubArray(nums) {
  let current = nums[0];
  let best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
  }
  return best;
}

module.exports = maxSubArray;
