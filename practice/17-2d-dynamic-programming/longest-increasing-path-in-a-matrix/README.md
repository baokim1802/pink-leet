# Longest Increasing Path in a Matrix

You get an `m × n` matrix of integers. From any cell you may step to one of its four neighbours (up, down, left, right) — no diagonals, no leaving the grid.

Return the length (number of cells) of the longest path whose values are **strictly increasing** at every step. The path may start anywhere.

## Examples

```
Input:  matrix = [[9,9,4],
                  [6,6,8],
                  [2,1,1]]
Output: 4
// 1 → 2 → 6 → 9
```

```
Input:  matrix = [[3,4,5],
                  [3,2,6],
                  [2,2,1]]
Output: 4
// 3 → 4 → 5 → 6
```

```
Input:  matrix = [[1]]
Output: 1
```

## Constraints

- `1 <= m, n <= 200`
- `0 <= matrix[r][c] <= 2^31 - 1`

## Hints

<details><summary>Hint 1</summary>

Moves go in all four directions, so there's no simple row-by-row fill order. But because values must strictly increase, a path can never loop back on itself — the "longer path from here" relation has no cycles.

</details>

<details><summary>Hint 2</summary>

Let `best(r, c)` be the longest increasing path that **starts** at `(r, c)`. It's `1 + max(best(neighbour))` over neighbours with a bigger value (or just `1`). Compute it with DFS and cache it in a 2D memo.

</details>

<details><summary>Hint 3</summary>

With the memo, every cell is solved once and looks at 4 neighbours: `O(m · n)` total. You don't need a `visited` set — strictly increasing already prevents revisiting. The answer is the max of `best` over all cells.

</details>
