/**
 * Time Based Key-Value Store — per-key history + upper-bound binary search.
 * Time O(1) per set, O(log n) per get. Space O(total sets).
 *
 * Each key maps to parallel arrays of timestamps and values. set timestamps
 * are strictly increasing, so appending keeps them sorted. get finds the
 * first timestamp > t (upper bound); the entry right before it is the most
 * recent one at or before t.
 */
class TimeMap {
  constructor() {
    this.store = new Map(); // key -> { times: number[], values: string[] }
  }

  set(key, value, timestamp) {
    if (!this.store.has(key)) this.store.set(key, { times: [], values: [] });
    const entry = this.store.get(key);
    entry.times.push(timestamp);
    entry.values.push(value);
  }

  get(key, timestamp) {
    const entry = this.store.get(key);
    if (!entry) return '';
    const { times, values } = entry;
    let lo = 0;
    let hi = times.length;
    while (lo < hi) {
      const mid = lo + Math.floor((hi - lo) / 2);
      if (times[mid] <= timestamp) lo = mid + 1;
      else hi = mid;
    }
    return lo === 0 ? '' : values[lo - 1];
  }
}

module.exports = TimeMap;
