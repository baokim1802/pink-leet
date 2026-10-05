# Contiguous Array

Given a binary array `nums` (only `0`s and `1`s), return the **length** of the longest contiguous subarray that has the **same number of `0`s and `1`s**.

## Examples

```
Input:  nums = [0,1]
Output: 2          // [0,1]
```

```
Input:  nums = [0,1,0]
Output: 2          // [0,1] or [1,0]
```

```
Input:  nums = [0,1,1,1,1,1,0,0,0]
Output: 6          // [1,1,1,0,0,0]
```

## Constraints

- `1 <= nums.length <= 10^5`
- `nums[i]` is `0` or `1`.

## Hints

<details><summary>Hint 1</summary>

Count each `1` as `+1` and each `0` as `-1`. What does a slice with equal `0`s and `1`s add up to now?

</details>

<details><summary>Hint 2</summary>

It adds up to `0`. A slice adds up to `0` when the running total at its end **equals** the running total just before its start. So you're looking for the same running total showing up twice, as far apart as possible.

</details>

<details><summary>Hint 3</summary>

This time the map stores "running total → the **first** index where I saw it" (never overwrite it: the earliest one gives the longest slice). If the total at index `j` was first seen at index `i`, the slice is `nums[i+1..j]`, length `j - i`. Seed the map with `0 → -1`: "a total of 0 before anything, just before index 0".

</details>
