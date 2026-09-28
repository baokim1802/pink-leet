/**
 * Reverse Bits — peel bits off the right of n, push them onto the right of result.
 * Time O(32) = O(1), Space O(1)
 *
 * 32 times: shift result left, OR in n's lowest bit, then unsigned-shift n right.
 * Bitwise ops in JS produce signed 32-bit values, so `>>> 0` at the end turns
 * a result with the top bit set back into a non-negative number.
 */
function reverseBits(n) {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    result = (result << 1) | (n & 1);
    n >>>= 1;
  }
  return result >>> 0;
}

module.exports = reverseBits;
