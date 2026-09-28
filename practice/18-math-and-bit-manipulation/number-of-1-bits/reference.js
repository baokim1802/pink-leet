/**
 * Number of 1 Bits — Brian Kernighan's trick.
 * Time O(k) where k = number of set bits (at most 32), Space O(1)
 *
 * n & (n - 1) turns off the lowest set bit of n. Counting how many times
 * we can do that before n becomes 0 counts the set bits, skipping the zeros.
 */
function hammingWeight(n) {
  let count = 0;
  while (n !== 0) {
    n &= n - 1;
    count++;
  }
  return count;
}

module.exports = hammingWeight;
