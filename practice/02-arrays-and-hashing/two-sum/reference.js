/**
 * Two Sum — one pass with a hash map.
 * Time O(n), Space O(n)
 *
 * For each number, check whether its complement (target - num) was already seen.
 * Storing value -> index lets us answer that in O(1).
 */
function twoSum(nums, target) {
  const seen = new Map(); // value -> index
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}

module.exports = twoSum;
