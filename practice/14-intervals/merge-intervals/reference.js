/**
 * Merge Intervals — sort by start, then sweep and extend the last block.
 * Time O(n log n), Space O(n) for the output (plus the sort)
 *
 * After sorting by start, an interval overlaps the current merged block
 * exactly when its start <= the block's end. Extend the block's end with
 * Math.max (the new interval may be fully inside), or start a new block.
 */
function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const [start, end] of intervals) {
    const last = merged[merged.length - 1];
    if (last && start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      merged.push([start, end]);
    }
  }
  return merged;
}

module.exports = merge;
