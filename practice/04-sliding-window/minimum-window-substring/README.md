# Minimum Window Substring

You're given two strings, `s` and `t`. Find the **shortest substring of `s`** that contains every character of `t`, **including duplicates** (if `t` has two `'a'`s, the window needs at least two `'a'`s).

Return that substring, or `""` if no such window exists. Characters are case-sensitive. The test data guarantees the answer is unique.

## Examples

```
Input:  s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
```

```
Input:  s = "a", t = "a"
Output: "a"
```

```
Input:  s = "a", t = "aa"
Output: ""         // s only has one 'a'
```

## Constraints

- `1 <= s.length, t.length <= 10^5`
- `s` and `t` contain upper- and lowercase English letters.

**Follow-up:** can you do it in `O(m + n)` time?

## Hints

<details><summary>Hint 1</summary>

Build a `Map` of how many of each character `t` needs. Then use a variable window on `s`: expand `right` until the window covers everything, then shrink `left` as far as possible while it still covers everything.

</details>

<details><summary>Hint 2</summary>

Re-checking the whole count map on every step is slow. Keep a counter `missing` (or `formed`) that tracks how many required characters are still unsatisfied, and update it only when a single count crosses its threshold.

</details>

<details><summary>Hint 3</summary>

Record the best window as a `start` index and a `length` while you shrink — slice the string once at the very end.

</details>
