# Path With Minimum Effort

You're a hiker on a `rows x columns` grid of `heights`. You start at the top-left cell `(0, 0)` and want to reach the bottom-right cell `(rows - 1, columns - 1)`, moving **up, down, left, or right**.

The **effort** of a route is the **largest absolute height difference** between two consecutive cells on it. Return the minimum effort needed to reach the destination.

## Examples

```
Input:  heights = [[1,2,2],
                   [3,8,2],
                   [5,3,5]]
Output: 2
// route 1 → 3 → 5 → 3 → 5 has max step |3-5| = 2
```

```
Input:  heights = [[1,2,3],
                   [3,8,4],
                   [5,3,5]]
Output: 1
// route 1 → 2 → 3 → 4 → 5 never climbs more than 1
```

## Constraints

- `rows === heights.length`, `columns === heights[i].length`
- `1 <= rows, columns <= 100`
- `1 <= heights[i][j] <= 10^6`

## Hints

<details><summary>Hint 1</summary>

This is a shortest-path problem where a path's "length" is the **max** edge on it instead of the sum. Does Dijkstra still work if you combine with `max` instead of `+`?

</details>

<details><summary>Hint 2</summary>

Yes — extending a path can never make its effort smaller, which is the property Dijkstra needs. Store `effort[r][c]` = best known effort to reach that cell, and pop the cell with the smallest effort from a min-heap.

</details>

<details><summary>Hint 3</summary>

Alternative: binary search on the answer `E` and BFS using only steps with difference `<= E`. Or sort all edges and union cells (Kruskal-style) until start and end connect.

</details>
