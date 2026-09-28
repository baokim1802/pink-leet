# Valid Sudoku

You're given a partially filled `9 x 9` Sudoku board. Each cell holds a digit `"1"`–`"9"` or `"."` for an empty cell.

Decide whether the board is **valid so far**, meaning none of these rules is already broken by the filled cells:

1. No digit repeats within a **row**.
2. No digit repeats within a **column**.
3. No digit repeats within any of the nine `3 x 3` **boxes**.

You do **not** need to check whether the puzzle can actually be solved. Only the digits already placed matter.

## Examples

```
Input: board =
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: true
```

```
Input: the same board, but the top-left "5" is replaced by "8"
Output: false     // column 0 now has two 8s (and so does the top-left box)
```

## Constraints

- `board.length === 9` and `board[i].length === 9`
- `board[i][j]` is a digit `"1"`–`"9"` or `"."`.

## Hints

<details><summary>Hint 1</summary>

You need to answer "have I already seen this digit in this row / column / box?" quickly. That's a job for a `Set`.

</details>

<details><summary>Hint 2</summary>

Keep 9 row sets, 9 column sets and 9 box sets. The box index for cell `(r, c)` is `Math.floor(r / 3) * 3 + Math.floor(c / 3)`.

</details>

<details><summary>Hint 3</summary>

One pass over the grid is enough: for each filled cell, if its digit is already in its row, column or box set, return `false`; otherwise add it to all three.

</details>
