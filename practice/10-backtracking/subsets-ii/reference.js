/**
 * Subsets II — sort, then backtrack and skip equal values at the same depth.
 * Time O(n · 2^n), Space O(n) extra (recursion + path), plus the output.
 *
 * After sorting, equal values are neighbors. At one level of the recursion we
 * only start a branch with the first copy of each value (i > start && equal
 * to the previous → skip). Deeper levels may still take the later copies, so
 * [2,2] and [2,2,2] are produced exactly once each.
 */
function subsetsWithDup(nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  const res = [];
  const path = [];

  function dfs(start) {
    res.push([...path]);
    for (let i = start; i < sorted.length; i++) {
      if (i > start && sorted[i] === sorted[i - 1]) continue; // same value already tried at this level
      path.push(sorted[i]);
      dfs(i + 1);
      path.pop();
    }
  }

  dfs(0);
  return res;
}

module.exports = subsetsWithDup;
