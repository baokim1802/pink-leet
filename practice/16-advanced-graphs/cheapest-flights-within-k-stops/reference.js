/**
 * Cheapest Flights Within K Stops — Bellman-Ford limited to k + 1 rounds.
 * Time O(k · E), Space O(n)
 *
 * After round i, cost[v] is the cheapest price to reach v using at most i
 * flights. Each round relaxes every flight, reading from the previous round's
 * snapshot `prev` so a single round can never chain two flights together.
 */
function findCheapestPrice(n, flights, src, dst, k) {
  let cost = new Array(n).fill(Infinity);
  cost[src] = 0;
  for (let round = 0; round <= k; round++) {
    const prev = cost;
    cost = [...prev];
    for (const [from, to, price] of flights) {
      if (prev[from] + price < cost[to]) cost[to] = prev[from] + price;
    }
  }
  return cost[dst] === Infinity ? -1 : cost[dst];
}

module.exports = findCheapestPrice;
