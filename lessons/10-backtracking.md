# Backtracking

## The big idea

Backtracking is **organized brute force**. When a problem asks you to list *every* valid arrangement — every subset, every ordering, every way to hit a target — you build candidates one choice at a time, and the moment a partial candidate can't possibly work, you **undo the last choice and try the next one**.

Picture a **decision tree**:

- The root is "nothing chosen yet".
- Each edge is one choice ("take 3", "put `b` next", "open a parenthesis").
- Each path from the root to a leaf is one complete candidate.

Backtracking is just a depth-first walk over that tree. You never build the tree explicitly — the recursion stack *is* the current path, and returning from a call walks you back up one level.

```
                 []
          /       |       \
       [1]       [2]      [3]          choose the first element
      /   \       |
  [1,2]  [1,3]  [2,3]                  choose the next (only larger ones)
    |
 [1,2,3]
```

That little tree lists all non-empty subsets of `[1,2,3]` in the "only pick later elements" style. Every node is a valid answer, so we record at every node.

## How to recognize it

- "Return **all** possible ..." / "list every ..." / "generate all ..."
- Subsets, combinations, permutations, partitions, placements (N-Queens, Sudoku).
- Constraints are **small**: `n <= 10`, `n <= 15`, `n <= 20`. That's the problem setter hinting that exponential time is expected.
- "Count the ways" with tiny `n` can also be backtracking — but if `n` is large, think **dynamic programming** instead.

## JavaScript toolkit

| Idiom | What it does | Notes |
|---|---|---|
| `path.push(x)` / `path.pop()` | choose / unchoose | Both O(1). This pair is the heart of every backtracking solution. |
| `res.push([...path])` | save a **copy** of the current path | O(k) for a path of length k. Pushing `path` itself is the #1 bug (see below). |
| `path.slice()` | also copies | Same as `[...path]`. |
| `new Array(n).fill(false)` | a `used` array for permutations | Faster and clearer than `path.includes(x)` (which is O(n)). |
| `nums.sort((a, b) => a - b)` | sort numbers before pruning | Default `sort()` is **lexicographic**: `[10, 9, 1].sort()` gives `[1, 10, 9]`. |
| `str + ch` | extend a string path | Strings are immutable, so there's nothing to undo — each call gets its own string. |

**Why the copy matters:** `path` is one array that you keep mutating. If you push `path` into `res`, every entry of `res` points at the *same* array, and when recursion finishes that array is empty. You end up with `[[], [], [], ...]`. Always push a snapshot: `res.push([...path])`.

## Template

The choose → explore → unchoose pattern:

```js
function backtrack(/* inputs */) {
  const res = [];
  const path = [];

  function dfs(start /* or other state */) {
    if (/* path is a complete answer */) {
      res.push([...path]);          // snapshot!
      return;
    }
    for (let i = start; i < choices.length; i++) {
      if (/* choice i can't lead to an answer */) continue; // prune
      path.push(choices[i]);        // choose
      dfs(i + 1);                   // explore
      path.pop();                   // unchoose
    }
  }

  dfs(0);
  return res;
}
```

Three knobs change from problem to problem:

1. **What state you pass down.** A `start` index (combinations/subsets: never look back, so no duplicates like `[1,2]` and `[2,1]`), a `used[]` array (permutations: any unused element can go next), or a `remaining` target.
2. **When a path counts as an answer.** At every node (subsets), at a fixed length (permutations, combinations of size k), or when a target hits zero.
3. **How you prune.** Stop exploring when the partial answer is already invalid (sum too large, too many open parentheses, queen under attack).

### Pruning

Pruning is what makes backtracking fast in practice. If you sort the input first, you can often `break` instead of `continue`:

```js
nums.sort((a, b) => a - b);
for (let i = start; i < nums.length; i++) {
  if (nums[i] > remaining) break; // every later number is even bigger
  // ...
}
```

### Skipping duplicates

When the input has repeated values and the answer must not repeat, sort and skip equal neighbors at the **same depth**:

```js
for (let i = start; i < nums.length; i++) {
  if (i > start && nums[i] === nums[i - 1]) continue; // same choice at this level already tried
  // ...
}
```

## Worked example

**Generate Parentheses** (LeetCode 22): list every well-formed string of `n` pairs of parentheses.

State: the string so far, how many `(` we've used (`open`), and how many `)` (`close`).

Rules (these are the pruning!):

- We may add `(` if `open < n`.
- We may add `)` only if `close < open` — otherwise the string becomes invalid.
- When the length is `2n`, it's complete.

```js
function generateParenthesis(n) {
  const res = [];
  function dfs(s, open, close) {
    if (s.length === 2 * n) { res.push(s); return; }
    if (open < n) dfs(s + '(', open + 1, close);
    if (close < open) dfs(s + ')', open, close + 1);
  }
  dfs('', 0, 0);
  return res;
}
```

Trace for `n = 2`:

| Call | s | open | close | Can add `(`? | Can add `)`? |
|---|---|---|---|---|---|
| 1 | `""` | 0 | 0 | yes | no |
| 2 | `"("` | 1 | 0 | yes | yes |
| 3 | `"(("` | 2 | 0 | no | yes |
| 4 | `"(()"` | 2 | 1 | no | yes |
| 5 | `"(())"` | 2 | 2 | — record — | |
| 6 | `"()"` | 1 | 1 | yes | no |
| 7 | `"()("` | 2 | 1 | no | yes |
| 8 | `"()()"` | 2 | 2 | — record — | |

Result: `["(())", "()()"]`. Notice there's no explicit "unchoose" step here: because strings are immutable, `s + '('` creates a new string and the caller's `s` is untouched. With arrays you must `pop()` yourself.

## Complexity cheat sheet

Backtracking is exponential by nature. The usual way to count: *(number of answers) × (cost to copy each one)*.

| Problem shape | Number of leaves/answers | Typical time | Extra space (excluding output) |
|---|---|---|---|
| Subsets of n | 2ⁿ | O(n · 2ⁿ) | O(n) recursion + path |
| Permutations of n | n! | O(n · n!) | O(n) |
| Combinations, choose k of n | C(n, k) | O(k · C(n, k)) | O(k) |
| Combination sum (reuse allowed, target T, smallest value m) | bounded by branching^(T/m) | O(branching^(T/m) · T/m) | O(T/m) depth |
| N-Queens | ≤ n! | O(n!) | O(n) |

Rough feel for sizes: 2²⁰ ≈ 1 million (fine), 10! ≈ 3.6 million (fine), 12! ≈ 479 million (too slow).

## Common mistakes

- **Pushing `path` instead of `[...path]`.** Every saved answer ends up as the same (eventually empty) array.
- **Forgetting to `pop()`.** The path keeps growing and answers bleed into each other.
- **Using `start` for permutations.** Permutations need *all* unused elements at each level, not only later ones — use a `used[]` array.
- **Not using `start` for combinations.** You'll produce `[2,3]` and `[3,2]` as separate answers.
- **For combination-sum-with-reuse, recursing with `i + 1`** — that forbids reusing the same number. Recurse with `i` to allow reuse.
- **Sorting numbers with plain `.sort()`.** It's lexicographic. Always `sort((a, b) => a - b)`.
- **Pruning with `continue` when `break` is safe** (or vice versa). `break` is only correct if the input is sorted and every later choice is at least as bad.

## Practice

- [Subsets](#/practice/10-backtracking/subsets) — Medium
- [Permutations](#/practice/10-backtracking/permutations) — Medium
- [Combination Sum](#/practice/10-backtracking/combination-sum) — Medium

## Before moving on

- [ ] I can draw the decision tree for a small input before writing code.
- [ ] I can write the choose → explore → unchoose template from memory.
- [ ] I know why `res.push([...path])` needs the copy.
- [ ] I know when to pass a `start` index vs. a `used[]` array.
- [ ] I can add a pruning condition and explain why it's safe.
- [ ] I can estimate the time complexity as (number of answers) × (cost per answer).
