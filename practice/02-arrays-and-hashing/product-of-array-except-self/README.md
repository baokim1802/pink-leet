# Product of Array Except Self

Given an integer array `nums`, build an array `answer` where `answer[i]` is the product of **every element of `nums` except `nums[i]`**.

The catch: **no division**, and it should run in `O(n)` time.

Every product fits in a 32-bit integer.

## Examples

```
Input:  nums = [1,2,3,4]
Output: [24,12,8,6]     // 24 = 2*3*4, 12 = 1*3*4, ...
```

```
Input:  nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]     // only the zero's slot avoids multiplying by 0
```

## Constraints

- `2 <= nums.length <= 10^5`
- `-30 <= nums[i] <= 30`
- Every prefix/suffix product fits in a 32-bit integer.

**Follow-up:** can you do it with `O(1)` extra space? (The output array doesn't count.)

## Hints

<details><summary>Hint 1</summary>

The product of everything except `nums[i]` = (product of everything to the **left** of `i`) × (product of everything to the **right** of `i`).

</details>

<details><summary>Hint 2</summary>

Build a `prefix` array left to right and a `suffix` array right to left, then multiply them slot by slot.

</details>

<details><summary>Hint 3</summary>

To save space, write the prefix products straight into `answer`, then sweep from the right with a single running `suffix` variable, multiplying it in.

</details>
