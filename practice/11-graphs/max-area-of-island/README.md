# Max Area of Island

You get an `m x n` grid of numbers where `1` is land and `0` is water. An island is a group of `1`s connected **horizontally or vertically**. The area of an island is how many cells it has.

Return the area of the **largest** island, or `0` if there's no land at all.

## Examples

```
Input: grid = [
  [0,0,1,0,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,1,1,0,1,0,0,0,0,0,0,0,0],
  [0,1,0,0,1,1,0,0,1,0,1,0,0],
  [0,1,0,0,1,1,0,0,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,1,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,1,1,0,0,0,0]
]
Output: 6
// the island on the right side of rows 3–5 has 6 cells
// (the cells that only touch diagonally don't count as connected)
```

```
Input:  grid = [[0,0,0,0,0,0,0,0]]
Output: 0
```

## Constraints

- `1 <= m, n <= 50`
- `grid[i][j]` is `0` or `1`.

## Hints

<details><summary>Hint 1</summary>

This is Number of Islands with one twist: instead of just counting islands, measure each one while you flood it.

</details>

<details><summary>Hint 2</summary>

Make your DFS/BFS return (or accumulate) how many cells it sank. Keep a running maximum across all islands.

</details>

<details><summary>Hint 3</summary>

Mark land as visited the moment you push it (set it to `0`), not when you pop it — otherwise the same cell can be counted twice.

</details>
