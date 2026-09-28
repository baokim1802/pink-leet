/**
 * Subarray Sum Equals K — prefix sums + a count map.
 * Time O(n), Space O(n)
 *
 * A subarray ending here sums to k exactly when some earlier prefix sum
 * equals (current prefix sum - k). Keep counts of every prefix sum seen so
 * far (starting with the empty prefix 0), and add the matching count at each
 * step. Works with negatives, unlike a sliding window.
 */
function subarraySum(nums, k) {
  const seen = new Map([[0, 1]]); // prefix sum -> times seen
  let sum = 0;
  let count = 0;
  for (const num of nums) {
    sum += num;
    count += seen.get(sum - k) || 0;
    seen.set(sum, (seen.get(sum) || 0) + 1);
  }
  return count;
}

module.exports = subarraySum;
