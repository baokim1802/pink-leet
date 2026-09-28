# Single Number

You get a non-empty array of integers `nums`. Every value shows up **exactly twice**, except for one value that shows up **only once**. Return that lonely value.

Your solution should run in **linear time** and use only **constant extra space**.

## Examples

```
Input:  nums = [2,2,1]
Output: 1
```

```
Input:  nums = [4,1,2,1,2]
Output: 4
```

```
Input:  nums = [1]
Output: 1
```

## Constraints

- `1 <= nums.length <= 3 * 10^4`
- `-3 * 10^4 <= nums[i] <= 3 * 10^4`
- Every element appears twice except for exactly one, which appears once.

## Hints

<details><summary>Hint 1</summary>

A `Set` or count `Map` solves it in `O(n)` time, but uses `O(n)` space. Which operation makes two equal numbers "cancel out"?

</details>

<details><summary>Hint 2</summary>

XOR has three handy properties: `x ^ x === 0`, `x ^ 0 === x`, and it's commutative/associative, so order doesn't matter.

</details>

<details><summary>Hint 3</summary>

XOR every number together. Every pair vanishes, and what's left is the single one. It works for negative numbers too.

</details>
