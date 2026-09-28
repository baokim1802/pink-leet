/**
 * Counting Bits — DP on the number with its last bit removed.
 * Time O(n), Space O(1) extra (the output array itself is O(n))
 *
 * i >> 1 drops the lowest bit of i and is smaller than i, so its count is
 * already known. Add back the dropped bit (i & 1) to get the count for i.
 */
function countBits(n) {
  const ans = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) ans[i] = ans[i >> 1] + (i & 1);
  return ans;
}

module.exports = countBits;
