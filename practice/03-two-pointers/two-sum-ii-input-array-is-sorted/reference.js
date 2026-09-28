/**
 * Two Sum II — converging pointers on a sorted array.
 * Time O(n), Space O(1)
 *
 * If numbers[l] + numbers[r] is too small, numbers[l] can't pair with anything
 * (r is already the largest option), so l++. Too big → r--. Return 1-indexed.
 */
function twoSum(numbers, target) {
  let l = 0;
  let r = numbers.length - 1;
  while (l < r) {
    const sum = numbers[l] + numbers[r];
    if (sum === target) return [l + 1, r + 1];
    if (sum < target) l++;
    else r--;
  }
  return [];
}

module.exports = twoSum;
