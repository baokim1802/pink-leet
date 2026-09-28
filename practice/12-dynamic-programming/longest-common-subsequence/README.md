# Longest Common Subsequence

Given two strings `text1` and `text2`, return the length of their longest **common subsequence**, or `0` if they share none.

A *subsequence* keeps some characters of a string (possibly none, possibly all) in their original order, without rearranging. For example, `"ace"` is a subsequence of `"abcde"`, but `"aec"` is not. A common subsequence is one that is a subsequence of both strings.

## Examples

```
Input:  text1 = "abcde", text2 = "ace"
Output: 3
// "ace"
```

```
Input:  text1 = "abc", text2 = "abc"
Output: 3
```

```
Input:  text1 = "abc", text2 = "def"
Output: 0
```

## Constraints

- `1 <= text1.length, text2.length <= 1000`
- Both strings contain only lowercase English letters.

## Hints

<details><summary>Hint 1</summary>

Compare the strings prefix by prefix. Let `dp[i][j]` be the LCS length of the first `i` characters of `text1` and the first `j` characters of `text2`.

</details>

<details><summary>Hint 2</summary>

If `text1[i-1] === text2[j-1]`, that character extends the LCS of both shorter prefixes: `dp[i-1][j-1] + 1`. Otherwise drop one character from one string or the other: `max(dp[i-1][j], dp[i][j-1])`.

</details>

<details><summary>Hint 3</summary>

Use an `(m + 1) × (n + 1)` table so row 0 and column 0 (empty prefixes) are all zeros. Build it with `Array.from` — not `fill` with a shared row. Bonus: only the previous row is needed.

</details>
