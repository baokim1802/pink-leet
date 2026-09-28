/**
 * Koko Eating Bananas — binary search on the answer.
 * Time O(n log M) where M = max(piles), Space O(1)
 *
 * canFinish(k) is monotonic: false for small k, true from some point on.
 * We binary search the smallest k in [1, max(piles)] where it's true, using
 * the half-open "lo < hi" template: if k works, keep it (hi = mid);
 * otherwise go faster (lo = mid + 1). Math.floor keeps mid safe for values
 * that don't fit in 32 bits, unlike (lo + hi) >> 1.
 */
function minEatingSpeed(piles, h) {
  const canFinish = (k) => {
    let hours = 0;
    for (const p of piles) {
      hours += Math.ceil(p / k);
      if (hours > h) return false;
    }
    return true;
  };

  let lo = 1;
  let hi = Math.max(...piles);
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (canFinish(mid)) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}

module.exports = minEatingSpeed;
