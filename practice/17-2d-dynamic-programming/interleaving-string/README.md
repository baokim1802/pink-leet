# Interleaving String

Given three strings `s1`, `s2` and `s3`, decide whether `s3` can be formed by **interleaving** `s1` and `s2`.

Interleaving means: chop `s1` and `s2` into pieces and weave them together, taking pieces alternately, without changing the order of characters inside either string. Equivalently, you read `s3` left to right and every character must come from the front of what's left of `s1` or the front of what's left of `s2`, using up both strings completely.

Return `true` or `false`.

## Examples

```
Input:  s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
Output: true
// "aa" + "dbbc" + "bc" + "a" + "c"
```

```
Input:  s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
Output: false
```

```
Input:  s1 = "", s2 = "", s3 = ""
Output: true
```

## Constraints

- `0 <= s1.length, s2.length <= 100`
- `0 <= s3.length <= 200`
- All strings contain only lowercase English letters.

## Follow-up

Can you do it with only `O(s2.length)` extra memory?

## Hints

<details><summary>Hint 1</summary>

If `s1.length + s2.length !== s3.length`, stop — it's `false`. Otherwise, after using `i` characters of `s1` and `j` of `s2`, you've matched exactly `i + j` characters of `s3`. So the state is just `(i, j)`.

</details>

<details><summary>Hint 2</summary>

`dp[i][j]` = can the first `i` chars of `s1` and first `j` chars of `s2` form the first `i + j` chars of `s3`? It's true if `dp[i-1][j]` and `s1[i-1] === s3[i+j-1]`, or `dp[i][j-1]` and `s2[j-1] === s3[i+j-1]`.

</details>

<details><summary>Hint 3</summary>

Greedily taking from whichever string matches fails when both match. The table (or a memo on `(i, j)`) explores both options without blowing up. One row of length `s2.length + 1` is enough.

</details>
