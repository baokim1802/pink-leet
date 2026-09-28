# Copy List with Random Pointer

Each node of this linked list has the usual `val` and `next`, plus an extra pointer `random` that can point to **any** node in the list, or be `null`.

Return a **deep copy** of the list: a brand-new set of nodes, one per original node, with the same values, where each copy's `next` and `random` point to the corresponding **copies** — never to nodes of the original list.

In the examples, a list is written as `[[val, randomIndex], ...]`, where `randomIndex` is the position (0-based) of the node that `random` points to, or `null`. Your function receives the real head node and must return the head of the copy (the tests do the translating).

## Examples

```
Input:  head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]
        // same shape, but made of new nodes
```

```
Input:  head = [[1,1],[2,1]]
Output: [[1,1],[2,1]]     // both randoms point at the second node
```

```
Input:  head = []
Output: []
```

## Constraints

- The list has between `0` and `1000` nodes.
- `-10^4 <= Node.val <= 10^4`
- `random` is `null` or points to a node in the list.
- Nodes look like `{ val, next, random }`; the stub includes a small `Node` class you can use.

## Hints

<details><summary>Hint 1</summary>

The tricky part is `random`: when you copy node A, the node its `random` points to may not have been copied yet. So do it in **two passes**.

</details>

<details><summary>Hint 2</summary>

Pass 1: walk the list and create a copy of every node, storing `original -> copy` in a `Map` (node objects work fine as `Map` keys). Pass 2: for each original node, set `copy.next = map.get(orig.next)` and `copy.random = map.get(orig.random)`.

</details>

<details><summary>Hint 3</summary>

Watch out for `null`: `map.get(null)` is `undefined`, not `null`. Either put `null -> null` in the map, or use `?? null`.

</details>
