# Redundant Connection

A **tree** is a connected, undirected graph with no cycles. Someone took a tree with `n` nodes (labeled `1` to `n`) and added **one extra edge** between two different nodes that weren't already directly connected.

You get the resulting graph as `edges`, where `edges[i] = [a, b]` is an undirected edge. Return an edge that can be removed so the remaining graph is a tree again. If several edges would work, return the one that appears **last** in `edges`.

## Examples

```
Input:  edges = [[1,2],[1,3],[2,3]]
Output: [2,3]
// removing any of the three edges breaks the triangle; [2,3] is listed last
```

```
Input:  edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
Output: [1,4]
// the cycle is 1-2-3-4-1; of its edges, [1,4] comes last
```

## Constraints

- `n === edges.length`
- `3 <= n <= 1000`
- `edges[i].length === 2`, `1 <= a < b <= n`
- No repeated edges; the graph is connected.

## Hints

<details><summary>Hint 1</summary>

Add the edges one at a time. The first edge that connects two nodes which are **already connected** is the one that closes the cycle.

</details>

<details><summary>Hint 2</summary>

"Are these two already connected?" while edges keep arriving is exactly what **union-find** answers in nearly `O(1)`.

</details>

<details><summary>Hint 3</summary>

Why is the first such edge also the *last* cycle edge in the input? All the other cycle edges were added before it — that's how both its endpoints got connected.

</details>
