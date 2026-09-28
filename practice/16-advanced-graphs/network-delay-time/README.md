# Network Delay Time

A network has `n` nodes labeled `1` to `n`. You're given `times`, a list of **directed**, weighted edges: `times[i] = [u, v, w]` means a signal sent from `u` reaches `v` after `w` time units.

A signal is sent from node `k`. Return the time it takes for **all** `n` nodes to receive it. If some node can never receive it, return `-1`.

## Examples

```
Input:  times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
Output: 2
// 1 and 3 hear it at time 1, node 4 hears it at time 2
```

```
Input:  times = [[1,2,1]], n = 2, k = 1
Output: 1
```

```
Input:  times = [[1,2,1]], n = 2, k = 2
Output: -1
// edges are one-way: node 1 is unreachable from node 2
```

## Constraints

- `1 <= k <= n <= 100`
- `1 <= times.length <= 6000`
- `1 <= u, v <= n`, `u !== v`
- `0 <= w <= 100`
- No two edges share the same `(u, v)` pair.

## Hints

<details><summary>Hint 1</summary>

Every node receives the signal at its **shortest-path distance** from `k`. The answer is the largest of those distances.

</details>

<details><summary>Hint 2</summary>

Edge weights are non-negative, so this is textbook **Dijkstra**: repeatedly settle the unvisited node with the smallest tentative distance. JavaScript has no built-in heap — write a small one.

</details>

<details><summary>Hint 3</summary>

Push `[distance, node]` pairs. When you pop a node that's already settled, skip it (it's a stale entry). If fewer than `n` nodes get settled, return `-1`.

</details>
