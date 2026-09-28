# Balanced Binary Tree

Given the `root` of a binary tree, return `true` if it is **height-balanced**.

A tree is height-balanced when, at **every** node, the heights of the left and right subtrees differ by at most `1`. An empty tree is balanced.

## Examples

```
Input:  root = [3,9,20,null,null,15,7]
Output: true
```

```
Input:  root = [1,2,2,3,3,null,null,4,4]
Output: false         // the left side is 3 levels deep, the right side only 1
```

```
Input:  root = [1,2,2,3,null,null,3,4,null,null,4]
Output: false         // the root looks fine (3 vs 3), but each 2 has a lopsided subtree
```

## Constraints

- The tree has between `0` and `5000` nodes.
- `-10^4 <= Node.val <= 10^4`

## Hints

<details><summary>Hint 1</summary>

The condition must hold at every node, not just at the root — look at the third example.

</details>

<details><summary>Hint 2</summary>

A simple approach computes the height of both children at every node and recurses — but that recomputes heights over and over (O(n²) on a chain). Can you get each height only once?

</details>

<details><summary>Hint 3</summary>

Do a single post-order DFS that returns the height of a subtree, or a sentinel like `-1` meaning "already unbalanced". As soon as a child reports `-1`, or the two heights differ by more than 1, pass `-1` up.

</details>
