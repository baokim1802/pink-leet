# Binary Tree Right Side View

Picture yourself standing to the **right** of a binary tree, looking at it. Given its `root`, return the values of the nodes you can see, **from top to bottom**.

In other words: for each level of the tree, report the **rightmost** node.

## Examples

```
Input:  root = [1,2,3,null,5,null,4]
Output: [1,3,4]
```

```
Input:  root = [1,2,3,4]
Output: [1,3,4]       // on level 3 the only node is 4, and it's on the far left, but nothing blocks it
```

```
Input:  root = []
Output: []
```

## Constraints

- The tree has between `0` and `100` nodes.
- `-100 <= Node.val <= 100`

## Hints

<details><summary>Hint 1</summary>

"Rightmost node of each level" — which traversal naturally processes a tree one level at a time?

</details>

<details><summary>Hint 2</summary>

Do a BFS, level by level (record `queue.length` before processing a level). The last node you pop in each level is the one you see.

</details>

<details><summary>Hint 3</summary>

DFS works too: visit right before left and carry the depth. The first time you reach a new depth (`depth === result.length`), that node is visible.

</details>
