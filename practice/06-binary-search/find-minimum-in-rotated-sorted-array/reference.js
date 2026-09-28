/**
 * Find Minimum in Rotated Sorted Array — binary search against the right end.
 * Time O(log n), Space O(1)
 *
 * The array is a high ascending run followed by a low one. If nums[mid] is
 * bigger than nums[hi], mid sits in the high run and the minimum is to its
 * right (lo = mid + 1). Otherwise mid is in the low run, so the minimum is
 * mid itself or further left (hi = mid). When lo meets hi we're on it.
 */
function findMin(nums) {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (nums[mid] > nums[hi]) lo = mid + 1;
    else hi = mid;
  }
  return nums[lo];
}

module.exports = findMin;
