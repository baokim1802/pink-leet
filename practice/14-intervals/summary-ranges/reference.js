/**
 * Summary Ranges — one pass, growing each run of consecutive numbers.
 * Time O(n), Space O(1) extra (besides the output)
 *
 * Start a run at index i, advance j while nums[j + 1] === nums[j] + 1,
 * then emit "start" or "start->end" and begin the next run at j + 1.
 */
function summaryRanges(nums) {
  const out = [];
  let i = 0;
  while (i < nums.length) {
    let j = i;
    while (j + 1 < nums.length && nums[j + 1] === nums[j] + 1) j++;
    out.push(i === j ? `${nums[i]}` : `${nums[i]}->${nums[j]}`);
    i = j + 1;
  }
  return out;
}

module.exports = summaryRanges;
