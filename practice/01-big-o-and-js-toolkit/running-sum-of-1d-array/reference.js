/**
 * Running Sum of 1d Array — carry a running total (a prefix sum).
 * Time O(n), Space O(1) extra (the output array itself is O(n))
 *
 * Each answer entry reuses the previous total instead of re-summing from index 0,
 * which turns the naive O(n²) into a single pass.
 */
function runningSum(nums) {
  const result = [];
  let total = 0;
  for (const x of nums) {
    total += x;
    result.push(total);
  }
  return result;
}

module.exports = runningSum;
