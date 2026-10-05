# Continuous Subarray Sum

Given an integer array `nums` and an integer `k`, return `true` if there is a contiguous subarray of **length at least 2** whose sum is a **multiple of `k`**. Otherwise return `false`.

`0` counts as a multiple of every `k`.

## Examples

```
Input:  nums = [23,2,4,6,7], k = 6
Output: true       // [2,4] sums to 6
```

```
Input:  nums = [23,2,6,4,7], k = 6
Output: true       // the whole array sums to 42 = 7 * 6
```

```
Input:  nums = [23,2,6,4,7], k = 13
Output: false
```

## Constraints

- `1 <= nums.length <= 10^5`
- `0 <= nums[i] <= 10^9`
- `1 <= k <= 2^31 - 1`

## Hints

<details><summary>Hint 1</summary>

Same remainder trick as **Subarray Sums Divisible by K**: a slice's sum is a multiple of `k` when the running total at its end and the running total just before its start have the same remainder.

</details>

<details><summary>Hint 2</summary>

The new part is "length at least 2". Counting isn't enough anymore: you need to know **where** each remainder was seen, so you can measure how long the slice is.

</details>

<details><summary>Hint 3</summary>

Map "remainder → **first** index where I saw it", seeded with `0 → -1`. At index `j`, if the remainder was first seen at index `i`, the slice is `nums[i+1..j]` with length `j - i`. Return `true` if that's `>= 2`. Only store a remainder the first time: keeping the earliest index gives the longest slice.

</details>
