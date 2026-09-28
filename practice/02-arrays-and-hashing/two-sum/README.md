# Two Sum

Given an array of integers `nums` and an integer `target`, return the **indices** of the two numbers that add up to `target`.

You may assume each input has **exactly one** solution, and you may not use the same element twice. Return the answer in any order.

## Examples

```
Input:  nums = [2,7,11,15], target = 9
Output: [0,1]          // nums[0] + nums[1] === 9
```

```
Input:  nums = [3,2,4], target = 6
Output: [1,2]
```

## Constraints

- `2 <= nums.length <= 10^4`
- `-10^9 <= nums[i], target <= 10^9`
- Exactly one valid answer exists.

**Follow-up:** can you do better than `O(n²)`?

## Hints

<details><summary>Hint 1</summary>

The brute force checks every pair. What are you *looking for* when you stand on `nums[i]`?

</details>

<details><summary>Hint 2</summary>

You're looking for `target - nums[i]`. Which data structure answers "have I seen this value, and where?" in `O(1)`?

</details>
