/**
 * Interval List Intersections — two pointers over the sorted lists.
 * Time O(m + n), Space O(1) extra (besides the output)
 *
 * The overlap of a and b is [max(starts), min(ends)], valid when lo <= hi.
 * Then drop whichever interval ends first: it can't reach anything later
 * in the other list, while the one that ends later might.
 */
function intervalIntersection(firstList, secondList) {
  const out = [];
  let i = 0;
  let j = 0;
  while (i < firstList.length && j < secondList.length) {
    const [aStart, aEnd] = firstList[i];
    const [bStart, bEnd] = secondList[j];
    const lo = Math.max(aStart, bStart);
    const hi = Math.min(aEnd, bEnd);
    if (lo <= hi) out.push([lo, hi]);
    if (aEnd < bEnd) i++;
    else j++;
  }
  return out;
}

module.exports = intervalIntersection;
