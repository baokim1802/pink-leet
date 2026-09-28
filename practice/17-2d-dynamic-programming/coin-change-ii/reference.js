/**
 * Coin Change II — unbounded knapsack counting, one row.
 * Time O(coins.length · amount), Space O(amount)
 *
 * ways[a] = number of combinations of the coin types seen so far that make a.
 * Processing one coin type at a time (outer loop) means each combination is
 * built in a fixed coin order, so it's counted once. The amount loop goes
 * upwards so ways[a - coin] already includes this coin — that's what lets
 * a coin be reused.
 */
function change(amount, coins) {
  const ways = new Array(amount + 1).fill(0);
  ways[0] = 1;
  for (const coin of coins) {
    for (let a = coin; a <= amount; a++) {
      ways[a] += ways[a - coin];
    }
  }
  return ways[amount];
}

module.exports = change;
