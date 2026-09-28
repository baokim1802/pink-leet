/**
 * House Robber II — two runs of the straight-line House Robber DP.
 * Time O(n), Space O(1)
 *
 * The first and last houses can't both be taken, so the best plan either
 * ignores the last house (houses 0..n-2) or ignores the first (houses 1..n-1).
 * Each of those is a normal row: best = max(skip, take + best two back).
 */
function rob(nums) {
  const n = nums.length;
  if (n === 1) return nums[0];

  const robRange = (lo, hi) => {
    let prev2 = 0;
    let prev1 = 0;
    for (let i = lo; i <= hi; i++) {
      const cur = Math.max(prev1, prev2 + nums[i]);
      prev2 = prev1;
      prev1 = cur;
    }
    return prev1;
  };

  return Math.max(robRange(0, n - 2), robRange(1, n - 1));
}

module.exports = rob;
