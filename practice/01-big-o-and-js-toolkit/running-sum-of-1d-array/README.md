# Running Sum of 1d Array

Given an array `nums`, return its **running sum**: a new array where entry `i` is the sum of `nums[0]` through `nums[i]` (inclusive).

## Examples

```
Input:  nums = [1,2,3,4]
Output: [1,3,6,10]     // [1, 1+2, 1+2+3, 1+2+3+4]
```

```
Input:  nums = [1,1,1,1,1]
Output: [1,2,3,4,5]
```

```
Input:  nums = [3,1,2,10,1]
Output: [3,4,6,16,17]
```

## Constraints

- `1 <= nums.length <= 1000`
- `-10^6 <= nums[i] <= 10^6`

**Follow-up:** the obvious approach re-adds everything for each position (`O(n²)`). Can you do it in a single pass?

## Hints

<details><summary>Hint 1</summary>

Entry `i` of the answer is just entry `i - 1` of the answer plus `nums[i]`. You never need to re-add from the start.

</details>

<details><summary>Hint 2</summary>

Keep one running total variable, add each number to it, and push the total.

</details>
