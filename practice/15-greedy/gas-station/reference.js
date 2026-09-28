/**
 * Gas Station — one pass with a resettable tank.
 * Time O(n), Space O(1)
 *
 * If total gas < total cost the trip is impossible. Otherwise a valid start
 * exists. Drive from a candidate start; if the tank goes negative at station i,
 * no station between the candidate and i can work either (each was reached with
 * a non-negative tank, so starting there empty is no better). So the next
 * candidate is i + 1. The last candidate standing is the answer.
 */
function canCompleteCircuit(gas, cost) {
  let total = 0;
  let tank = 0;
  let start = 0;
  for (let i = 0; i < gas.length; i++) {
    const diff = gas[i] - cost[i];
    total += diff;
    tank += diff;
    if (tank < 0) {
      start = i + 1;
      tank = 0;
    }
  }
  return total < 0 ? -1 : start;
}

module.exports = canCompleteCircuit;
