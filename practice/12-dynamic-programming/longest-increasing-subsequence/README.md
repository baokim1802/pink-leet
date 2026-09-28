# Longest Increasing Subsequence

Given an integer array `nums`, return the length of its longest **strictly increasing subsequence**.

A *subsequence* keeps some elements (in their original order) and drops the rest — the kept elements don't have to be next to each other. "Strictly" means equal neighbors don't count: `[3,3]` is not increasing.

## Examples

```
Input:  nums = [10,9,2,5,3,7,101,18]
Output: 4
// one answer: [2,3,7,101]
```

```
Input:  nums = [0,1,0,3,2,3]
Output: 4
// [0,1,2,3]
```

```
Input:  nums = [7,7,7,7,7]
Output: 1
```

## Constraints

- `1 <= nums.length <= 2500`
- `-10^4 <= nums[i] <= 10^4`

## Follow-up

Can you do it in O(n log n) time?

## Hints

<details><summary>Hint 1</summary>

Let `dp[i]` be the length of the longest increasing subsequence that **ends at** index `i`. Every element on its own is a subsequence of length 1.

</details>

<details><summary>Hint 2</summary>

`dp[i] = 1 + max(dp[j])` over all `j < i` with `nums[j] < nums[i]`. The answer is the max over **all** `dp[i]`, not just `dp[n - 1]`. That's O(n²) — fast enough here.

</details>

<details><summary>Hint 3</summary>

For O(n log n): keep an array `tails` where `tails[k]` is the smallest possible last value of an increasing subsequence of length `k + 1`. For each number, binary-search the first tail `>= num` and replace it (or append if none). The final length of `tails` is the answer.

</details>
