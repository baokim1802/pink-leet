# Trees

## The big idea

A binary tree is a linked list that branches: every node has a value and up to **two** children, `left` and `right`. The top node is the **root**; nodes with no children are **leaves**.

```
        8          <- root (depth 1)
       / \
      3   10
     / \    \
    1   6    14    <- 1, 6, 14 are leaves
```

The superpower of trees is that **every subtree is itself a tree**. That makes recursion feel natural: to answer a question about a tree, answer it for the left subtree and the right subtree, then combine the two answers at the current node. Once you trust that "leap of faith", most tree problems become three or four lines.

There are two ways to explore a tree:

- **DFS (depth-first):** go as deep as you can down one branch before backing up. Recursion does this for free.
- **BFS (breadth-first):** visit the tree level by level, using a queue.

## How to recognize it

- The input is a `TreeNode root`. (A graph with no cycles and one parent per node is also a tree.)
- "Height", "depth", "diameter", "path sum", "same tree", "subtree" → **DFS**, usually recursive.
- "Level by level", "each row", "right side view", "minimum depth", "nearest" → **BFS**.
- "Binary **search** tree", "sorted", "k-th smallest", "valid BST" → use the **BST property** (and in-order traversal).

## JavaScript toolkit

```js
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
```

### How LeetCode writes trees as arrays

LeetCode shows trees in **level order**, left to right, with `null` for a missing child. Trailing `null`s are dropped, and children of a `null` are not listed.

```
[3,9,20,null,null,15,7]

      3
     / \
    9   20        9 has no children -> null, null
       /  \
      15   7
```

Read it with a queue in your head: `3` takes the next two slots (`9`, `20`); then `9` takes the next two (`null`, `null`); then `20` takes (`15`, `7`). This is **not** the "index `i` has children `2i+1`, `2i+2`" heap layout — missing nodes don't reserve space for their children. In this app, `arrayToTree` and `treeToArray` in `lib/structures.js` do the conversion for the tests.

### JS gotchas

- **Recursion depth.** Node's default stack handles roughly 10k frames. A degenerate (linked-list-shaped) tree of 10^5 nodes can overflow it — switch to an explicit stack if that's a risk.
- **`queue.shift()` is `O(n)`.** For BFS, either use an index pointer (`let head = 0; queue[head++]`) or build each level as a new array.
- **`-Infinity` / `Infinity`** make great initial bounds and are safer than `Number.MIN_SAFE_INTEGER` or the 32-bit limits (which can appear as real values).
- **Truthiness:** `if (node)` is fine for nodes, but never write `if (node.val)` — a value of `0` is falsy.

## Template

### DFS, recursive

Pick an order based on *when* you need the node's own value relative to its children's answers.

```js
function dfs(node) {
  if (!node) return /* base answer, e.g. 0 or true or null */;
  // pre-order: use node.val here (top-down info, e.g. pass bounds/sums down)
  const left = dfs(node.left);
  // in-order: here (for a BST this visits values in sorted order)
  const right = dfs(node.right);
  // post-order: combine left and right here (bottom-up info, e.g. heights)
  return /* combine(node.val, left, right) */;
}
```

### DFS, iterative (explicit stack)

```js
function preorder(root) {
  const out = [];
  const stack = root ? [root] : [];
  while (stack.length) {
    const node = stack.pop();
    out.push(node.val);
    if (node.right) stack.push(node.right); // push right first...
    if (node.left) stack.push(node.left);   // ...so left is popped first
  }
  return out;
}

function inorder(root) {
  const out = [];
  const stack = [];
  let cur = root;
  while (cur || stack.length) {
    while (cur) { stack.push(cur); cur = cur.left; } // go all the way left
    cur = stack.pop();
    out.push(cur.val);
    cur = cur.right;
  }
  return out;
}
```

### BFS level order with an index-pointer queue

```js
function bfs(root) {
  if (!root) return [];
  const queue = [root];
  let head = 0;                       // queue[head] is the next node to process
  const levels = [];
  while (head < queue.length) {
    const levelEnd = queue.length;    // everything currently queued is one level
    const level = [];
    while (head < levelEnd) {
      const node = queue[head++];     // O(1) "dequeue"
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    levels.push(level);
  }
  return levels;
}
```

The array only grows, which costs `O(n)` memory total — the same as a real queue would at its widest, up to a constant.

### The BST property

In a **binary search tree**, for every node: *all* values in the left subtree are smaller and *all* values in the right subtree are larger. Consequences:

- Search, insert, and delete walk a single root-to-leaf path: `O(h)`, which is `O(log n)` when balanced and `O(n)` when it degenerates into a line.
- An **in-order traversal visits values in sorted order.**

```js
function searchBST(root, target) {
  let cur = root;
  while (cur && cur.val !== target) {
    cur = target < cur.val ? cur.left : cur.right;
  }
  return cur; // node or null
}
```

## Worked example

**Path Sum** (LeetCode 112): is there a root-to-leaf path whose values add up to `targetSum`?

Tree `[5,4,8,11,null,13,4,7,2]`, target `22`:

```
          5
         / \
        4   8
       /   / \
      11  13  4
     /  \
    7    2
```

Idea: pass the **remaining** sum down (pre-order, top-down). At a leaf, check whether what's left equals the leaf's value.

```js
function hasPathSum(root, targetSum) {
  if (!root) return false;
  const remaining = targetSum - root.val;
  if (!root.left && !root.right) return remaining === 0; // leaf
  return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);
}
```

Trace the left side:

| Node | Remaining after subtracting | Leaf? | Result |
| --- | --- | --- | --- |
| 5 | 22 - 5 = 17 | no | ask children |
| 4 | 17 - 4 = 13 | no | ask children |
| 11 | 13 - 11 = 2 | no | ask children |
| 7 | 2 - 7 = -5 | yes | `false` |
| 2 | 2 - 2 = 0 | yes | **`true`** |

The `true` bubbles up through `||`, and the right side (`8`) is never explored thanks to short-circuiting. Notice the base cases: an empty tree is `false` (there's no path at all), and "leaf" means *both* children are `null` — a node with one child is not a leaf.

## Complexity cheat sheet

`n` = number of nodes, `h` = height (`log n` if balanced, up to `n` if skewed), `w` = max width of a level (up to about `n / 2`).

| Task | Time | Space |
| --- | --- | --- |
| DFS (any order), recursive | `O(n)` | `O(h)` call stack |
| DFS, iterative stack | `O(n)` | `O(h)` |
| BFS level order | `O(n)` | `O(w)` |
| BST search / insert / delete | `O(h)` | `O(1)` iterative |
| Build tree from level-order array | `O(n)` | `O(n)` |

## Common mistakes

- **Missing the `null` base case** → `Cannot read properties of null (reading 'left')`.
- **Checking only a node's direct children for BST validity.** The rule is about whole subtrees; carry `(low, high)` bounds down or use in-order.
- **Confusing depth conventions.** LeetCode's "maximum depth" counts **nodes**, so a single node has depth 1. Some problems count **edges**. Read carefully.
- **Treating a one-child node as a leaf.** A leaf has *no* children.
- **Using `shift()` in BFS on big trees.** It turns `O(n)` into `O(n²)`.
- **Forgetting to `return`** the recursive result — `dfs(node.left)` without using its value quietly does nothing.
- **Mutating shared state** (like a `path` array) in DFS and forgetting to undo it on the way back up.

## Practice

- [Maximum Depth of Binary Tree](#/practice/08-trees/maximum-depth-of-binary-tree) — Easy
- [Invert Binary Tree](#/practice/08-trees/invert-binary-tree) — Easy
- [Binary Tree Level Order Traversal](#/practice/08-trees/binary-tree-level-order-traversal) — Medium
- [Validate Binary Search Tree](#/practice/08-trees/validate-binary-search-tree) — Medium
- [Same Tree](#/practice/08-trees/same-tree) — Easy
- [Subtree of Another Tree](#/practice/08-trees/subtree-of-another-tree) — Easy
- [Diameter of Binary Tree](#/practice/08-trees/diameter-of-binary-tree) — Easy
- [Balanced Binary Tree](#/practice/08-trees/balanced-binary-tree) — Easy
- [Lowest Common Ancestor of a Binary Search Tree](#/practice/08-trees/lowest-common-ancestor-of-a-binary-search-tree) — Medium
- [Binary Tree Right Side View](#/practice/08-trees/binary-tree-right-side-view) — Medium
- [Count Good Nodes in Binary Tree](#/practice/08-trees/count-good-nodes-in-binary-tree) — Medium
- [Kth Smallest Element in a BST](#/practice/08-trees/kth-smallest-element-in-a-bst) — Medium
- [Construct Binary Tree from Preorder and Inorder Traversal](#/practice/08-trees/construct-binary-tree-from-preorder-and-inorder-traversal) — Medium
- [Binary Tree Maximum Path Sum](#/practice/08-trees/binary-tree-maximum-path-sum) — Hard
- [Serialize and Deserialize Binary Tree](#/practice/08-trees/serialize-and-deserialize-binary-tree) — Hard

## Before moving on

- [ ] I can draw the tree for a LeetCode array like `[1,2,3,null,4]` and write the array for a tree I drew.
- [ ] I can write recursive DFS with a correct base case, and I know when to use pre-, in- or post-order.
- [ ] I can write iterative DFS with a stack when recursion depth is a concern.
- [ ] I can write level-order BFS without using `shift()`.
- [ ] I can state the BST property precisely and explain why in-order traversal of a BST is sorted.
- [ ] I can give the time and space complexity of DFS and BFS in terms of `n`, `h` and `w`.
