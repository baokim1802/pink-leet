/**
 * Largest Rectangle in Histogram — monotonic increasing stack of indices.
 * Time O(n), Space O(n)
 *
 * For each bar, the best rectangle of exactly its height extends to the
 * nearest shorter bar on each side. The stack keeps indices with increasing
 * heights; when a shorter bar arrives, each popped bar has found its right
 * boundary (the current index) and its left boundary (the index below it on
 * the stack). A virtual height-0 bar at the end pops everything that's left.
 */
function largestRectangleArea(heights) {
  const stack = []; // indices, heights increasing
  let best = 0;
  for (let i = 0; i <= heights.length; i++) {
    const h = i === heights.length ? 0 : heights[i];
    while (stack.length && heights[stack[stack.length - 1]] >= h) {
      const height = heights[stack.pop()];
      const left = stack.length ? stack[stack.length - 1] : -1;
      best = Math.max(best, height * (i - left - 1));
    }
    stack.push(i);
  }
  return best;
}

module.exports = largestRectangleArea;
