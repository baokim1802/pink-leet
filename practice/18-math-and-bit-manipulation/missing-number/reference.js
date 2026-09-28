/**
 * Missing Number — XOR indices against values.
 * Time O(n), Space O(1)
 *
 * XOR together every index 0..n and every value in nums. Each number that is
 * present shows up twice (once as an index, once as a value) and cancels to 0.
 * The missing number shows up only once, as an index, so it's what remains.
 * (The Gauss sum n*(n+1)/2 minus the array sum works just as well here.)
 */
function missingNumber(nums) {
  let x = nums.length; // index n has no slot in the array, so start with it
  for (let i = 0; i < nums.length; i++) x ^= i ^ nums[i];
  return x;
}

module.exports = missingNumber;
