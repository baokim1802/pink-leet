# Valid Anagram

You're given two strings `s` and `t`. Return `true` if `t` is an **anagram** of `s` — that is, `t` uses exactly the same letters as `s`, each the same number of times, just possibly in a different order. Otherwise return `false`.

## Examples

```
Input:  s = "anagram", t = "nagaram"
Output: true
```

```
Input:  s = "rat", t = "car"
Output: false          // 't' vs 'c'
```

```
Input:  s = "aacc", t = "ccac"
Output: false          // same letters, different counts
```

## Constraints

- `1 <= s.length, t.length <= 5 * 10^4`
- `s` and `t` contain only lowercase English letters.

**Follow-up:** what would change if the strings could contain any Unicode characters?

## Hints

<details><summary>Hint 1</summary>

If the lengths differ, you can answer immediately.

</details>

<details><summary>Hint 2</summary>

Sorting both strings and comparing works in `O(n log n)`. Can you avoid the sort by *counting* letters instead?

</details>

<details><summary>Hint 3</summary>

Walk `s` adding `+1` per character and walk `t` adding `-1`. They're anagrams exactly when every count ends at zero. With only 26 letters, a fixed-size array works as the counter.

</details>
