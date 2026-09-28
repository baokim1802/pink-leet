# Math & Bit Manipulation

This topic is a grab bag of small, sharp tools: reading numbers as rows of bits, cancelling values with XOR, walking 2D grids in unusual orders, and knowing exactly where JavaScript numbers stop behaving. None of it is hard once you've seen it, and interviewers love it because the "aha" solutions are short. The quick reference lives in the Bit Manipulation cheat sheet; this lesson explains *why* the tricks work.

## The big idea

Every integer is a row of bits, and bitwise operators work on **all the bits at once**. That lets you replace loops and extra memory with one-line identities:

- **XOR cancels pairs.** `x ^ x === 0` and `x ^ 0 === x`, in any order. XOR a pile of numbers and every duplicate pair disappears.
- **`n & (n - 1)` drops the lowest set bit.** Subtracting 1 flips the lowest `1` to `0` and every `0` below it to `1`; AND-ing with the original wipes all of those.
- **Masks select bits.** `1 << i` is a number with only bit `i` set, so `&`, `|`, `^` with it read, set, or toggle that one bit.
- **Matrices are just index math.** Rotations and spirals become simple once you write down where cell `(r, c)` goes.

## How to recognize it

- "Every element appears twice except one", "find the missing / extra number" → XOR (or a sum formula).
- "Count the 1 bits", "power of two", "Hamming distance", "reverse the bits" → bit loops and masks.
- "Without using extra space" on an array of integers → XOR, sums, or reusing the input as storage.
- "Do not use `+` or `*`", "without division" → bit tricks.
- "Rotate the matrix", "spiral order", "in place" on a grid → coordinate mapping and shrinking boundaries.
- "Return the answer modulo 10^9 + 7", huge factorials/powers → careful modular arithmetic, maybe `BigInt`.
- Subsets of a small set (`n <= 20`) → an integer bitmask can stand for "which items are chosen".

## JavaScript toolkit

**JS numbers are 64-bit floats, but bitwise operators are 32-bit signed.** Before `&`, `|`, `^`, `~`, `<<`, `>>`, the operand is converted to a 32-bit two's-complement integer (anything above bit 31 is thrown away), and the result comes back as a signed 32-bit number.

```js
5 & 3;          // 1     (101 & 011)
5 | 3;          // 7     (111)
5 ^ 3;          // 6     (110)
~5;             // -6    (~x === -x - 1)
1 << 31;        // -2147483648  top bit set = negative!
1 << 32;        // 1     shift counts are taken mod 32
2 ** 32 | 0;    // 0     bits above 31 are discarded
-8 >> 1;        // -4    arithmetic shift: copies the sign bit
-8 >>> 1;       // 2147483644  logical shift: fills with 0
```

**Unsigned results: `>>>` and `>>> 0`.** `>>>` is the only operator that returns an *unsigned* 32-bit value. Shifting by zero, `x >>> 0`, changes no bits, it just reinterprets them as unsigned. Use it whenever a problem says "unsigned 32-bit integer":

```js
(1 << 31) >>> 0;        // 2147483648
(-1) >>> 0;             // 4294967295  (all 32 bits set)
(-1 >>> 0).toString(2); // '11111111111111111111111111111111'
(-1).toString(2);       // '-1'  toString shows the sign, not two's complement
```

**Bits and masks**

```js
(n >> i) & 1;          // read bit i (0 or 1)
n | (1 << i);          // set bit i
n & ~(1 << i);         // clear bit i
n ^ (1 << i);          // toggle bit i
n & -n;                // isolate the lowest set bit (e.g. 12 -> 4)
n & (n - 1);           // n with its lowest set bit removed
(1 << k) - 1;          // mask of the low k bits (k < 31)
parseInt('1011', 2);   // 11
(11).toString(2).padStart(8, '0'); // '00001011'
```

**Counting set bits.** The two standard loops, for `n >= 0`:

```js
let count = 0;
while (n !== 0) { count += n & 1; n >>>= 1; }   // one step per bit position
while (n !== 0) { n &= n - 1; count++; }        // one step per SET bit (Kernighan)
```

Use `>>>=`, not `>>=`, in the first loop: with a negative number `>>` keeps copying the sign bit and the loop never ends.

**Integer math gotchas**

- `/` is float division. For integer division use `Math.floor(a / b)` (rounds toward `-Infinity`) or `Math.trunc(a / b)` (rounds toward 0, like C/Java). They differ for negatives: `Math.floor(-7 / 2) === -4`, `Math.trunc(-7 / 2) === -3`.
- `x | 0` and `~~x` also truncate, but only for values that fit in 32 bits. `~~3e9` is garbage. Prefer `Math.trunc`.
- `%` is a **remainder**, and it keeps the sign of the left side: `-7 % 3 === -1`. For a true modulo use `((a % m) + m) % m`.
- **Safe integers stop at `2^53 - 1`** (`Number.MAX_SAFE_INTEGER`, about `9 * 10^15`). Above that, not every integer is representable: `2 ** 53 + 1 === 2 ** 53` is `true`. There's no overflow error, just silent precision loss.
- Under `MOD = 1e9 + 7`, adding two reduced values is safe (`< 2^31`), but **multiplying** two of them can reach `10^18`, far past `2^53`. That product is already wrong before you take `% MOD`.

**When to use `BigInt`**

```js
const MOD = 1_000_000_007n;
const a = 999_999_999n, b = 999_999_998n;
Number((a * b) % MOD);   // exact, then convert back
10n ** 30n;              // arbitrary size integers
7n / 2n;                 // 3n  (BigInt division truncates)
```

- Reach for it when products or intermediate values can exceed `2^53`: modular multiplication, big factorials, "the answer may be very large".
- You can't mix types: `1n + 1` throws. Convert explicitly with `BigInt(x)` and `Number(x)`.
- `Math.*` doesn't accept BigInts, and BigInt math is noticeably slower, so convert only the hot spot.

**Matrices**

```js
const m = grid.length, n = grid[0].length;
const copy = Array.from({ length: m }, () => new Array(n).fill(0)); // m x n zeros
// NOT new Array(m).fill(new Array(n)) — that is m references to the SAME row
const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // right, down, left, up (clockwise)
```

## Template

**Walk every bit of a 32-bit value**

```js
function forEachBit(n) {
  for (let i = 0; i < 32; i++) {
    const bit = (n >>> i) & 1;
    // use bit i ...
  }
}
```

**XOR cancellation** (pairs vanish, the odd one out survives)

```js
let acc = 0;
for (const x of values) acc ^= x;
// acc is the XOR of everything that appeared an odd number of times
```

**Rotate a square matrix 90° clockwise, in place: transpose, then reverse each row**

```js
function transpose(mat) {                      // square matrices only
  for (let r = 0; r < mat.length; r++)
    for (let c = r + 1; c < mat.length; c++)   // upper triangle only
      [mat[r][c], mat[c][r]] = [mat[c][r], mat[r][c]];
}
// Clockwise:         transpose, then reverse each row.
// Counter-clockwise: transpose, then reverse the ORDER of the rows (mat.reverse()).
// 180°:              reverse the order of the rows, then reverse each row.
```

The reason it works: clockwise sends `(r, c)` to `(c, n - 1 - r)`. Transpose gives `(c, r)`, and reversing the row turns column `r` into column `n - 1 - r`.

**Spiral / layer-by-layer boundaries**

```js
let top = 0, bottom = m - 1, left = 0, right = n - 1;
while (top <= bottom && left <= right) {
  // walk top row (left..right), then top++
  // walk right column (top..bottom), then right--
  // if (top <= bottom): walk bottom row (right..left), then bottom--
  // if (left <= right): walk left column (bottom..top), then left++
}
```

The two `if` guards matter for non-square grids: when a single row or column is left, the "return trip" would visit it a second time.

**Reuse the input as memory.** When a grid problem wants `O(1)` extra space, you can often store flags inside the grid itself: in a spare row/column, or by encoding a second state into the value (e.g. a sign bit, or `value + k * big`).

## Worked example

**Power of Two:** given an integer `n`, return `true` if `n` equals `2^k` for some `k >= 0`.

**Step 1: what do powers of two look like in binary?** Exactly one bit is set:

| n | binary | power of two? |
|---|---|---|
| 1 | `0001` | yes |
| 6 | `0110` | no (two bits) |
| 8 | `1000` | yes |
| 0 | `0000` | no (no bits) |

So the question becomes "does `n` have exactly one set bit?"

**Step 2: remove the lowest set bit and see what's left.** `n & (n - 1)` removes the lowest set bit. If that was the *only* bit, the result is `0`.

- `n = 8`: `1000 & 0111 = 0000` → only one bit → `true`
- `n = 6`: `0110 & 0101 = 0100` → a bit survived → `false`
- `n = 0`: `0 & -1 = 0`, which *looks* like a yes, so guard with `n > 0`.
- Negative numbers are never powers of two, and the `n > 0` guard covers them as well.

```js
function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}
```

**Step 3: check the edges.** The constraints go up to `2^31 - 1`, so `n` always fits in 32 bits and the bitwise conversion loses nothing. For numbers above 32 bits this trick would break (bits get discarded), and you'd fall back to a loop: `while (n % 2 === 0) n /= 2; return n === 1;`.

`O(1)` time, `O(1)` space. The general lesson: **turn the property into a bit pattern, then find the identity that tests it.**

## Complexity cheat sheet

| Technique | Time | Space |
|---|---|---|
| Read / set / clear / toggle one bit | `O(1)` | `O(1)` |
| Count bits, shift loop | `O(32)` | `O(1)` |
| Count bits, `n & (n - 1)` loop | `O(set bits)` | `O(1)` |
| XOR all elements | `O(n)` | `O(1)` |
| Popcount for every `i` in `0..n` (DP) | `O(n)` | `O(n)` output |
| Enumerate all subsets as bitmasks | `O(2^n · n)` | `O(n)` |
| Rotate `n x n` matrix in place | `O(n²)` | `O(1)` |
| Spiral traversal of `m x n` | `O(m · n)` | `O(1)` extra |
| `BigInt` multiply | slower than `Number`, grows with digit count | `O(digits)` |

## Common mistakes

- Forgetting that `1 << 31` is **negative**, and that a function returning "unsigned" bits needs a final `>>> 0`.
- Using `>>` on a value that might have the top bit set: it drags the sign bit along and loops like `while (n) n >>= 1` never finish.
- Looping "until `n` is 0" when the problem needs all 32 positions (leading zeros count when you reverse bits).
- Operator precedence: `n & 1 === 0` parses as `n & (1 === 0)`. Always parenthesize: `(n & 1) === 0`.
- `-7 % 3` is `-1`, not `2`. Normalize with `((a % m) + m) % m`.
- Multiplying two values near `10^9` and expecting `% MOD` to fix it. The precision was lost *before* the `%`. Use `BigInt` for the product.
- Using `x | 0` to floor large numbers or negatives (it truncates, and only for 32-bit values).
- Transposing a matrix by looping over **all** `(r, c)` pairs: every swap happens twice and undoes itself.
- Building a grid with `new Array(m).fill(new Array(n))`: every row is the same array object.
- Writing zeros/markers into a grid while you're still reading it, so fresh markers get mistaken for original data.

## Practice

- [Single Number](#/practice/18-math-and-bit-manipulation/single-number) — Easy
- [Number of 1 Bits](#/practice/18-math-and-bit-manipulation/number-of-1-bits) — Easy
- [Counting Bits](#/practice/18-math-and-bit-manipulation/counting-bits) — Easy
- [Missing Number](#/practice/18-math-and-bit-manipulation/missing-number) — Easy
- [Reverse Bits](#/practice/18-math-and-bit-manipulation/reverse-bits) — Easy
- [Rotate Image](#/practice/18-math-and-bit-manipulation/rotate-image) — Medium
- [Spiral Matrix](#/practice/18-math-and-bit-manipulation/spiral-matrix) — Medium
- [Set Matrix Zeroes](#/practice/18-math-and-bit-manipulation/set-matrix-zeroes) — Medium

## Before moving on

- [ ] I can explain why JS bitwise operators give 32-bit signed results, and when I need `>>>` or `>>> 0`.
- [ ] I know what `x ^ x`, `n & (n - 1)` and `n & -n` do and can use them without looking them up.
- [ ] I can read, set, clear and toggle bit `i` with a mask.
- [ ] I can count set bits two ways and say which loop is faster for sparse numbers.
- [ ] I can rotate a square matrix in place and explain the transpose + reverse trick.
- [ ] I can walk a non-square grid in spiral order without visiting a cell twice.
- [ ] I know that `%` keeps the sign, that numbers lose precision past `2^53`, and when to switch to `BigInt`.
