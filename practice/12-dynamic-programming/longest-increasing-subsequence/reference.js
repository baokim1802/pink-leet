/**
 * Longest Increasing Subsequence — "patience sorting" with binary search.
 * Time O(n log n), Space O(n)
 *
 * tails[k] = the smallest last value of any increasing subsequence of length
 * k + 1 seen so far. tails is always sorted, so for each num we binary-search
 * the first tail >= num and overwrite it (a better, smaller ending for that
 * length), or append num when it beats every tail (a new longest length).
 * The O(n²) DP (dp[i] = 1 + max dp[j] for nums[j] < nums[i]) also passes.
 */
function lengthOfLIS(nums) {
  const tails = [];
  for (const num of nums) {
    let lo = 0;
    let hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] < num) lo = mid + 1;
      else hi = mid;
    }
    tails[lo] = num; // lo === tails.length means append
  }
  return tails.length;
}

module.exports = lengthOfLIS;
