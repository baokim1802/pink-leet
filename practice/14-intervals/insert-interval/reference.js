/**
 * Insert Interval — one linear pass in three phases.
 * Time O(n), Space O(n) for the output
 *
 * 1. Copy intervals that end before newInterval starts.
 * 2. Absorb every interval that overlaps (cur[0] <= end), widening
 *    [start, end] with min/max. Then push the merged interval.
 * 3. Copy the rest — they all start after it ends.
 */
function insert(intervals, newInterval) {
  const out = [];
  let [start, end] = newInterval;
  let i = 0;
  const n = intervals.length;

  while (i < n && intervals[i][1] < start) out.push(intervals[i++]);

  while (i < n && intervals[i][0] <= end) {
    start = Math.min(start, intervals[i][0]);
    end = Math.max(end, intervals[i][1]);
    i++;
  }
  out.push([start, end]);

  while (i < n) out.push(intervals[i++]);
  return out;
}

module.exports = insert;
