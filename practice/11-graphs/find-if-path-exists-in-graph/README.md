# Find if Path Exists in Graph

There's an **undirected** graph with `n` vertices labeled `0` to `n - 1`. The list `edges` describes it: `edges[i] = [u, v]` is a two-way edge between `u` and `v`. There are no self-loops and no repeated edges.

Return `true` if you can walk from vertex `source` to vertex `destination` along edges, otherwise `false`.

## Examples

```
Input:  n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2
Output: true
// 0 -> 2 directly, or 0 -> 1 -> 2
```

```
Input:  n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5
Output: false
// {0,1,2} and {3,4,5} are separate pieces
```

## Constraints

- `1 <= n <= 2 * 10^5`
- `0 <= edges.length <= 2 * 10^5`
- `edges[i].length === 2`, `0 <= u, v < n`, `u !== v`
- `0 <= source, destination < n`

## Hints

<details><summary>Hint 1</summary>

You get an edge list, but traversals want an **adjacency list**. Build `graph[u]` = all neighbors of `u` — and since edges are undirected, add each edge in both directions.

</details>

<details><summary>Hint 2</summary>

BFS or DFS from `source` with a `visited` array. If you ever reach `destination`, you're done. What if `source === destination`?

</details>

<details><summary>Hint 3</summary>

Alternative: union-find. Union the endpoints of every edge, then ask whether `source` and `destination` have the same root.

</details>
