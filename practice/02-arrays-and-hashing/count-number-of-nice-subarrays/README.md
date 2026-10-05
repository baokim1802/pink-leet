# Count Number of Nice Subarrays

Given an integer array `nums` and an integer `k`, a contiguous, non-empty subarray is **nice** if it contains **exactly `k` odd numbers**.

Return how many nice subarrays there are.

## Examples

```
Input:  nums = [1,1,2,1,1], k = 3
Output: 2          // [1,1,2,1] and [1,2,1,1]
```

```
Input:  nums = [2,4,6], k = 1
Output: 0          // there are no odd numbers
```

```
Input:  nums = [2,2,2,1,2,2,1,2,2,2], k = 2
Output: 16
```

## Constraints

- `1 <= nums.length <= 5 * 10^4`
- `1 <= nums[i] <= 10^5`
- `1 <= k <= nums.length`

## Hints

<details><summary>Hint 1</summary>

You only care whether each number is odd or not. What if you replaced every odd number with `1` and every even number with `0`?

</details>

<details><summary>Hint 2</summary>

After that swap, "exactly `k` odd numbers" means "the slice adds up to `k`". You've solved that before: **Subarray Sum Equals K**.

</details>

<details><summary>Hint 3</summary>

Keep a running count of odd numbers seen so far and a `Map` of "running count → times seen", seeded with `0 → 1`. At each step, add `seen.get(odds - k) || 0`, then record `odds`.

</details>
