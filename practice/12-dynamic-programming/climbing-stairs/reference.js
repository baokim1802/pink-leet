/**
 * Climbing Stairs — bottom-up DP with two rolling variables.
 * Time O(n), Space O(1)
 *
 * ways(i) = ways(i - 1) + ways(i - 2): the last move was a 1-step or a 2-step.
 * With ways(0) = 1 (stand still) and ways(1) = 1, this is the Fibonacci sequence.
 */
function climbStairs(n) {
  let prev2 = 1; // ways(0)
  let prev1 = 1; // ways(1)
  for (let i = 2; i <= n; i++) {
    const cur = prev1 + prev2;
    prev2 = prev1;
    prev1 = cur;
  }
  return prev1;
}

module.exports = climbStairs;
