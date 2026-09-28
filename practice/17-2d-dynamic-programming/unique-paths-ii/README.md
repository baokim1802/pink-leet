# Unique Paths II

A robot stands on the top-left cell of an `m × n` grid and wants to reach the bottom-right cell. Each step it may move only **right** or **down**.

Some cells contain obstacles: `obstacleGrid[r][c]` is `1` for an obstacle and `0` for an open cell. The robot can never step on an obstacle.

Return how many different paths lead from the top-left to the bottom-right. (If the start or the finish is blocked, the answer is `0`.)

## Examples

```
Input:  obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
Output: 2
// right, right, down, down   or   down, down, right, right
```

```
Input:  obstacleGrid = [[0,1],[0,0]]
Output: 1
```

```
Input:  obstacleGrid = [[1]]
Output: 0
```

## Constraints

- `1 <= m, n <= 100`
- `obstacleGrid[r][c]` is `0` or `1`.
- The answer fits in a 32-bit signed integer.

## Hints

<details><summary>Hint 1</summary>

Let `dp[r][c]` be the number of paths from the start to cell `(r, c)`. You can only arrive from above or from the left.

</details>

<details><summary>Hint 2</summary>

An obstacle cell has `0` paths through it, no matter what its neighbours say. Be careful with the first row and column: once an obstacle appears there, every cell after it on that edge is unreachable too.

</details>

<details><summary>Hint 3</summary>

Row `r` only needs row `r - 1`, so a single array of length `n` is enough: `row[c] = grid[r][c] ? 0 : row[c] + row[c - 1]`.

</details>
