/**
 * Move Zeroes — read/write pointers with swaps.
 * Time O(n), Space O(1)
 *
 * `write` marks where the next non-zero belongs. Scanning with `read`, each
 * non-zero is swapped into position `write`, which keeps the non-zeros in
 * their original order and pushes the zeros behind them.
 */
function moveZeroes(nums) {
  let write = 0;
  for (let read = 0; read < nums.length; read++) {
    if (nums[read] !== 0) {
      if (read !== write) [nums[write], nums[read]] = [nums[read], nums[write]];
      write++;
    }
  }
}

module.exports = moveZeroes;
