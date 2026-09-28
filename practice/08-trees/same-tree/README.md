# Same Tree

You're given the roots of two binary trees, `p` and `q`. Return `true` if they are **identical**: they have exactly the same shape, and every pair of nodes in matching positions holds the same value. Otherwise return `false`.

## Examples

```
Input:  p = [1,2,3], q = [1,2,3]
Output: true
```

```
Input:  p = [1,2], q = [1,null,2]
Output: false         // same values, but 2 is a left child in p and a right child in q
```

```
Input:  p = [1,2,1], q = [1,1,2]
Output: false         // the children are swapped
```

## Constraints

- Each tree has between `0` and `100` nodes.
- `-10^4 <= Node.val <= 10^4`

## Hints

<details><summary>Hint 1</summary>

Two trees are the same if their roots match **and** their left subtrees are the same **and** their right subtrees are the same. That's a recursive definition, so the code can be recursive too.

</details>

<details><summary>Hint 2</summary>

Handle the base cases first: if both nodes are `null`, they match. If only one is `null`, they don't.

</details>

<details><summary>Hint 3</summary>

Once both nodes exist, compare `p.val` with `q.val`, then recurse on `(p.left, q.left)` and `(p.right, q.right)`.

</details>
