/**
 * Search in Rotated Sorted Array — binary search on the sorted half.
 * Time O(log n), Space O(1)
 *
 * For any mid, one of [lo..mid] or [mid..hi] is sorted. We figure out which
 * (nums[lo] <= nums[mid] means the left half is), check whether target falls
 * within that sorted half's range, and keep only the half that can hold it.
 */
function search(nums, target) {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (nums[mid] === target) return mid;

    if (nums[lo] <= nums[mid]) {
      // left half is sorted
      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      // right half is sorted
      if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return -1;
}

module.exports = search;
