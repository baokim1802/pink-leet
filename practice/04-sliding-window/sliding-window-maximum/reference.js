/**
 * Sliding Window Maximum — monotonic decreasing deque of indices.
 * Time O(n), Space O(k)
 *
 * The deque holds indices whose values decrease from front to back. A new
 * value evicts every smaller value from the back (they can never be a max
 * again). The front leaves once it falls out of the window, and it is always
 * the window's maximum. JS arrays have no O(1) shift, so the front is tracked
 * with a `head` pointer instead.
 */
function maxSlidingWindow(nums, k) {
  const deque = []; // indices; live part is deque[head..]
  let head = 0;
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    while (deque.length > head && nums[deque[deque.length - 1]] <= nums[i]) deque.pop();
    deque.push(i);
    if (deque[head] <= i - k) head++; // front slid out of the window
    if (i >= k - 1) result.push(nums[deque[head]]);
  }
  return result;
}

module.exports = maxSlidingWindow;
