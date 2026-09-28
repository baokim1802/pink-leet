/**
 * Contains Duplicate — one pass with a Set.
 * Time O(n), Space O(n)
 *
 * Add each value to a Set; if it is already there, we found a duplicate and can stop early.
 * (Alternative: sort and compare neighbors for O(n log n) time, O(1) extra space.)
 */
function containsDuplicate(nums) {
  const seen = new Set();
  for (const x of nums) {
    if (seen.has(x)) return true;
    seen.add(x);
  }
  return false;
}

module.exports = containsDuplicate;
