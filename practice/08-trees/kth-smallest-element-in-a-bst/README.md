# Kth Smallest Element in a BST

Given the `root` of a **binary search tree** and an integer `k`, return the `k`-th smallest value in the tree. `k` is **1-indexed**, so `k = 1` means the minimum.

## Examples

```
Input:  root = [3,1,4,null,2], k = 1
Output: 1
```

```
Input:  root = [5,3,6,2,4,null,null,1], k = 3
Output: 3             // sorted values: 1, 2, 3, 4, 5, 6
```

## Constraints

- The tree has `n` nodes, `1 <= k <= n <= 10^4`.
- `0 <= Node.val <= 10^4` on LeetCode (the tests here also include negatives).
- The tree is a valid BST with unique values.

## Follow-up

If the BST were modified often (inserts and deletes) and you had to answer many k-th smallest queries, how would you speed things up?

## Hints

<details><summary>Hint 1</summary>

What order do you visit a BST's values in with an **in-order** traversal (left, node, right)?

</details>

<details><summary>Hint 2</summary>

In-order visits values in sorted order, so the k-th node visited is the answer. You don't need to collect all values first.

</details>

<details><summary>Hint 3</summary>

An iterative in-order with an explicit stack lets you stop right when the counter hits `k`: push all left children, pop one, count it, then move to its right child.

</details>
