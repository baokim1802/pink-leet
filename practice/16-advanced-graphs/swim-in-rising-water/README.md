# Swim in Rising Water

You're given an `n x n` grid where `grid[r][c]` is the elevation of cell `(r, c)`. Every elevation from `0` to `n² - 1` appears **exactly once**.

Rain starts falling, and at time `t` the water is at depth `t` everywhere. You can swim from a cell to a 4-directionally adjacent cell only if **both** elevations are at most `t`. Swimming itself takes no time.

Starting at `(0, 0)`, return the **earliest time** at which you can reach `(n - 1, n - 1)`.

## Examples

```
Input:  grid = [[0,2],
                [1,3]]
Output: 3
// you can't leave (0,0) until t = 1, and the goal has elevation 3,
// so it's reachable only once t = 3
```

```
Input:  grid = [[ 0, 1, 2, 3, 4],
                [24,23,22,21, 5],
                [12,13,14,15,16],
                [11,17,18,19,20],
                [10, 9, 8, 7, 6]]
Output: 16
// follow the outer ring 0 → 1 → ... → 5, then snake through 16
```

## Constraints

- `n === grid.length === grid[i].length`
- `1 <= n <= 50`
- `0 <= grid[r][c] < n²`, all values distinct

## Hints

<details><summary>Hint 1</summary>

The time needed for a route is the **highest elevation** on it (including start and end). You want the route whose highest cell is as low as possible.

</details>

<details><summary>Hint 2</summary>

That's a "minimize the max along a path" problem — Dijkstra with `max` instead of `+`. Pop the lowest-cost cell from a min-heap, where cost = the max elevation seen so far.

</details>

<details><summary>Hint 3</summary>

Alternatives: binary search on `t` with a flood fill, or union-find — add cells in increasing elevation order and stop the moment `(0,0)` and `(n-1,n-1)` share a root.

</details>
