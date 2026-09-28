# Rotting Oranges

You have an `m × n` grid where each cell is one of:

- `0` — empty
- `1` — a fresh orange
- `2` — a rotten orange

Every minute, each rotten orange rots every fresh orange directly **above, below, left, or right** of it.

Return the minimum number of minutes until no fresh orange is left. If some fresh orange can never rot, return `-1`.

## Examples

```
Input:  grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4
```

```
Input:  grid = [[2,1,1],[0,1,1],[1,0,1]]
Output: -1
// the orange in the bottom-left corner is walled off by empty cells
```

```
Input:  grid = [[0,2]]
Output: 0
// there are no fresh oranges to begin with
```

## Constraints

- `1 <= m, n <= 10`
- `grid[i][j]` is `0`, `1`, or `2`.

## Hints

<details><summary>Hint 1</summary>

"Minutes until everything is reached" is a **shortest distance** question in an unweighted grid — that's BFS.

</details>

<details><summary>Hint 2</summary>

There may be several rotten oranges at the start, and they all spread at the same time. Put **all** of them in the queue before you begin (multi-source BFS).

</details>

<details><summary>Hint 3</summary>

Count the fresh oranges up front and decrement as they rot. Process the queue level by level, adding a minute per level that rots something. At the end, if any fresh remain, return `-1`.

</details>
