# Binary Tree Maximum Path Sum

A **path** in a binary tree is a sequence of nodes where each consecutive pair is connected by an edge, and no node appears twice. A path has at least one node, and it doesn't have to pass through the root.

The **path sum** is the total of the values on the path. Given the `root` of a binary tree, return the **largest** path sum of any path.

## Examples

```
Input:  root = [1,2,3]
Output: 6             // 2 -> 1 -> 3
```

```
Input:  root = [-10,9,20,null,null,15,7]
Output: 42            // 15 -> 20 -> 7, skipping the negative root
```

```
Input:  root = [-2,-1]
Output: -1            // every value is negative, so take the single best node
```

## Constraints

- The tree has between `1` and `3 * 10^4` nodes.
- `-1000 <= Node.val <= 1000`

## Hints

<details><summary>Hint 1</summary>

Like the diameter problem: every path has one highest node where it "bends". At that node, the path can use some downward chain from the left child and some downward chain from the right child.

</details>

<details><summary>Hint 2</summary>

Let `gain(node)` be the best sum of a path that **starts at `node` and goes straight down** (one direction only). Then the best path bending at `node` is `node.val + max(0, gain(left)) + max(0, gain(right))` — drop a side if it would only hurt.

</details>

<details><summary>Hint 3</summary>

In one post-order DFS, update a global `best` with that bending sum, but **return** only `node.val + max(0, gain(left), gain(right))` to the parent — a parent can extend just one of the two branches. Start `best` at `-Infinity`, not `0`, so all-negative trees work.

</details>
