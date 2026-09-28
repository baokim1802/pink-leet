# Word Search II

You're given an `m x n` grid of letters `board` and a list of distinct strings `words`. Return every word from `words` that can be traced on the board.

The rules for tracing are the same as in [Word Search](#/practice/10-backtracking/word-search): start on any cell, step to horizontally or vertically adjacent cells, read one letter per cell, and never use the same cell twice within one word.

Return each found word once, in any order.

## Examples

```
Input:  board = [["o","a","a","n"],
                 ["e","t","a","e"],
                 ["i","h","k","r"],
                 ["i","f","l","v"]]
        words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]
```

```
Input:  board = [["a","b"],
                 ["c","d"]]
        words = ["abcb"]
Output: []
```

## Constraints

- `1 <= m, n <= 12`
- `board[i][j]` is a lowercase English letter.
- `1 <= words.length <= 3 * 10^4`
- `1 <= words[i].length <= 10`
- `words[i]` consists of lowercase English letters, and all strings in `words` are unique.

## Hints

<details><summary>Hint 1</summary>

Running Word Search once per word repeats a lot of work: `"oath"` and `"oat"` would walk the same cells twice. What if you searched for **all** words at the same time?

</details>

<details><summary>Hint 2</summary>

Put every word into a trie. Then DFS from each cell while walking down the trie in lockstep: step onto a neighbor only if the current trie node has a child for that neighbor's letter. The moment there's no child, that whole branch is dead — no word continues that way.

</details>

<details><summary>Hint 3</summary>

Store the complete word on its end node (`node.word = "oath"`). When the DFS reaches a node with a `word`, add it to the answer and set `node.word = null` so it isn't reported twice. Mark visited cells in place (e.g. `'#'`) and restore them on the way back.

</details>
