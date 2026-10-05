/**
 * Range Sum Query - Immutable — running totals built once.
 * Time O(n) to build, O(1) per query. Space O(n)
 *
 * running[i] is the sum of nums[0..i], including nums[i]. A slice's sum is
 * the total through its end minus the total before its start (0 when the
 * slice starts at index 0).
 */
class NumArray {
  constructor(nums) {
    this.running = [];
    let sum = 0;
    for (const num of nums) {
      sum += num;
      this.running.push(sum);
    }
  }

  sumRange(left, right) {
    const before = left > 0 ? this.running[left - 1] : 0;
    return this.running[right] - before;
  }
}

module.exports = NumArray;
