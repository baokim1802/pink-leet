/**
 * Best Time to Buy and Sell Stock with Cooldown — state machine DP.
 * Time O(n), Space O(1)
 *
 * The table is days × {hold, sold, rest}; each row only needs the previous
 * one, so we keep three variables:
 *   hold = best profit while holding a share
 *   sold = best profit if we sold today (tomorrow is a forced cooldown)
 *   rest = best profit with no share and free to buy
 */
function maxProfit(prices) {
  let hold = -Infinity, sold = 0, rest = 0;
  for (const p of prices) {
    const prevSold = sold;
    sold = hold + p;
    hold = Math.max(hold, rest - p);
    rest = Math.max(rest, prevSold);
  }
  return Math.max(sold, rest);
}

module.exports = maxProfit;
