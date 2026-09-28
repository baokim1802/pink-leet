/**
 * Majority Element — Boyer–Moore voting.
 * Time O(n), Space O(1)
 *
 * Pair each occurrence of the majority value with one different value and
 * "cancel" them. Because the majority appears more than n/2 times, it cannot
 * be fully cancelled, so the surviving candidate is the answer. When the
 * running count hits 0, the prefix so far cancelled out completely, and we
 * start fresh with the current number.
 */
function majorityElement(nums) {
  let candidate = null;
  let count = 0;
  for (const num of nums) {
    if (count === 0) candidate = num;
    count += num === candidate ? 1 : -1;
  }
  return candidate;
}

module.exports = majorityElement;
