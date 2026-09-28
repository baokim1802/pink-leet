# Lowest Common Ancestor of a Binary Search Tree

You're given the `root` of a **binary search tree** and two of its nodes, `p` and `q`. Return their **lowest common ancestor** (LCA): the deepest node that has both `p` and `q` in its subtree.

A node counts as a descendant of itself, so if `p` sits above `q`, the answer is `p`.

`p` and `q` are actual node objects from the tree (not just values). Return the LCA **node**.

## Examples

```
Input:  root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
Output: 6             // 2 is on the left, 8 on the right: they split at the root
```

```
Input:  root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
Output: 2             // 4 is inside 2's subtree, and 2 is its own descendant
```

```
Input:  root = [2,1], p = 2, q = 1
Output: 2
```

(The tests print the value of the node you return.)

## Constraints

- The tree has between `2` and `10^5` nodes.
- `-10^9 <= Node.val <= 10^9`
- All values are **unique**, and the tree is a valid BST.
- `p !== q`, and both exist in the tree.

## Hints

<details><summary>Hint 1</summary>

You don't need to search the whole tree. Use the BST ordering: compare `p.val` and `q.val` with the current node's value.

</details>

<details><summary>Hint 2</summary>

If both values are smaller than the current node, the LCA must be somewhere on the left. If both are bigger, it's on the right.

</details>

<details><summary>Hint 3</summary>

The first node where they *don't* both go the same way (one goes left and one right, or one of them *is* the current node) is the answer. A simple `while` loop does it in O(h) time and O(1) space.

</details>
