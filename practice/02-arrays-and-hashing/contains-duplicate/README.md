# Contains Duplicate

Given an integer array `nums`, return `true` if **any value appears at least twice**, and `false` if every element is distinct.

## Examples

```
Input:  nums = [1,2,3,1]
Output: true           // 1 shows up twice
```

```
Input:  nums = [1,2,3,4]
Output: false
```

```
Input:  nums = [1,1,1,3,3,4,3,2,4,2]
Output: true
```

## Constraints

- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

**Follow-up:** comparing every pair is `O(n²)`. Can you get `O(n log n)`? What about `O(n)`?

## Hints

<details><summary>Hint 1</summary>

If you sorted the array, where would duplicates end up relative to each other?

</details>

<details><summary>Hint 2</summary>

Without sorting: walk the array once and remember every value you've seen. Which structure answers "seen it before?" in `O(1)`?

</details>
