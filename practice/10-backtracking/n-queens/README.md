# N-Queens

Place `n` chess queens on an `n x n` board so that **no two queens attack each other** — no two share a row, a column, or a diagonal.

Return every distinct arrangement. Each arrangement is a list of `n` strings, one per row from top to bottom, where `'Q'` marks a queen and `'.'` marks an empty square. You may return the arrangements in any order (but the rows inside a board are, of course, top to bottom).

## Examples

```
Input:  n = 4
Output: [[".Q..",
          "...Q",
          "Q...",
          "..Q."],
         ["..Q.",
          "Q...",
          "...Q",
          ".Q.."]]
```

```
Input:  n = 1
Output: [["Q"]]
```

```
Input:  n = 3
Output: []
// no way to place 3 queens safely on a 3x3 board
```

## Constraints

- `1 <= n <= 9`

## Hints

<details><summary>Hint 1</summary>

Every row must hold exactly one queen. So go row by row: at row `r`, choose which column the queen goes in, then recurse to row `r + 1`.

</details>

<details><summary>Hint 2</summary>

A square `(r, c)` is attacked if its column is taken, or its "`r - c`" diagonal is taken, or its "`r + c`" anti-diagonal is taken. All squares on the same diagonal share the same `r - c`; all squares on the same anti-diagonal share the same `r + c`.

</details>

<details><summary>Hint 3</summary>

Keep three `Set`s (columns, diagonals, anti-diagonals). Add to all three when you place a queen and delete from all three when you remove it. Store the queen's column per row in an array, and only build the `'.'`/`'Q'` strings when a board is complete.

</details>
