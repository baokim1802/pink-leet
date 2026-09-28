/**
 * Trapping Rain Water — two pointers with running maxima.
 * Time O(n), Space O(1)
 *
 * Water above bar i = min(max to the left, max to the right) - height[i].
 * Keep leftMax and rightMax as the pointers move inward. If leftMax is the
 * smaller one, the left bar's water is fully determined (whatever is on the
 * right is at least rightMax >= leftMax), so settle it and advance l; and
 * symmetrically for the right side.
 */
function trap(height) {
  let l = 0;
  let r = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;
  while (l < r) {
    leftMax = Math.max(leftMax, height[l]);
    rightMax = Math.max(rightMax, height[r]);
    if (leftMax <= rightMax) {
      water += leftMax - height[l];
      l++;
    } else {
      water += rightMax - height[r];
      r--;
    }
  }
  return water;
}

module.exports = trap;
