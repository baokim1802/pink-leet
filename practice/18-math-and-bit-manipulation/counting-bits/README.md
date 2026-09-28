# Counting Bits

Given an integer `n`, build an array `ans` of length `n + 1` where `ans[i]` is the number of `1` bits in the binary form of `i`, for every `i` from `0` to `n`.

## Examples

```
Input:  n = 2
Output: [0,1,1]
// 0 -> 0, 1 -> 1, 2 -> 10
```

```
Input:  n = 5
Output: [0,1,1,2,1,2]
// 0 -> 0, 1 -> 1, 2 -> 10, 3 -> 11, 4 -> 100, 5 -> 101
```

## Constraints

- `0 <= n <= 10^5`

**Follow-up:** counting each number separately is `O(n log n)`. Can you do it in `O(n)` in a single pass, without a built-in popcount?

## Hints

<details><summary>Hint 1</summary>

Look at `i` and `i >> 1` (that's `i` with its last bit chopped off). How do their bit counts relate?

</details>

<details><summary>Hint 2</summary>

`i >> 1` is smaller than `i`, so its answer is already in the array. You only need to add back the bit you chopped off: `i & 1`.

</details>

<details><summary>Hint 3</summary>

Another relation that works: `i & (i - 1)` is `i` without its lowest set bit, so it has exactly one fewer `1`.

</details>
