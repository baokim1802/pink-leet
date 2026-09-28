/**
 * Jump Game — "farthest reach" greedy.
 * Time O(n), Space O(1)
 *
 * The indices we can reach always form a prefix 0..farthest. Scan left to
 * right; every index inside the prefix can extend it to i + nums[i]. If we
 * reach an index beyond `farthest`, there is a gap we can never cross.
 */
function canJump(nums) {
  let farthest = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > farthest) return false;
    farthest = Math.max(farthest, i + nums[i]);
    if (farthest >= nums.length - 1) return true;
  }
  return true;
}

module.exports = canJump;
