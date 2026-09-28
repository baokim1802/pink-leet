# Number of 1 Bits

Given a positive integer `n`, return how many `1` bits its binary representation has (this count is also called the **Hamming weight**).

## Examples

```
Input:  n = 11
Output: 3          // 11 is 1011 in binary
```

```
Input:  n = 128
Output: 1          // 10000000
```

```
Input:  n = 2147483645
Output: 30         // 1111111111111111111111111111101
```

## Constraints

- `1 <= n <= 2^31 - 1`

**Follow-up:** if this function were called many times, how could you make it faster?

## Hints

<details><summary>Hint 1</summary>

Check the lowest bit with `n & 1`, then shift right with `n >>>= 1`. Repeat until `n` is `0`.

</details>

<details><summary>Hint 2</summary>

There's a slicker trick: `n & (n - 1)` clears the lowest set bit. How many times can you do that before `n` hits `0`?

</details>
