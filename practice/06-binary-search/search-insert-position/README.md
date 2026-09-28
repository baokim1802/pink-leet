# Search Insert Position

You get a sorted array `nums` of **distinct** integers (ascending) and a `target`.

If `target` is in the array, return its index. If it isn't, return the index where it **would be inserted** to keep the array sorted.

Your solution should run in `O(log n)` time.

## Examples

```
Input:  nums = [1,3,5,6], target = 5
Output: 2          // found at index 2
```

```
Input:  nums = [1,3,5,6], target = 2
Output: 1          // 2 would go between 1 and 3
```

```
Input:  nums = [1,3,5,6], target = 7
Output: 4          // past the end
```

## Constraints

- `1 <= nums.length <= 10^4`
- `-10^4 <= nums[i], target <= 10^4`
- `nums` is sorted ascending and has no duplicates.

## Hints

<details><summary>Hint 1</summary>

Both cases ("found it" and "where it would go") are the same question: what is the **first index** whose value is `>= target`?

</details>

<details><summary>Hint 2</summary>

That's the classic *lower bound* search. The answer can be anywhere from `0` to `nums.length` (inclusive!), so start with `lo = 0, hi = nums.length`.

</details>

<details><summary>Hint 3</summary>

With `while (lo < hi)`: if `nums[mid] < target`, the answer is strictly to the right (`lo = mid + 1`); otherwise `mid` might be the answer (`hi = mid`). When the loop ends, `lo` is your index.

</details>
