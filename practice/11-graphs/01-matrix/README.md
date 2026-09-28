# 01 Matrix

You get an `m x n` matrix `mat` of `0`s and `1`s. For every cell, find the distance to its **nearest `0`**, where one step moves up, down, left, or right to a neighboring cell.

Return a matrix of the same size holding those distances (cells that are `0` have distance `0`).

## Examples

```
Input:  mat = [[0,0,0],[0,1,0],[0,0,0]]
Output: [[0,0,0],[0,1,0],[0,0,0]]
```

```
Input:  mat = [[0,0,0],[0,1,0],[1,1,1]]
Output: [[0,0,0],[0,1,0],[1,2,1]]
// the bottom-middle 1 needs two steps to reach a 0
```

## Constraints

- `1 <= m, n`, `m * n <= 10^4`
- `mat[i][j]` is `0` or `1`
- There is at least one `0` in `mat`.

## Hints

<details><summary>Hint 1</summary>

Running a separate BFS from every `1` to find its nearest `0` is correct but slow — O((m·n)²) in the worst case. Flip the question around.

</details>

<details><summary>Hint 2</summary>

Multi-source BFS: put **every `0`** in the queue at once with distance 0. BFS expands outward from all of them simultaneously, so the first time it reaches a cell is via its nearest `0`.

</details>

<details><summary>Hint 3</summary>

Initialize the answer with `0` for zeros and `-1` (or `Infinity`) for ones. A neighbor still at `-1` is unvisited: set it to `dist[current] + 1` and enqueue it.

</details>
