/**
 * Non-overlapping Intervals — greedy: sort by end, keep what fits.
 * Time O(n log n), Space O(1) extra (besides the sort)
 *
 * Keeping the interval that ends earliest never hurts: it leaves the most
 * room for the rest. So sort by end, keep an interval when it starts at or
 * after the last kept end (touching is fine), and count the others as removed.
 */
function eraseOverlapIntervals(intervals) {
  intervals.sort((a, b) => a[1] - b[1]);
  let removed = 0;
  let lastEnd = -Infinity;
  for (const [start, end] of intervals) {
    if (start >= lastEnd) lastEnd = end;
    else removed++;
  }
  return removed;
}

module.exports = eraseOverlapIntervals;
