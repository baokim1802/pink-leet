/**
 * Container With Most Water — converging pointers, move the shorter side.
 * Time O(n), Space O(1)
 *
 * Start with the widest container. Its water is capped by the shorter line,
 * and every narrower container using that same short line holds even less,
 * so we can safely discard it and move that pointer inward.
 */
function maxArea(height) {
  let l = 0;
  let r = height.length - 1;
  let best = 0;
  while (l < r) {
    const area = (r - l) * Math.min(height[l], height[r]);
    if (area > best) best = area;
    if (height[l] < height[r]) l++;
    else r--;
  }
  return best;
}

module.exports = maxArea;
