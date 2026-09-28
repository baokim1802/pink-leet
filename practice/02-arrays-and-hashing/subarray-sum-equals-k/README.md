# Subarray Sum Equals K

Given an integer array `nums` and an integer `k`, count how many **contiguous, non-empty subarrays** have a sum of exactly `k`.

Watch out: `nums` can contain **negative numbers** and zeros.

## Examples

```
Input:  nums = [1,1,1], k = 2
Output: 2          // [1,1] starting at index 0, and [1,1] starting at index 1
```

```
Input:  nums = [1,2,3], k = 3
Output: 2          // [1,2] and [3]
```

```
Input:  nums = [1,-1,0], k = 0
Output: 3          // [1,-1], [0], [1,-1,0]
```

## Constraints

- `1 <= nums.length <= 2 * 10^4`
- `-1000 <= nums[i] <= 1000`
- `-10^7 <= k <= 10^7`

## Hints

<details><summary>Hint 1</summary>

Because of negative numbers, a sliding window won't work: growing the window doesn't always grow the sum. Think about **prefix sums** instead.

</details>

<details><summary>Hint 2</summary>

Let `prefix[j]` be the sum of the first `j` elements. The subarray `nums[i..j-1]` sums to `k` exactly when `prefix[j] - prefix[i] === k`, i.e. `prefix[i] === prefix[j] - k`.

</details>

<details><summary>Hint 3</summary>

Walk the array keeping a running sum and a `Map` from "prefix sum value" → "how many times I've seen it". At each step, add `count(sum - k)` to the answer, then record `sum`. Seed the map with `0 → 1` for the empty prefix.

</details>
