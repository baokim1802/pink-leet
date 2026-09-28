# Design Add and Search Words Data Structure

Design a word dictionary that can add words and answer searches — where the search pattern may contain **wildcards**.

Build a `WordDictionary` class:

- `new WordDictionary()` — creates an empty dictionary.
- `addWord(word)` — adds `word` to the dictionary.
- `search(pattern)` — returns `true` if any added word **matches** `pattern`, otherwise `false`. A `'.'` in the pattern matches any single letter; every other character must match exactly. The match is for the **whole** word, so the lengths must be equal.

## Examples

```
Input:
  ["WordDictionary", "addWord", "addWord", "addWord", "search", "search", "search", "search"]
  [[],               ["bad"],   ["dad"],   ["mad"],   ["pad"],  ["bad"],  [".ad"],  ["b.."]]
Output:
  [null,             null,      null,      null,      false,    true,     true,     true]
```

## Constraints

- `1 <= word.length <= 25`
- `word` in `addWord` contains only lowercase English letters.
- `pattern` in `search` contains lowercase English letters and at most 2 dots (`'.'`).
- At most `10^4` calls in total to `addWord` and `search`.

## Hints

<details><summary>Hint 1</summary>

Store the words in a trie, exactly like [Implement Trie](#/practice/13-tries/implement-trie-prefix-tree). Adding a word doesn't change at all.

</details>

<details><summary>Hint 2</summary>

Searching a plain letter is a normal step down to one child. But a `'.'` could be *any* child — so you have to try them all. That's a DFS: `dfs(node, i)` = "can `pattern[i..]` be matched starting at `node`?"

</details>

<details><summary>Hint 3</summary>

In `dfs`: if `i === pattern.length`, return `node.isEnd`. If `pattern[i]` is `'.'`, return `true` if **any** child succeeds with `i + 1`. Otherwise follow the one matching child (or return `false` if it's missing).

</details>
