# Implement Trie (Prefix Tree)

A **trie** (say "try", short for re*trie*val) is a tree that stores strings one character per edge, so words that share a prefix share a path from the root. It's the data structure behind autocomplete and spell-checkers.

Build a `Trie` class with these methods:

- `new Trie()` — creates an empty trie.
- `insert(word)` — adds the string `word` to the trie.
- `search(word)` — returns `true` if `word` was inserted before (as a **whole** word), otherwise `false`.
- `startsWith(prefix)` — returns `true` if some previously inserted word starts with `prefix`, otherwise `false`.

## Examples

```
Input:
  ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
  [[],     ["apple"], ["apple"], ["app"], ["app"],      ["app"],  ["app"]]
Output:
  [null,   null,      true,      false,   true,         null,     true]

// "app" is only a prefix of "apple" until we insert "app" itself.
```

## Constraints

- `1 <= word.length, prefix.length <= 2000`
- `word` and `prefix` contain only lowercase English letters.
- At most `3 * 10^4` calls in total to `insert`, `search`, and `startsWith`.

## Hints

<details><summary>Hint 1</summary>

Each node needs two things: a way to find its child for a given character (an object or a `Map`), and a flag saying "a word ends here".

</details>

<details><summary>Hint 2</summary>

`insert` walks down from the root one character at a time, creating any missing child, and sets the end flag on the last node.

</details>

<details><summary>Hint 3</summary>

`search` and `startsWith` do the same walk without creating anything — if a child is missing, return `false`. The only difference is at the end: `search` needs the end flag to be set, `startsWith` doesn't. A shared helper that returns the final node (or `null`) keeps both one-liners.

</details>
