/**
 * Coin Change — bottom-up DP over amounts.
 * Time O(amount · coins.length), Space O(amount)
 *
 * dp[a] = fewest coins that sum to a. dp[0] = 0, everything else starts as
 * Infinity (unreachable). For each amount, try finishing with each coin:
 * dp[a] = min(dp[a], dp[a - coin] + 1).
 */
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const coin of coins) {
      if (coin <= a && dp[a - coin] + 1 < dp[a]) dp[a] = dp[a - coin] + 1;
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

module.exports = coinChange;
