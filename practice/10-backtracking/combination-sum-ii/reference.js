/**
 * Combination Sum II — sort, backtrack with i + 1, skip same-level duplicates.
 * Time O(n · 2^n) in the worst case (every subset explored and copied),
 * Space O(n) for the recursion depth / path, plus the output.
 *
 * Sorting puts equal values side by side. Within one level we only start a
 * branch with the first copy of each value, which removes duplicate
 * combinations. Recursing with i + 1 means each element is used at most once,
 * and because the array is sorted we can break as soon as a value is too big.
 */
function combinationSum2(candidates, target) {
  const nums = [...candidates].sort((a, b) => a - b);
  const res = [];
  const path = [];

  function dfs(start, remaining) {
    if (remaining === 0) {
      res.push([...path]);
      return;
    }
    for (let i = start; i < nums.length; i++) {
      if (nums[i] > remaining) break;                   // sorted: nothing later fits
      if (i > start && nums[i] === nums[i - 1]) continue; // same value already tried here
      path.push(nums[i]);
      dfs(i + 1, remaining - nums[i]);                  // i + 1: each element once
      path.pop();
    }
  }

  dfs(0, target);
  return res;
}

module.exports = combinationSum2;
