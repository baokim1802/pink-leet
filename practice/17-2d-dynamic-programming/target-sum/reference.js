/**
 * Target Sum — reduce to counting subsets with a given sum (0/1 knapsack).
 * Time O(n · P), Space O(P) where P = (total + target) / 2
 *
 * If P is the sum of the "+" numbers and N the sum of the "-" numbers:
 * P - N = target and P + N = total, so P = (total + target) / 2.
 * ways[s] = number of subsets of the numbers seen so far summing to s.
 * The inner loop runs downwards so each number is used at most once.
 */
function findTargetSumWays(nums, target) {
  const total = nums.reduce((a, b) => a + b, 0);
  if (Math.abs(target) > total || (total + target) % 2 !== 0) return 0;
  const goal = (total + target) / 2;
  const ways = new Array(goal + 1).fill(0);
  ways[0] = 1;
  for (const x of nums) {
    for (let s = goal; s >= x; s--) {
      ways[s] += ways[s - x];
    }
  }
  return ways[goal];
}

module.exports = findTargetSumWays;
