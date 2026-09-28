# Longest Palindromic Substring

Given a string `s`, return its longest substring that is a palindrome (reads the same forwards and backwards).

If several different substrings tie for the longest length, returning any one of them is fine.

## Examples

```
Input:  s = "babad"
Output: "bab"
// "aba" is also accepted
```

```
Input:  s = "cbbd"
Output: "bb"
```

```
Input:  s = "a"
Output: "a"
```

## Constraints

- `1 <= s.length <= 1000`
- `s` contains only digits and English letters.

## Hints

<details><summary>Hint 1</summary>

The same inside-out idea as counting palindromes: `s[i..j]` is a palindrome when its ends match and `s[i+1..j-1]` is a palindrome. A 2D table over `(i, j)` works in O(n²).

</details>

<details><summary>Hint 2</summary>

Cheaper on memory: try every center (each character, and each gap between two characters), and expand outward while the ends match. Remember the widest expansion.

</details>

<details><summary>Hint 3</summary>

Track the best window as a `start` index and a `length`, and only call `s.slice` once at the very end — building strings inside the loop is wasted work.

</details>
