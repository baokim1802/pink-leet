/**
 * Subsets — backtracking with a start index.
 * Time O(n · 2^n), Space O(n) extra (recursion + path), plus the output.
 *
 * Every node of the decision tree is a valid subset, so we record the path on
 * entry, then try extending it with each later element. Only looking forward
 * (i >= start) guarantees each subset is produced exactly once.
 */
function subsets(nums) {
  const res = [];
  const path = [];

  function dfs(start) {
    res.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]); // choose
      dfs(i + 1);         // explore
      path.pop();         // unchoose
    }
  }

  dfs(0);
  return res;
}

module.exports = subsets;
