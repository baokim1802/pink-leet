# Pacific Atlantic Water Flow

An `m x n` island is described by `heights`, where `heights[r][c]` is the height of that cell. The **Pacific Ocean** touches the island's top and left edges; the **Atlantic Ocean** touches its bottom and right edges.

When it rains, water flows from a cell to a neighbor (up, down, left, right) if the neighbor's height is **less than or equal to** the current cell's. Water on an edge cell can flow straight into the ocean next to it.

Return every cell `[r, c]` from which rain water can reach **both** oceans. The cells may be in any order.

## Examples

```
Input:  heights = [[1,2,2,3,5],
                   [3,2,3,4,4],
                   [2,4,5,3,1],
                   [6,7,1,4,5],
                   [5,1,1,2,4]]
Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
// e.g. from [2,2] (height 5) water can go up/left to the Pacific
// and down/right to the Atlantic
```

```
Input:  heights = [[1]]
Output: [[0,0]]
// a single cell touches both oceans
```

## Constraints

- `1 <= m, n <= 200`
- `0 <= heights[r][c] <= 10^5`

## Hints

<details><summary>Hint 1</summary>

Simulating water from every cell separately repeats a lot of work. Reverse it: start **at the ocean** and walk *uphill* (to neighbors with height `>=` the current one). Every cell you reach can drain into that ocean.

</details>

<details><summary>Hint 2</summary>

Do that twice: one multi-source search seeded with the Pacific edge cells (top row + left column), one seeded with the Atlantic edge cells (bottom row + right column). Keep a separate visited grid for each.

</details>

<details><summary>Hint 3</summary>

The answer is every cell marked in **both** visited grids.

</details>
