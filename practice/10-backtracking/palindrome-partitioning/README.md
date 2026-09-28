# Palindrome Partitioning

Given a string `s`, cut it into pieces so that **every piece is a palindrome** (reads the same forwards and backwards). Return every possible way to do this.

Each answer is a list of the pieces in their original left-to-right order — joined together they give back `s`. You may return the list of answers in any order.

## Examples

```
Input:  s = "aab"
Output: [["a","a","b"],["aa","b"]]
```

```
Input:  s = "a"
Output: [["a"]]
```

```
Input:  s = "abba"
Output: [["a","b","b","a"],["a","bb","a"],["abba"]]
```

## Constraints

- `1 <= s.length <= 16`
- `s` contains only lowercase English letters.

## Hints

<details><summary>Hint 1</summary>

Think of the decision at each step as "where does the **next** piece end?" If the current piece starts at index `start`, try every `end` from `start` to `s.length - 1`.

</details>

<details><summary>Hint 2</summary>

Only recurse when `s.slice(start, end + 1)` is a palindrome — that's your pruning. When `start === s.length` the whole string has been cut up, so record a copy of the path.

</details>

<details><summary>Hint 3</summary>

Checking a palindrome with two pointers (`i` from the left, `j` from the right) avoids building reversed strings. For extra speed you can precompute `isPal[i][j]` for all substrings with a small DP table.

</details>
