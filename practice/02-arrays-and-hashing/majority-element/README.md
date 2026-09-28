# Majority Element

Given an array `nums` of length `n`, return its **majority element**: the value that appears **more than** `⌊n / 2⌋` times.

You can assume a majority element always exists.

## Examples

```
Input:  nums = [3,2,3]
Output: 3
```

```
Input:  nums = [2,2,1,1,1,2,2]
Output: 2          // 2 appears 4 times out of 7
```

## Constraints

- `1 <= nums.length <= 5 * 10^4`
- `-10^9 <= nums[i] <= 10^9`
- A majority element is guaranteed to exist.

**Follow-up:** can you solve it in `O(n)` time and `O(1)` extra space?

## Hints

<details><summary>Hint 1</summary>

A count `Map` solves it in `O(n)` time and `O(n)` space: return the first value whose count goes above `n / 2`.

</details>

<details><summary>Hint 2</summary>

For `O(1)` space, imagine every majority element "cancelling out" one non-majority element. Since the majority has more than half the votes, something is left standing at the end.

</details>

<details><summary>Hint 3</summary>

Keep a `candidate` and a `count`. If `count` is `0`, adopt the current number as the candidate. Then add 1 if the number equals the candidate, otherwise subtract 1. (This is the Boyer–Moore voting algorithm.)

</details>
