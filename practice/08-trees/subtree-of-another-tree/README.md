# Subtree of Another Tree

Given the roots of two binary trees, `root` and `subRoot`, return `true` if `root` contains a node whose subtree is **identical** to `subRoot` (same shape, same values). Otherwise return `false`.

A node's *subtree* is that node plus **all** of its descendants — you can't cut off part of it. The whole tree `root` also counts as a subtree of itself.

## Examples

```
Input:  root = [3,4,5,1,2], subRoot = [4,1,2]
Output: true          // the subtree rooted at 4 is exactly [4,1,2]
```

```
Input:  root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]
Output: false         // the 4-subtree has an extra 0 under the 2
```

```
Input:  root = [12], subRoot = [2]
Output: false         // careful: "12" contains "2" as text, but not as a tree
```

## Constraints

- `root` has between `1` and `2000` nodes.
- `subRoot` has between `1` and `1000` nodes.
- `-10^4 <= Node.val <= 10^4`

## Hints

<details><summary>Hint 1</summary>

If you already had a helper `isSame(a, b)` that checks whether two trees are identical, how would you use it here?

</details>

<details><summary>Hint 2</summary>

Visit every node of `root`. At each one, ask `isSame(node, subRoot)`. If any answer is `true`, you're done.

</details>

<details><summary>Hint 3</summary>

Recursively: `isSubtree(root, sub) = isSame(root, sub) || isSubtree(root.left, sub) || isSubtree(root.right, sub)`, with `false` when `root` is `null`. That's O(m·n) in the worst case, which is fine for these limits.

</details>
