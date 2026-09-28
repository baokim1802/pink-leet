/**
 * 3Sum — sort, fix one number, converging pointers for the other two.
 * Time O(n²), Space O(1) extra (ignoring the sort and the output)
 *
 * After sorting, for each anchor nums[i] we look for l < r with nums[l] + nums[r] === -nums[i].
 * Duplicates are skipped both for the anchor and for l after each hit, so each
 * distinct triplet is produced exactly once.
 */
function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  const n = nums.length;

  for (let i = 0; i < n - 2; i++) {
    if (nums[i] > 0) break; // smallest of the three is positive → sum can't be 0
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let l = i + 1;
    let r = n - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum < 0) l++;
      else if (sum > 0) r--;
      else {
        result.push([nums[i], nums[l], nums[r]]);
        l++;
        r--;
        while (l < r && nums[l] === nums[l - 1]) l++;
      }
    }
  }
  return result;
}

module.exports = threeSum;
