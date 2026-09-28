# Binary Tree Level Order Traversal

Given the `root` of a binary tree, return its values **level by level**: an array of arrays, where the first inner array holds the root, the next holds the root's children (left to right), and so on.

## Examples

```
Input:  root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
```

```
Input:  root = [1]
Output: [[1]]
```

```
Input:  root = []
Output: []
```

## Constraints

- The tree has between `0` and `2000` nodes.
- `-1000 <= Node.val <= 1000`

## Hints

<details><summary>Hint 1</summary>

"Level by level" is the signature of **BFS** with a queue.

</details>

<details><summary>Hint 2</summary>

To know where one level ends, snapshot the queue's size at the start of each level and process exactly that many nodes before starting the next inner array.

</details>

<details><summary>Hint 3</summary>

In JS, `queue.shift()` is `O(n)`. An alternative that stays `O(1)`: build each level as a fresh array — loop over the current level's nodes and push their children into a `next` array.

</details>
