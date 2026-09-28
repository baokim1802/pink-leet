# Invert Binary Tree

Given the `root` of a binary tree, **mirror** it: every node's left and right children swap places, all the way down. Return the root.

## Examples

```
Input:  root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]

        4                4
      /   \            /   \
     2     7    ->    7     2
    / \   / \        / \   / \
   1   3 6   9      9   6 3   1
```

```
Input:  root = [2,1,3]
Output: [2,3,1]
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

Mirroring the whole tree = swap the root's two children, then mirror each of those subtrees.

</details>

<details><summary>Hint 2</summary>

Base case: an empty tree mirrored is still empty. Don't forget to `return root` at the end.

</details>

<details><summary>Hint 3</summary>

JS destructuring makes the swap a one-liner: `[a, b] = [b, a]`.

</details>
