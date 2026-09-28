/**
 * Best Time to Buy and Sell Stock — track the cheapest price so far.
 * Time O(n), Space O(1)
 *
 * This is a sliding window where the left edge is "the day we bought".
 * Whenever we see a new lowest price, buying there can only be better for
 * every future sell day, so we move the left edge. Otherwise we try selling
 * today and keep the best profit.
 */
function maxProfit(prices) {
  let minPrice = Infinity;
  let best = 0;
  for (const price of prices) {
    if (price < minPrice) minPrice = price;
    else best = Math.max(best, price - minPrice);
  }
  return best;
}

module.exports = maxProfit;
