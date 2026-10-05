# Range Sum Query - Immutable

Build a `NumArray` class that answers many "sum of a slice" questions about the same array quickly:

- `new NumArray(nums)` — stores the integer array `nums`. It never changes afterwards.
- `sumRange(left, right)` — returns `nums[left] + nums[left + 1] + ... + nums[right]` (both ends **included**).

The goal: do the work once in the constructor so every `sumRange` call is `O(1)`.

## Examples

```
Input:
  ["NumArray", "sumRange", "sumRange", "sumRange"]
  [[[-2,0,3,-5,2,-1]], [0,2], [2,5], [0,5]]
Output:
  [null, 1, -1, -3]

// sumRange(0, 2) = -2 + 0 + 3 = 1
// sumRange(2, 5) = 3 + -5 + 2 + -1 = -1
// sumRange(0, 5) = -2 + 0 + 3 + -5 + 2 + -1 = -3
```

## Constraints

- `1 <= nums.length <= 10^4`
- `-10^5 <= nums[i] <= 10^5`
- `0 <= left <= right < nums.length`
- At most `10^4` calls to `sumRange`.

## Hints

<details><summary>Hint 1</summary>

Adding up the slice inside `sumRange` is `O(n)` per call. What could you store in the constructor so you never loop again?

</details>

<details><summary>Hint 2</summary>

Store running totals: `running[i]` = `nums[0] + ... + nums[i]` (including `nums[i]`). The sum of `nums[left..right]` is "total up to the end" minus "total of the part before the start".

</details>

<details><summary>Hint 3</summary>

`sumRange(left, right) = running[right] - running[left - 1]`. When `left` is `0`, nothing comes before the slice, so subtract `0` instead.

</details>
