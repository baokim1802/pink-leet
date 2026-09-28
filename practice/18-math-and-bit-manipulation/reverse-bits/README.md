# Reverse Bits

Treat the number `n` as a **32-bit unsigned integer** (pad it with leading zeros to exactly 32 bits). Reverse the order of those 32 bits and return the result, also as an **unsigned** number.

So bit 0 moves to bit 31, bit 1 moves to bit 30, and so on.

## Examples

```
Input:  n = 43261596
Output: 964176192
//  in:  00000010100101000001111010011100
//  out: 00111001011110000010100101000000
```

```
Input:  n = 4294967293
Output: 3221225471
//  in:  11111111111111111111111111111101
//  out: 10111111111111111111111111111111
```

```
Input:  n = 1
Output: 2147483648   // only the top bit is set, and it must NOT come out negative
```

## Constraints

- `0 <= n <= 2^32 - 1`
- The answer must be a non-negative number in `[0, 2^32 - 1]`.

**Follow-up:** if this function is called many times, how would you optimize it?

## Hints

<details><summary>Hint 1</summary>

Loop exactly 32 times (not "until `n` is 0" — leading zeros matter here!). Each step: shift the result left by one, copy in the lowest bit of `n` with `n & 1`, then shift `n` right.

</details>

<details><summary>Hint 2</summary>

Use `>>>` (unsigned shift) on `n`. The plain `>>` copies the sign bit, so an input like `4294967293` would fill up with 1s from the left.

</details>

<details><summary>Hint 3</summary>

JS bitwise operators return **signed** 32-bit results, so a result with the top bit set comes out negative (e.g. `-2147483648`). Finish with `return result >>> 0;` to reinterpret it as unsigned.

</details>
