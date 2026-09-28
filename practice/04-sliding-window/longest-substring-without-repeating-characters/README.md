# Longest Substring Without Repeating Characters

Given a string `s`, return the **length** of the longest substring in which no character appears more than once.

A *substring* is a contiguous run of characters (not a subsequence — you can't skip characters).

## Examples

```
Input:  s = "abcabcbb"
Output: 3          // "abc"
```

```
Input:  s = "bbbbb"
Output: 1          // "b"
```

```
Input:  s = "pwwkew"
Output: 3          // "wke" — note "pwke" is not a substring
```

## Constraints

- `0 <= s.length <= 5 * 10^4`
- `s` may contain letters, digits, symbols and spaces.

## Hints

<details><summary>Hint 1</summary>

Checking every substring is `O(n²)` or worse. Instead, keep a window `[left, right]` that never contains a duplicate, and grow it one character at a time.

</details>

<details><summary>Hint 2</summary>

When the new character `s[right]` is already inside the window, the window is invalid. Shrink it from the left until that character is gone. A `Set` or `Map` tells you what's inside.

</details>

<details><summary>Hint 3</summary>

Faster shrink: remember the **last index** of each character in a `Map`. On a repeat, jump `left` straight to `lastIndex + 1` — but never move `left` backwards (try `"abba"`).

</details>
