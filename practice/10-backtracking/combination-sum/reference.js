/**
 * Combination Sum — backtracking with a start index and sorted pruning.
 * Time O(n^(T/m)) in the worst case (T = target, m = smallest candidate),
 * Space O(T/m) for the recursion depth / path, plus the output.
 *
 * We walk candidates in sorted order, only looking at index >= start so each
 * combination appears once. Recursing with the same `i` lets a number be reused.
 * Once a candidate exceeds what's left, all later ones do too, so we break.
 */
function combinationSum(candidates, target) {
  const nums = [...candidates].sort((a, b) => a - b);
  const res = [];
  const path = [];

  function dfs(start, remaining) {
    if (remaining === 0) {
      res.push([...path]);
      return;
    }
    for (let i = start; i < nums.length; i++) {
      if (nums[i] > remaining) break; // prune: sorted, so nothing later fits
      path.push(nums[i]);
      dfs(i, remaining - nums[i]); // i, not i + 1: reuse allowed
      path.pop();
    }
  }

  dfs(0, target);
  return res;
}

module.exports = combinationSum;
