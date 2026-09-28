# Distinct Subsequences

Given two strings `s` and `t`, count how many different ways you can pick characters of `s` (keeping their order) so that they spell exactly `t`.

Two ways are different if they use a different set of positions in `s`, even if the letters are the same.

## Examples

```
Input:  s = "rabbbit", t = "rabbit"
Output: 3
// ra[bb]b-it, ra[b]b[b]it, rab[bb]it — pick which two of the three b's to use
```

```
Input:  s = "babgbag", t = "bag"
Output: 5
```

```
Input:  s = "a", t = "b"
Output: 0
```

## Constraints

- `1 <= s.length, t.length <= 1000`
- Both strings contain only English letters.
- The answer fits in a 32-bit signed integer.

## Hints

<details><summary>Hint 1</summary>

Let `dp[i][j]` be the number of ways to form the first `j` characters of `t` from the first `i` characters of `s`. What is `dp[i][0]` (forming the empty string)? What is `dp[0][j]` for `j > 0`?

</details>

<details><summary>Hint 2</summary>

Character `s[i-1]` can always be skipped: that gives `dp[i-1][j]` ways. If it equals `t[j-1]`, you may also use it to match the last character of `t`: add `dp[i-1][j-1]`.

</details>

<details><summary>Hint 3</summary>

One row indexed by `j` is enough — but every update reads the *previous* row at `j - 1`, so loop `j` **downwards** (the same trick as 0/1 knapsack).

</details>
