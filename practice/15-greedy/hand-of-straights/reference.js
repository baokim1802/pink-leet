/**
 * Hand of Straights — the smallest remaining card must start a run.
 * Time O(n log n), Space O(n)
 *
 * Count every value, then visit distinct values in increasing order. If value v
 * still has c cards left, nothing smaller remains to extend, so all c of them
 * must start runs v..v+groupSize-1. Remove c copies of each value in the run;
 * if some value doesn't have enough copies, it's impossible.
 */
function isNStraightHand(hand, groupSize) {
  if (hand.length % groupSize !== 0) return false;

  const count = new Map();
  for (const card of hand) count.set(card, (count.get(card) ?? 0) + 1);

  const values = [...count.keys()].sort((a, b) => a - b);
  for (const v of values) {
    const c = count.get(v);
    if (c === 0) continue;
    for (let x = v; x < v + groupSize; x++) {
      const have = count.get(x) ?? 0;
      if (have < c) return false;
      count.set(x, have - c);
    }
  }
  return true;
}

module.exports = isNStraightHand;
