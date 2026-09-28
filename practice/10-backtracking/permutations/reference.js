/**
 * Permutations — backtracking with a `used` array.
 * Time O(n · n!), Space O(n) extra (recursion + path + used), plus the output.
 *
 * At each depth we may place any element that isn't already in the path.
 * When the path is full it's a complete permutation, so we save a copy.
 */
function permute(nums) {
  const res = [];
  const path = [];
  const used = new Array(nums.length).fill(false);

  function dfs() {
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(nums[i]);
      dfs();
      path.pop();
      used[i] = false;
    }
  }

  dfs();
  return res;
}

module.exports = permute;
