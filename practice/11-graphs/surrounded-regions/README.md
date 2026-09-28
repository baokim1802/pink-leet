# Surrounded Regions

You get an `m x n` board of `"X"` and `"O"` strings. A **region** is a group of `"O"` cells connected horizontally or vertically. A region is **surrounded** if none of its cells sit on the border of the board — it's completely boxed in by `"X"`s.

Capture every surrounded region by flipping all of its `"O"`s to `"X"`. Regions that touch the border stay as they are.

Modify `board` **in place** — don't return anything.

## Examples

```
Input:  board = [["X","X","X","X"],
                 ["X","O","O","X"],
                 ["X","X","O","X"],
                 ["X","O","X","X"]]
Output: [["X","X","X","X"],
         ["X","X","X","X"],
         ["X","X","X","X"],
         ["X","O","X","X"]]
// the 3-cell region in the middle is boxed in; the "O" on the bottom edge survives
```

```
Input:  board = [["X"]]
Output: [["X"]]
```

## Constraints

- `1 <= m, n <= 200`
- `board[i][j]` is `"X"` or `"O"`.

## Hints

<details><summary>Hint 1</summary>

It's hard to tell whether a region is surrounded while you're in the middle of it. It's easy to tell which regions are **not**: exactly those that contain a border cell.

</details>

<details><summary>Hint 2</summary>

Flood-fill from every `"O"` on the border and mark what you reach as safe (e.g. temporarily change it to `"S"`).

</details>

<details><summary>Hint 3</summary>

Finally sweep the whole board once: any remaining `"O"` is surrounded → `"X"`, and every `"S"` goes back to `"O"`.

</details>
