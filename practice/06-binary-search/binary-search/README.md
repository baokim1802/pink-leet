# Binary Search

You're given an array `nums` sorted in **ascending** order (all values distinct) and a number `target`. Return the index of `target` in `nums`, or `-1` if it isn't there.

Your solution must run in `O(log n)` time.

## Examples

```
Input:  nums = [-1,0,3,5,9,12], target = 9
Output: 4
```

```
Input:  nums = [-1,0,3,5,9,12], target = 2
Output: -1
```

## Constraints

- `1 <= nums.length <= 10^4`
- `-10^4 < nums[i], target < 10^4`
- All values in `nums` are unique and sorted ascending.

## Hints

<details><summary>Hint 1</summary>

Look at the middle element. If it's too small, which half can you throw away completely?

</details>

<details><summary>Hint 2</summary>

Keep `lo` and `hi` as the range that *could* still hold the answer. With `while (lo <= hi)`, move to `mid + 1` or `mid - 1` so the range always shrinks — otherwise you'll loop forever.

</details>
