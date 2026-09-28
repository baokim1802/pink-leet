# Validate Binary Search Tree

Given the `root` of a binary tree, decide whether it is a **valid binary search tree**:

- every value in a node's **left subtree** is strictly **less** than the node's value,
- every value in its **right subtree** is strictly **greater**,
- and both subtrees are themselves valid BSTs.

Note: that's *every* value in the subtree, not just the immediate child.

## Examples

```
Input:  root = [2,1,3]
Output: true
```

```
Input:  root = [5,1,4,null,null,3,6]
Output: false         // 4 is in 5's right subtree but 4 < 5
```

```
Input:  root = [5,4,6,null,null,3,7]
Output: false         // 3 is 6's left child (fine locally), but it sits in 5's right subtree
```

## Constraints

- The tree has between `1` and `10^4` nodes.
- `-2^31 <= Node.val <= 2^31 - 1`

## Hints

<details><summary>Hint 1</summary>

Checking only `left.val < node.val < right.val` is not enough — see the third example.

</details>

<details><summary>Hint 2</summary>

As you go down, carry the allowed range `(low, high)` for the current node. Going left tightens `high` to the parent's value; going right tightens `low`.

</details>

<details><summary>Hint 3</summary>

Start with `low = -Infinity` and `high = Infinity` so the extreme 32-bit values still work. Another route: an in-order traversal of a valid BST visits values in strictly increasing order.

</details>
