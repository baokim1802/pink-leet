# Kth Largest Element in an Array

Given an integer array `nums` and an integer `k`, return the **`k`-th largest** element — the value that would sit at position `k` if you sorted the array from largest to smallest. Duplicates count: in `[5,5,4]` the 2nd largest is `5`.

Can you beat sorting the whole array?

## Examples

```
Input:  nums = [3,2,1,5,6,4], k = 2
Output: 5          // sorted desc: 6,5,4,3,2,1
```

```
Input:  nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4          // sorted desc: 6,5,5,4,...
```

## Constraints

- `1 <= k <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

## Hints

<details><summary>Hint 1</summary>

Baseline: `[...nums].sort((a, b) => b - a)[k - 1]` is `O(n log n)`. (Remember the comparator — default `sort()` compares as strings!)

</details>

<details><summary>Hint 2</summary>

You only need the top `k`. Keep a **min-heap of size `k`**: push each number, and whenever the heap grows past `k`, pop the smallest. What's left on top at the end? That's `O(n log k)`.

</details>

<details><summary>Hint 3</summary>

Want average `O(n)`? Look up **quickselect**: partition like quicksort, but only recurse into the side that contains the index you want.

</details>
