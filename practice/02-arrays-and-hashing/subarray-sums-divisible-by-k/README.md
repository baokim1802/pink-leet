# Subarray Sums Divisible by K

Given an integer array `nums` and an integer `k`, return how many contiguous, non-empty subarrays have a sum that is **divisible by `k`**.

Watch out: `nums` can contain **negative numbers**.

## Examples

```
Input:  nums = [4,5,0,-2,-3,1], k = 5
Output: 7
// [4,5,0,-2,-3,1], [5], [5,0], [5,0,-2,-3], [0], [0,-2,-3], [-2,-3]
```

```
Input:  nums = [5], k = 9
Output: 0
```

## Constraints

- `1 <= nums.length <= 3 * 10^4`
- `-10^4 <= nums[i] <= 10^4`
- `2 <= k <= 10^4`

## Hints

<details><summary>Hint 1</summary>

A slice's sum is `current - earlier` (two running totals). When is `current - earlier` divisible by `k`? Try a few numbers with `k = 5`: `12 - 7`, `13 - 3`, `9 - 4`.

</details>

<details><summary>Hint 2</summary>

`current - earlier` is divisible by `k` exactly when `current` and `earlier` have the **same remainder** when divided by `k`. So count running totals by their remainder instead of their value.

</details>

<details><summary>Hint 3</summary>

JavaScript gotcha: `-3 % 5` is `-3`, not `2`. Fix it with `((sum % k) + k) % k` so every remainder is between `0` and `k - 1`. Seed the map with remainder `0 → 1`, then at each step add the count of the current remainder before recording it.

</details>
