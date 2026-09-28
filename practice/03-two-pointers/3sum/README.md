# 3Sum

Given an integer array `nums`, return **every distinct triplet** `[nums[i], nums[j], nums[k]]` with three different indices `i`, `j`, `k` whose values add up to `0`.

The result must not contain the same triplet twice (two triplets are the same if they contain the same values). Triplets, and the numbers inside each triplet, can be in any order.

## Examples

```
Input:  nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
```

```
Input:  nums = [0,1,1]
Output: []
```

```
Input:  nums = [0,0,0]
Output: [[0,0,0]]
```

## Constraints

- `3 <= nums.length <= 3000`
- `-10^5 <= nums[i] <= 10^5`

## Hints

<details><summary>Hint 1</summary>

Checking every triplet is `O(n³)`. If you **fix** the first number `a`, what's left is a pair-sum problem: find `b + c === -a`.

</details>

<details><summary>Hint 2</summary>

Sort the array first (with `(a, b) => a - b`!). Then for each anchor `i`, run converging pointers on `i + 1 .. n - 1`.

</details>

<details><summary>Hint 3</summary>

Avoiding duplicates: skip an anchor equal to the previous anchor, and after recording a triplet, move `l` past repeats of `nums[l]` (and `r` past repeats of `nums[r]`). Bonus: once `nums[i] > 0`, no more triplets are possible.

</details>
