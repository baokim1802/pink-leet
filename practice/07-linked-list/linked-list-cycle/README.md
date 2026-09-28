# Linked List Cycle

Given the `head` of a linked list, return `true` if the list contains a **cycle** — that is, if following `next` pointers from some node eventually brings you back to that same node. Otherwise return `false`.

In the examples below, `pos` is the index of the node that the tail links back to (`-1` means no cycle). `pos` is only used to build the test input — your function receives just `head`.

## Examples

```
Input:  head = [3,2,0,-4], pos = 1
Output: true          // -4 points back to the node with value 2
```

```
Input:  head = [1,2], pos = 0
Output: true          // 2 points back to 1
```

```
Input:  head = [1], pos = -1
Output: false
```

## Constraints

- The list has between `0` and `10^4` nodes.
- `-10^5 <= Node.val <= 10^5`
- `pos` is `-1` or a valid index in the list.

**Follow-up:** can you solve it with `O(1)` extra memory?

## Hints

<details><summary>Hint 1</summary>

The easy way: remember every node you've visited in a `Set` (store the node objects, not their values — values can repeat!). If you ever see a node twice, there's a cycle.

</details>

<details><summary>Hint 2</summary>

For `O(1)` memory: send two runners down the list, one moving one step at a time and one moving two steps. If there's no cycle, the fast one hits `null`. If there is one...

</details>

<details><summary>Hint 3</summary>

...the fast runner laps the slow one inside the loop, and they land on the **same node**. Compare nodes with `===`.

</details>
