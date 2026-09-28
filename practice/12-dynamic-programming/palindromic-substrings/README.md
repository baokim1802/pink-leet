# Palindromic Substrings

Given a string `s`, count how many of its substrings are palindromes (read the same forwards and backwards).

A substring is a contiguous, non-empty run of characters. Substrings at different positions count separately, even if they contain the same letters.

## Examples

```
Input:  s = "abc"
Output: 3
// "a", "b", "c"
```

```
Input:  s = "aaa"
Output: 6
// "a", "a", "a", "aa", "aa", "aaa"
```

## Constraints

- `1 <= s.length <= 1000`
- `s` contains only lowercase English letters.

## Hints

<details><summary>Hint 1</summary>

Checking every substring separately is O(n³). A palindrome is built from the inside out: `s[i..j]` is a palindrome exactly when `s[i] === s[j]` and `s[i+1..j-1]` is one.

</details>

<details><summary>Hint 2</summary>

That gives a 2D DP table `isPal[i][j]` — fill it by increasing length. Or skip the table: every palindrome has a **center**, either one character (odd length) or the gap between two (even length).

</details>

<details><summary>Hint 3</summary>

For each of the `2n - 1` centers, expand outward while the two ends match, counting one palindrome per successful step. O(n²) time, O(1) space.

</details>
