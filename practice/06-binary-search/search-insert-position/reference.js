/**
 * Search Insert Position — lower-bound binary search.
 * Time O(log n), Space O(1)
 *
 * We look for the first index i with nums[i] >= target. The answer lives in
 * [0, n] (n means "insert at the end"), so hi starts at nums.length. If
 * nums[mid] < target, everything up to mid is too small (lo = mid + 1);
 * otherwise mid is a candidate, so keep it (hi = mid). lo === hi at the end.
 */
function searchInsert(nums, target) {
  let lo = 0;
  let hi = nums.length;
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

module.exports = searchInsert;
