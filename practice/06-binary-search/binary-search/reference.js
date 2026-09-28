/**
 * Binary Search — classic closed interval [lo, hi].
 * Time O(log n), Space O(1)
 *
 * Invariant: if target is in nums, it lives in nums[lo..hi]. Each step
 * compares the middle element and discards the half that can't contain
 * target. When lo > hi the range is empty, so target isn't there.
 */
function search(nums, target) {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

module.exports = search;
