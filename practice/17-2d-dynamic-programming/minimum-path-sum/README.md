# Minimum Path Sum

You get an `m × n` grid of non-negative numbers. Walk from the top-left cell to the bottom-right cell, moving only **right** or **down** at each step.

The cost of a walk is the sum of every cell you stand on (including the first and last). Return the smallest possible cost.

## Examples

```
Input:  grid = [[1,3,1],[1,5,1],[4,2,1]]
Output: 7
// 1 → 3 → 1 → 1 → 1
```

```
Input:  grid = [[1,2,3],[4,5,6]]
Output: 12
// 1 → 2 → 3 → 6
```

```
Input:  grid = [[5]]
Output: 5
```

## Constraints

- `1 <= m, n <= 200`
- `0 <= grid[r][c] <= 200`

## Hints

<details><summary>Hint 1</summary>

Greedily stepping to the cheaper neighbour doesn't work — a cheap step now can lead into an expensive region. Think about the best cost to *reach* each cell instead.

</details>

<details><summary>Hint 2</summary>

`dp[r][c] = grid[r][c] + min(dp[r-1][c], dp[r][c-1])`. The first row and first column only have one way in.

</details>

<details><summary>Hint 3</summary>

Keep one row of length `n`. Treat "outside the grid" as `Infinity` so the edges need no special case (except the very first cell).

</details>
