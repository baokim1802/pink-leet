/**
 * Top K Frequent Elements — count, then bucket sort by frequency.
 * Time O(n), Space O(n)
 *
 * 1. Count occurrences with a Map.
 * 2. buckets[c] = values that appear exactly c times (c is at most n).
 * 3. Walk buckets from high frequency to low, collecting values until we have k.
 */
function topKFrequent(nums, k) {
  const count = new Map();
  for (const x of nums) count.set(x, (count.get(x) || 0) + 1);

  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [value, c] of count) buckets[c].push(value);

  const result = [];
  for (let c = buckets.length - 1; c > 0 && result.length < k; c--) {
    for (const value of buckets[c]) {
      result.push(value);
      if (result.length === k) break;
    }
  }
  return result;
}

module.exports = topKFrequent;
