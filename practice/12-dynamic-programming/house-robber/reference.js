/**
 * House Robber — 1D DP, take-or-skip, with rolling variables.
 * Time O(n), Space O(1)
 *
 * best(i) = max(best(i - 1), best(i - 2) + nums[i - 1])
 * i.e. either skip the current house, or take it and add the best total that
 * ends at least two houses back.
 */
function rob(nums) {
  let prev2 = 0; // best total up to two houses back
  let prev1 = 0; // best total up to the previous house
  for (const money of nums) {
    const cur = Math.max(prev1, prev2 + money);
    prev2 = prev1;
    prev1 = cur;
  }
  return prev1;
}

module.exports = rob;
