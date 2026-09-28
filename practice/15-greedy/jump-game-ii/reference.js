/**
 * Jump Game II — implicit BFS over windows of indices.
 * Time O(n), Space O(1)
 *
 * Indices reachable with exactly `jumps` jumps form a window ending at `end`.
 * While scanning that window, track the farthest index reachable with one more
 * jump. When we finish the window (i === end), commit to one more jump and the
 * next window ends at `farthest`. We stop before the last index because
 * standing on it needs no further jump.
 */
function jump(nums) {
  let jumps = 0;
  let end = 0;
  let farthest = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (i === end) {
      jumps++;
      end = farthest;
    }
  }
  return jumps;
}

module.exports = jump;
