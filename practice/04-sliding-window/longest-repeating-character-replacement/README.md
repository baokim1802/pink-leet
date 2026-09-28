# Longest Repeating Character Replacement

You're given a string `s` of uppercase English letters and an integer `k`. You may pick any character in the string and change it to any other uppercase letter — at most `k` times in total.

Return the length of the **longest substring made of one repeated letter** you can end up with.

## Examples

```
Input:  s = "ABAB", k = 2
Output: 4          // change both A's to B (or both B's to A) → "BBBB"
```

```
Input:  s = "AABABBA", k = 1
Output: 4          // change the middle 'A' → "AABBBBA", which has "BBBB"
```

## Constraints

- `1 <= s.length <= 10^5`
- `s` contains only uppercase English letters.
- `0 <= k <= s.length`

## Hints

<details><summary>Hint 1</summary>

For any window, the cheapest way to make it all one letter is to keep its **most frequent** letter and change everything else. That costs `windowLength - maxCount` changes.

</details>

<details><summary>Hint 2</summary>

A window is valid when `windowLength - maxCount <= k`. Grow the window to the right; when it becomes invalid, shrink it from the left.

</details>

<details><summary>Hint 3</summary>

Neat trick: you never need to *decrease* `maxCount` when shrinking. The answer only improves when a window with a larger `maxCount` appears, so a stale (too-high) `maxCount` can't produce a wrong bigger answer.

</details>
