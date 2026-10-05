/**
 * Find Pivot Index — total + running left sum.
 * Time O(n), Space O(1)
 *
 * The right side is whatever's left of the total after removing the left
 * side and nums[i] itself. Check before adding nums[i] to left, since the
 * pivot belongs to neither side.
 */
function pivotIndex(nums) {
  let total = 0;
  for (const num of nums) total += num;
  let left = 0;
  for (let i = 0; i < nums.length; i++) {
    if (left === total - left - nums[i]) return i;
    left += nums[i];
  }
  return -1;
}

module.exports = pivotIndex;
