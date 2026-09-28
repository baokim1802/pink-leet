# Partition Equal Subset Sum

Given an array of positive integers `nums`, decide whether you can split it into **two groups with the same sum**. Every element must go into exactly one of the two groups.

Return `true` if such a split exists, otherwise `false`.

## Examples

```
Input:  nums = [1,5,11,5]
Output: true
// [1, 5, 5] and [11]
```

```
Input:  nums = [1,2,3,5]
Output: false
// the total is 11, which is odd
```

```
Input:  nums = [3,3,3,4,5]
Output: true
// [4, 5] and [3, 3, 3]
```

## Constraints

- `1 <= nums.length <= 200`
- `1 <= nums[i] <= 100`

## Hints

<details><summary>Hint 1</summary>

If the total is odd, the answer is immediately `false`. Otherwise the question becomes: is there a subset that sums to exactly `total / 2`?

</details>

<details><summary>Hint 2</summary>

That's a 0/1 knapsack: each number is used at most once. Let `can[s]` mean "some subset of the numbers seen so far sums to `s`". Start with `can[0] = true`.

</details>

<details><summary>Hint 3</summary>

For each number `x`, update `can[s] ||= can[s - x]` for `s` going **downwards** from the target to `x`. Going upwards would let the same `x` be used twice.

</details>
