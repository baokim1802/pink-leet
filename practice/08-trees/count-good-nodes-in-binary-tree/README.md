# Count Good Nodes in Binary Tree

Given the `root` of a binary tree, call a node **good** if, on the path from the root down to that node, no node has a value **greater** than it. (Equal values are fine.)

Return how many good nodes the tree has. The root is always good.

## Examples

```
Input:  root = [3,1,4,3,null,1,5]
Output: 4             // 3 (root), 4, 5, and the 3 under the 1
```

```
Input:  root = [3,3,null,4,2]
Output: 3             // 3, 3, 4 are good; 2 is not (3 > 2 above it)
```

```
Input:  root = [1]
Output: 1
```

## Constraints

- The tree has between `1` and `10^5` nodes.
- `-10^4 <= Node.val <= 10^4`

## Hints

<details><summary>Hint 1</summary>

For each node, you only need one fact about its ancestors: the **largest value** on the path from the root to it.

</details>

<details><summary>Hint 2</summary>

Do a DFS that carries `maxSoFar` down as a parameter. A node is good when `node.val >= maxSoFar`.

</details>

<details><summary>Hint 3</summary>

Return the count from each call: `(good ? 1 : 0) + dfs(left, newMax) + dfs(right, newMax)`, where `newMax = Math.max(maxSoFar, node.val)`.

</details>
