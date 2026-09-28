# Edit Distance

Given two strings `word1` and `word2`, return the minimum number of single-character edits needed to turn `word1` into `word2`. An edit is one of:

- **insert** a character,
- **delete** a character,
- **replace** a character with another one.

## Examples

```
Input:  word1 = "horse", word2 = "ros"
Output: 3
// horse → rorse (replace h) → rose (delete r) → ros (delete e)
```

```
Input:  word1 = "intention", word2 = "execution"
Output: 5
```

```
Input:  word1 = "", word2 = "abc"
Output: 3
```

## Constraints

- `0 <= word1.length, word2.length <= 500`
- Both strings contain only lowercase English letters.

## Hints

<details><summary>Hint 1</summary>

Let `dp[i][j]` be the edit distance between the first `i` characters of `word1` and the first `j` characters of `word2`. Row 0 and column 0 are easy: turning a prefix into the empty string (or back) costs its length.

</details>

<details><summary>Hint 2</summary>

If the last characters match, `dp[i][j] = dp[i-1][j-1]` — no edit needed. Otherwise it's `1 +` the minimum of the three neighbours: `dp[i-1][j]` (delete), `dp[i][j-1]` (insert), `dp[i-1][j-1]` (replace).

</details>

<details><summary>Hint 3</summary>

To use a single row, save the old `dp[j]` before overwriting it — it becomes the diagonal (`dp[i-1][j-1]`) for the next column.

</details>
