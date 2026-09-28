# Top K Frequent Elements

Given an integer array `nums` and an integer `k`, return the `k` values that occur **most often**. You can return them in any order.

The input is guaranteed to have a unique answer (no ties at the cut-off).

## Examples

```
Input:  nums = [1,1,1,2,2,3], k = 2
Output: [1,2]          // 1 appears 3 times, 2 appears twice
```

```
Input:  nums = [1], k = 1
Output: [1]
```

## Constraints

- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`
- `1 <= k <=` number of distinct values in `nums`
- The answer is unique.

**Follow-up:** sorting by frequency is `O(n log n)`. Can you beat it?

## Hints

<details><summary>Hint 1</summary>

First, count how many times each value appears with a `Map`.

</details>

<details><summary>Hint 2</summary>

Easy version: sort the `[value, count]` entries by count descending and take the first `k`.

</details>

<details><summary>Hint 3</summary>

A count can never exceed `n`. Make `n + 1` buckets where `buckets[c]` holds every value that appears exactly `c` times, then walk from the highest bucket down until you've collected `k` values. That's `O(n)`.

</details>
