# Clone Graph

You're handed a reference to one node of a **connected, undirected** graph. Each node has a `val` (a number) and a list `neighbors` of the nodes it's linked to:

```js
class Node {
  constructor(val, neighbors) {
    this.val = val;
    this.neighbors = neighbors; // Node[]
  }
}
```

Return a **deep copy** of the whole graph: brand-new nodes with the same values, linked to each other in exactly the same way (same neighbor order). No node of your copy may be a node of the original. If the input is `null` (empty graph), return `null`.

In the tests, a graph is written as an adjacency list: node values are `1..n`, entry `i` lists the neighbor values of the node with value `i + 1`, and you're given the node with value `1`.

## Examples

```
Input:  adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]
// a square: 1-2, 2-3, 3-4, 4-1. Your copy must have the same shape
// but be made of completely new nodes.
```

```
Input:  adjList = [[]]
Output: [[]]
// one node, no neighbors
```

```
Input:  adjList = []
Output: null
// empty graph: node is null
```

## Constraints

- The graph has between `0` and `100` nodes.
- Node values are unique, `1 <= Node.val <= 100`.
- No repeated edges, no self-loops, and the graph is connected.

## Hints

<details><summary>Hint 1</summary>

A graph can have cycles, so a naive recursive copy (copy me, then copy each neighbor…) loops forever. You need to remember which nodes you've already copied.

</details>

<details><summary>Hint 2</summary>

Keep a `Map` from original node → its copy. Before copying a node, check the map; if it's there, reuse that copy. Put the copy into the map *before* you recurse into neighbors.

</details>

<details><summary>Hint 3</summary>

BFS version: copy the start node, queue it, then for each dequeued original, for each neighbor, create its copy if missing (and queue the neighbor), and push the neighbor's copy onto the current copy's `neighbors`.

</details>
