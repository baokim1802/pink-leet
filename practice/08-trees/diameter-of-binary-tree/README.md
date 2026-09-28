# Diameter of Binary Tree

Given the `root` of a binary tree, return its **diameter**: the number of **edges** on the longest path between any two nodes.

The path may or may not go through the root.

## Examples

```
Input:  root = [1,2,3,4,5]
Output: 3             // 4 -> 2 -> 1 -> 3 (or 5 -> 2 -> 1 -> 3)
```

```
Input:  root = [1,2]
Output: 1
```

```
Input:  root = [1,2,null,3,4,5,null,null,6,7,null,null,8]
Output: 6             // 7 -> 5 -> 3 -> 2 -> 4 -> 6 -> 8, which skips the root entirely
```

## Constraints

- The tree has between `1` and `10^4` nodes.
- `-100 <= Node.val <= 100`

## Hints

<details><summary>Hint 1</summary>

Every path has one "highest" node where it bends. At that node, the path goes down the left side as far as possible and down the right side as far as possible.

</details>

<details><summary>Hint 2</summary>

So if you know the **height** (longest downward edge count) of each node's left and right subtrees, the longest path bending at that node is `leftHeight + rightHeight`.

</details>

<details><summary>Hint 3</summary>

Write one DFS that returns a node's height, and while it's at it, updates an outer `best` variable with `left + right`. One pass, O(n).

</details>
