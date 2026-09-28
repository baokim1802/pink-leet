/**
 * Product of Array Except Self — prefix pass, then suffix pass.
 * Time O(n), Space O(1) extra (besides the output array)
 *
 * answer[i] = (product of nums[0..i-1]) * (product of nums[i+1..n-1]).
 * First fill answer with the left products, then walk from the right keeping
 * a running product of everything to the right and multiply it in.
 */
function productExceptSelf(nums) {
  const n = nums.length;
  const answer = new Array(n);
  let left = 1;
  for (let i = 0; i < n; i++) {
    answer[i] = left;
    left *= nums[i];
  }
  let right = 1;
  for (let i = n - 1; i >= 0; i--) {
    answer[i] *= right;
    right *= nums[i];
  }
  return answer;
}

module.exports = productExceptSelf;
