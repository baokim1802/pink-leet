# Permutation in String

Given two strings `s1` and `s2`, return `true` if some **permutation** (rearrangement) of `s1` appears as a contiguous substring of `s2`. Otherwise return `false`.

In other words: does `s2` contain a window of length `s1.length` that is an anagram of `s1`?

## Examples

```
Input:  s1 = "ab", s2 = "eidbaooo"
Output: true       // "ba" appears in s2
```

```
Input:  s1 = "ab", s2 = "eidboaoo"
Output: false      // 'b' and 'a' are never next to each other
```

## Constraints

- `1 <= s1.length, s2.length <= 10^4`
- Both strings contain only lowercase English letters.

## Hints

<details><summary>Hint 1</summary>

Every candidate substring has exactly `s1.length` characters — this is a **fixed-size** window.

</details>

<details><summary>Hint 2</summary>

Two strings are anagrams when their letter counts match. Keep a 26-slot count for `s1` and another for the current window of `s2`.

</details>

<details><summary>Hint 3</summary>

Slide the window one step: add the new right character, remove the character that falls off the left. Comparing two 26-length arrays each step is still `O(26 · n)`. For extra credit, track how many of the 26 letters currently match and update it in `O(1)`.

</details>
