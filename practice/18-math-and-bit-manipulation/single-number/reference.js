/**
 * Single Number — XOR everything together.
 * Time O(n), Space O(1)
 *
 * x ^ x === 0 and x ^ 0 === x, and XOR is commutative and associative.
 * So every value that appears twice cancels itself out, leaving only the single one.
 */
function singleNumber(nums) {
  let result = 0;
  for (const x of nums) result ^= x;
  return result;
}

module.exports = singleNumber;
