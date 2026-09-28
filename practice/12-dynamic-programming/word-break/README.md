# Word Break

You're given a string `s` and a list of dictionary words `wordDict`. Return `true` if `s` can be cut into a sequence of one or more dictionary words (with no letters left over), and `false` otherwise.

Each dictionary word may be used as many times as you like.

## Examples

```
Input:  s = "leetcode", wordDict = ["leet","code"]
Output: true
// "leet" + "code"
```

```
Input:  s = "applepenapple", wordDict = ["apple","pen"]
Output: true
// "apple" + "pen" + "apple" — reusing "apple" is fine
```

```
Input:  s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false
```

## Constraints

- `1 <= s.length <= 300`
- `1 <= wordDict.length <= 1000`
- `1 <= wordDict[i].length <= 20`
- `s` and every word contain only lowercase English letters.
- All words in `wordDict` are unique.

## Hints

<details><summary>Hint 1</summary>

Greedily grabbing the first word that matches can paint you into a corner (try `"cars"` with `["car","ca","rs"]`). You need to consider every possible first word.

</details>

<details><summary>Hint 2</summary>

Plain recursion re-solves the same suffixes over and over. Let `dp[i]` be `true` when the prefix `s[0..i)` can be segmented. `dp[0] = true`.

</details>

<details><summary>Hint 3</summary>

`dp[i]` is true if some `j < i` has `dp[j]` true and `s.slice(j, i)` is a word. Put the words in a `Set` for O(1) lookups, and you only need to look back at most `maxWordLength` characters.

</details>
