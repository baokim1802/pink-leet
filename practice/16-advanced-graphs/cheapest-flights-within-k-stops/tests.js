// Deterministic pseudo-random network: 60 cities, ~800 flights. Cheap flights
// mostly go to the "next" few cities, so short routes are expensive and
// cheap routes are long — the stop limit really matters.
function randomFlights() {
  let seed = 4242;
  const rand = (m) => (seed = (seed * 48271) % 2147483647) % m;
  const seen = new Set();
  const flights = [];
  const add = (u, v, p) => {
    if (u === v || seen.has(`${u},${v}`)) return;
    seen.add(`${u},${v}`);
    flights.push([u, v, p]);
  };
  for (let u = 0; u < 59; u++) add(u, u + 1, 1 + rand(10));
  while (flights.length < 800) {
    const u = rand(60);
    const v = rand(60);
    add(u, v, Math.abs(u - v) * 20 + rand(200));
  }
  return flights;
}
const net = randomFlights();

module.exports = {
  fn: 'findCheapestPrice',
  cases: [
    { args: [4, [[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]], 0, 3, 1], expected: 700 },
    { args: [3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 1], expected: 200 },
    { args: [3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 0], expected: 500 },
    { name: 'destination unreachable', args: [3, [[0, 1, 100]], 0, 2, 1], expected: -1 },
    { name: 'reachable only with too many stops', args: [4, [[0, 1, 1], [1, 2, 1], [2, 3, 1]], 0, 3, 1], expected: -1 },
    { name: 'no flights at all', args: [2, [], 0, 1, 1], expected: -1 },
    {
      name: 'cheapest overall route uses one stop too many',
      args: [5, [[0, 1, 5], [1, 2, 5], [0, 3, 2], [3, 1, 2], [1, 4, 1], [4, 2, 1]], 0, 2, 2],
      expected: 7,
    },
    {
      name: 'a pricier first hop leads to a cheaper total',
      args: [4, [[0, 1, 1], [0, 2, 5], [1, 3, 10], [2, 3, 1]], 0, 3, 1],
      expected: 6,
    },
    { name: 'flights only go the wrong way', args: [3, [[1, 0, 1], [2, 1, 1]], 0, 2, 2], expected: -1 },
    { name: '60 cities, k = 3', args: [60, net, 0, 59, 3], expected: 1203 },
    { name: '60 cities, k = 20', args: [60, net, 0, 59, 20], expected: 890 },
  ],
};
