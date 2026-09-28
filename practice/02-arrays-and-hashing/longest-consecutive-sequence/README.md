# Longest Consecutive Sequence

Given an **unsorted** array of integers `nums`, return the length of the longest run of **consecutive integers** (like `4, 5, 6, 7`) that can be formed from its values. The values don't need to be next to each other in the array, and duplicates don't count twice.

Aim for `O(n)` time.

## Examples

```
Input:  nums = [100,4,200,1,3,2]
Output: 4          // 1, 2, 3, 4
```

```
Input:  nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9          // 0 through 8
```

```
Input:  nums = [1,0,1,2]
Output: 3          // 0, 1, 2 (the extra 1 doesn't help)
```

## Constraints

- `0 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

## Hints

<details><summary>Hint 1</summary>

Sorting gives an easy `O(n log n)` answer. To beat it, put every value in a `Set` so "is `x + 1` present?" is `O(1)`.

</details>

<details><summary>Hint 2</summary>

If you start counting upward from *every* number, you redo the same runs over and over. Which numbers are worth starting from?

</details>

<details><summary>Hint 3</summary>

Only start from `x` when `x - 1` is **not** in the set — that's the beginning of a run. Then count `x + 1, x + 2, ...` while they exist. Each number gets visited a constant number of times overall.

</details>
