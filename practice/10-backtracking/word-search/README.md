# Word Search

You're given an `m x n` grid of letters `board` and a string `word`. Return `true` if `word` can be traced through the grid, and `false` otherwise.

A word is traced by starting on any cell and moving step by step to a **horizontally or vertically adjacent** cell (no diagonals), reading one letter per cell. The same cell may **not** be used more than once in a single word.

## Examples

```
Input:  board = [["A","B","C","E"],
                 ["S","F","C","S"],
                 ["A","D","E","E"]], word = "ABCCED"
Output: true
// A(0,0) → B(0,1) → C(0,2) → C(1,2) → E(2,2) → D(2,1)
```

```
Input:  same board, word = "SEE"
Output: true
```

```
Input:  same board, word = "ABCB"
Output: false
// you'd have to step back onto the B you already used
```

## Constraints

- `1 <= m, n <= 6`
- `1 <= word.length <= 15`
- `board` and `word` contain only English letters (upper- and lowercase).

**Follow-up:** can you prune the search so it stays fast on a board like a 6x6 grid of `"A"` with `word = "AAAAAAAAAAAAAAB"`?

## Hints

<details><summary>Hint 1</summary>

Try every cell as a starting point. From a start, write a recursive `dfs(r, c, i)` that answers: "can I match `word[i..]` starting at cell `(r, c)`?"

</details>

<details><summary>Hint 2</summary>

Inside `dfs`: fail if `(r, c)` is off the board or `board[r][c] !== word[i]`. Succeed if `i` is the last index. Otherwise try the four neighbors with `i + 1`.

</details>

<details><summary>Hint 3</summary>

To avoid reusing a cell, temporarily overwrite it (e.g. with `'#'`) before exploring the neighbors, and restore it afterwards — that's choose → explore → unchoose on the grid itself. For the follow-up: if the board doesn't contain enough copies of some letter, you can return `false` without searching at all.

</details>
