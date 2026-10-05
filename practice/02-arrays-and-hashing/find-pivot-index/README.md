# Find Pivot Index

Given an integer array `nums`, return the **pivot index**: the index where the sum of all numbers **strictly to the left** equals the sum of all numbers **strictly to the right**.

If the index is at the edge, the missing side counts as `0`. If there are several pivot indexes, return the **leftmost** one. If there is none, return `-1`.

## Examples

```
Input:  nums = [1,7,3,6,5,6]
Output: 3          // left: 1 + 7 + 3 = 11, right: 5 + 6 = 11
```

```
Input:  nums = [1,2,3]
Output: -1
```

```
Input:  nums = [2,1,-1]
Output: 0          // left: nothing = 0, right: 1 + -1 = 0
```

## Constraints

- `1 <= nums.length <= 10^4`
- `-1000 <= nums[i] <= 1000`

## Hints

<details><summary>Hint 1</summary>

For each index you need "sum of everything to the left". Can you keep that as a running total while you walk, instead of re-adding every time?

</details>

<details><summary>Hint 2</summary>

If you know the **total** of the whole array, you don't need to add up the right side either: `right = total - left - nums[i]`.

</details>

<details><summary>Hint 3</summary>

One pass to get `total`. Second pass: check `left === total - left - nums[i]`, **then** do `left += nums[i]`. Order matters, because `nums[i]` itself belongs to neither side.

</details>
