/**
 * Minimum Number of Arrows — greedy: sort by end, shoot at each end.
 * Time O(n log n), Space O(1) extra (besides the sort)
 *
 * The balloon that ends first must be hit somewhere in its span; shooting at
 * its end hits as many later balloons as possible. After sorting by end, a
 * new arrow is needed only when a balloon starts after the last arrow's x.
 */
function findMinArrowShots(points) {
  points.sort((a, b) => a[1] - b[1]);
  let arrows = 0;
  let arrowX = -Infinity;
  for (const [start, end] of points) {
    if (start > arrowX) {
      arrows++;
      arrowX = end;
    }
  }
  return arrows;
}

module.exports = findMinArrowShots;
