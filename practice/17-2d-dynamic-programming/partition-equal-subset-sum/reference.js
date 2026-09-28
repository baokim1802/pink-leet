/**
 * Partition Equal Subset Sum — 0/1 knapsack over sums, one row.
 * Time O(n · target), Space O(target) where target = sum / 2
 *
 * can[s] = true if some subset of the numbers processed so far sums to s.
 * For each number x, walk s from target DOWN to x: can[s] ||= can[s - x].
 * Walking downwards means can[s - x] still describes the subsets *without*
 * x, so each number is used at most once.
 */
function canPartition(nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2 === 1) return false;
  const target = total / 2;
  const can = new Array(target + 1).fill(false);
  can[0] = true;
  for (const x of nums) {
    for (let s = target; s >= x; s--) {
      if (can[s - x]) can[s] = true;
    }
    if (can[target]) return true;
  }
  return can[target];
}

module.exports = canPartition;
