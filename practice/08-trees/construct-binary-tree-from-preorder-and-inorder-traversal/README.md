# Construct Binary Tree from Preorder and Inorder Traversal

You get two arrays describing the same binary tree:

- `preorder` — its values in **pre-order** (node, left, right),
- `inorder` — its values in **in-order** (left, node, right).

All values are unique. Rebuild the tree and return its `root`.

## Examples

```
Input:  preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]
```

```
Input:  preorder = [1,2], inorder = [1,2]
Output: [1,null,2]    // 1 comes first in in-order, so nothing is on its left
```

```
Input:  preorder = [-1], inorder = [-1]
Output: [-1]
```

(The tests turn your tree back into a level-order array.)

## Constraints

- `1 <= preorder.length <= 3000`, and `inorder.length === preorder.length`
- `-3000 <= value <= 3000`
- All values are **unique**, and both arrays describe the same valid tree.

## Hints

<details><summary>Hint 1</summary>

The first value of `preorder` is always the root. Where does that value sit in `inorder`?

</details>

<details><summary>Hint 2</summary>

Everything to the left of the root in `inorder` belongs to the left subtree, everything to the right to the right subtree. If the left part has `L` values, the next `L` values of `preorder` are the left subtree's pre-order.

</details>

<details><summary>Hint 3</summary>

Recurse on index ranges instead of slicing arrays, and precompute a `Map` from value to its index in `inorder` so each lookup is O(1). That gives O(n) overall.

</details>
