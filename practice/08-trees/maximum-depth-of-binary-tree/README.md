# Maximum Depth of Binary Tree

Given the `root` of a binary tree, return its **maximum depth**: the number of nodes on the longest path from the root down to a leaf. An empty tree has depth `0`; a lone root has depth `1`.

Trees are written in LeetCode's level-order format, where `null` marks a missing child.

## Examples

```
Input:  root = [3,9,20,null,null,15,7]
Output: 3

        3
       / \
      9   20
         /  \
        15   7
```

```
Input:  root = [1,null,2]
Output: 2
```

## Constraints

- The tree has between `0` and `10^4` nodes.
- `-100 <= Node.val <= 100`

## Hints

<details><summary>Hint 1</summary>

Trust the recursion: if you already knew the depth of the left subtree and the right subtree, what's the depth of the whole tree?

</details>

<details><summary>Hint 2</summary>

`depth(node) = 1 + max(depth(left), depth(right))`, and `depth(null) = 0`. That's the whole solution.

</details>

<details><summary>Hint 3</summary>

Alternative: BFS level by level and count how many levels you process.

</details>
