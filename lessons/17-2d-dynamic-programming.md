# 2D Dynamic Programming

## The big idea

In the 1D DP lesson one index was enough to describe a subproblem: "the best answer for the first `i` stairs". Many problems need **two** numbers to pin a subproblem down:

- a **cell** in a grid: `(row, col)`
- a **prefix of each of two strings**: "the first `i` characters of `a` and the first `j` of `b`"
- **items and a budget**: "using the first `i` items with capacity `w`"
- a **day and a state**: "day `i`, currently holding a share or not"

The recipe doesn't change. Say the state in one sentence, write the transition, pick base cases, then fill a table in an order where every cell's dependencies are already done. The only new skill is thinking in a **table** — and that's great news, because a table is something you can draw on a whiteboard and fill by hand.

## How to recognize it

- A grid where you move in restricted directions (right/down) and count paths or minimize cost.
- **Two strings or arrays** compared against each other: edit, match, interleave, common subsequence.
- "Pick a subset of items" with a sum, weight or capacity limit → **knapsack**.
- A 1D DP where each position also carries a small **mode** (holding / not holding, cooldown) → `dp[i][state]`.
- A grid where you may move in **all four** directions, but values must strictly increase (or some other rule prevents cycles) → **memoized DFS**.

## JavaScript toolkit

| Idiom | Use | Notes |
|---|---|---|
| `Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))` | 2D table | The factory runs once per row, so rows are independent. |
| `new Array(m).fill(new Array(n).fill(0))` | **bug** | Every row is the *same* array — writing `dp[1][2]` also changes `dp[0][2]`. |
| `Array.from({ length: n + 1 }, (_, j) => j)` | row with a formula | e.g. base row of edit distance: `[0, 1, 2, ...]`. |
| `new Array(n + 1).fill(Infinity)` | "impossible" for min problems | Remember `Infinity + 1` is still `Infinity`, which is exactly what you want. |
| `const DIRS = [[1,0],[-1,0],[0,1],[0,-1]]` | grid neighbours | Keep bounds checks in one place: `r >= 0 && r < m && c >= 0 && c < n`. |

**Padding trick:** size the table `(m + 1) × (n + 1)` so that row 0 and column 0 mean "empty prefix". Then `dp[i][j]` talks about `a[i - 1]` and `b[j - 1]`, and the base cases live in the padding instead of in `if`s.

**Recursion depth:** a memoized DFS over a 200 × 200 grid can, in the worst case, recurse 40,000 levels deep, and Node's default stack gives out around 10,000. If a path can snake through the whole grid, prefer a bottom-up order (or sort cells by value and process them in that order).

## Template

### Grid DP (moves go right/down)

```js
function gridDP(grid) {
  const m = grid.length, n = grid[0].length;
  const dp = Array.from({ length: m }, () => new Array(n).fill(0));
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (r === 0 && c === 0) { dp[r][c] = /* base */; continue; }
      const up = r > 0 ? dp[r - 1][c] : /* neutral value */;
      const left = c > 0 ? dp[r][c - 1] : /* neutral value */;
      dp[r][c] = /* combine(up, left, grid[r][c]) */;
    }
  }
  return dp[m - 1][n - 1];
}
```

The "neutral value" is `0` when you're **counting** (no paths come from outside) and `Infinity` when you're **minimizing** (you can't come from outside).

### Two sequences (edit distance / LCS shape)

```js
function twoSeq(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  // fill dp[i][0] and dp[0][j]: what does an empty prefix cost?
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = /* usually uses dp[i-1][j-1] */;
      else dp[i][j] = /* combine dp[i-1][j], dp[i][j-1], dp[i-1][j-1] */;
    }
  }
  return dp[m][n];
}
```

Each of the three neighbours has a meaning: **diagonal** = both strings step forward, **up** = only `a` steps forward, **left** = only `b` steps forward. Naming them out loud is half the battle.

### Knapsack: 0/1 vs unbounded — the loop direction matters

The full table is `dp[i][w]` = best value using the first `i` items with capacity `w`. Row `i` only reads row `i - 1` (0/1: each item once) or row `i` itself (unbounded: reuse allowed). Squeeze it into one row and **the direction of the capacity loop decides which one you get**:

```js
const dp = new Array(W + 1).fill(0);

// 0/1 knapsack: each item at most once -> capacity goes DOWN
for (const [weight, value] of items) {
  for (let w = W; w >= weight; w--) dp[w] = Math.max(dp[w], dp[w - weight] + value);
}

// Unbounded knapsack: reuse allowed -> capacity goes UP
for (const [weight, value] of items) {
  for (let w = weight; w <= W; w++) dp[w] = Math.max(dp[w], dp[w - weight] + value);
}
```

Why? Take one item with weight 2, value 3, and `W = 4`, starting from `dp = [0, 0, 0, 0, 0]`:

- **Downwards:** `dp[4] = dp[2] + 3 = 3` (old `dp[2]` is still 0), then `dp[2] = 3`. Result `[0, 0, 3, 3, 3]` — the item used once.
- **Upwards:** `dp[2] = 3` first, then `dp[4] = dp[2] + 3 = 6`. The item got used **twice**, because `dp[2]` already included it.

Going down, `dp[w - weight]` still holds the *previous row*. Going up, it holds the *current row*. That one sentence is the whole trick.

For **counting combinations**, keep the items loop **outside**. Items inside and amounts outside counts every ordering separately (`1+2` and `2+1`), which is a different question.

### Reducing to one row

If row `i` only reads row `i - 1`, keep one array `row` of length `n + 1`:

- `row[j]` before you overwrite it = **up** (`dp[i-1][j]`)
- `row[j - 1]` after it was overwritten = **left** (`dp[i][j-1]`)
- **diagonal** (`dp[i-1][j-1]`) got overwritten already — save it in a variable first (and get the 2D version passing before you squeeze):

```js
for (let i = 1; i <= m; i++) {
  let diag = row[0];
  row[0] = /* dp[i][0] */;
  for (let j = 1; j <= n; j++) {
    const up = row[j];
    row[j] = /* combine(up, row[j - 1], diag) */;
    diag = up; // becomes the diagonal for j + 1
  }
}
```

### Memoized DFS on a grid

When moves go in any direction there's no obvious fill order, but if the rules make cycles impossible, let recursion find the order for you:

```js
function bestFromEveryCell(grid) {
  const m = grid.length, n = grid[0].length;
  const memo = Array.from({ length: m }, () => new Array(n).fill(-1));
  const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  function dfs(r, c) {
    if (memo[r][c] !== -1) return memo[r][c];
    let best = 1;
    for (const [dr, dc] of DIRS) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && /* move allowed */) {
        best = Math.max(best, 1 + dfs(nr, nc));
      }
    }
    return (memo[r][c] = best);
  }
  // answer = combine dfs(r, c) over all cells
}
```

## Drawing the table

Before writing code, draw a small table and fill it by hand. It catches almost every bug:

1. **Label the axes** with the actual characters or indices, including the empty prefix `""` at index 0.
2. **Fill the base row and column** first.
3. For one interior cell, **draw arrows** to the cells it reads. The arrows tell you the loop order: if everything points up and left, loop rows top-down and columns left-right.
4. Check that the **answer cell** (often bottom-right, sometimes the max over the table) matches a hand-computed answer. In an interview, this drawing also shows your reasoning.

## Worked example

**Maximal Square** (LeetCode 221): given a grid of `"0"`/`"1"`, find the area of the largest square made only of `1`s.

**State:** `dp[r][c]` = side length of the largest all-ones square whose **bottom-right corner** is `(r, c)`.
**Transition:** if the cell is `0`, `dp[r][c] = 0`. Otherwise the square can only grow as far as its three neighbours allow:
`dp[r][c] = 1 + min(dp[r-1][c], dp[r][c-1], dp[r-1][c-1])`.
**Base cases:** first row and first column: `dp = grid value` (a square touching the edge has side at most 1).

Why the `min`? A square of side `k` at `(r, c)` needs a square of side `k - 1` above, to the left, *and* diagonally. The weakest of the three limits it.

Input and filled table:

| grid | c=0 | c=1 | c=2 | c=3 |
|---|---|---|---|---|
| **r=0** | 0 | 1 | 1 | 1 |
| **r=1** | 1 | 1 | 1 | 1 |
| **r=2** | 0 | 1 | 1 | 1 |
| **r=3** | 1 | 1 | 0 | 1 |

| dp | c=0 | c=1 | c=2 | c=3 |
|---|---|---|---|---|
| **r=0** | 0 | 1 | 1 | 1 |
| **r=1** | 1 | 1 | 2 | 2 |
| **r=2** | 0 | 1 | 2 | **3** |
| **r=3** | 1 | 1 | 0 | 1 |

A few cells by hand:

- `(1, 1)`: up `1`, left `1`, diagonal `0` → `1 + 0 = 1`. The zero at `(0, 0)` blocks a 2×2.
- `(1, 2)`: up `1`, left `1`, diagonal `1` → `2`.
- `(2, 3)`: up `2`, left `2`, diagonal `2` → `3`. A 3×3 square of ones ends here (rows 0–2, columns 1–3).
- `(3, 3)`: left is `0` → `1`.

The biggest value is `3`, so the answer is **area 9**.

```js
function maximalSquare(matrix) {
  const m = matrix.length, n = matrix[0].length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0)); // padded
  let side = 0;
  for (let r = 1; r <= m; r++) {
    for (let c = 1; c <= n; c++) {
      if (matrix[r - 1][c - 1] === '1') {
        dp[r][c] = 1 + Math.min(dp[r - 1][c], dp[r][c - 1], dp[r - 1][c - 1]);
        side = Math.max(side, dp[r][c]);
      }
    }
  }
  return side * side;
}
// O(m · n) time, O(m · n) space — or O(n) with one row and a saved diagonal.
```

The padding removed the edge special cases, the answer is the **max over the table** (not the bottom-right cell), and LeetCode gives the cells as strings, so compare with `'1'`, not `1`.

## Complexity cheat sheet

| Pattern | States | Time | Space (optimized) |
|---|---|---|---|
| Grid, right/down moves | m · n | O(m · n) | O(n) |
| Two sequences (edit distance, LCS, interleaving) | m · n | O(m · n) | O(min(m, n)) |
| 0/1 knapsack, n items, capacity W | n · W | O(n · W) | O(W) |
| Unbounded knapsack / coin combinations | k · W | O(k · W) | O(W) |
| Day × small state (stock problems) | n · s | O(n · s) | O(s) |
| Memoized DFS on grid (4 neighbours) | m · n | O(m · n) | O(m · n) |

## Common mistakes

- **Shared rows** from `new Array(m).fill(new Array(n))`. Always build with `Array.from` and a factory.
- **Off-by-one with padding.** In an `(m + 1) × (n + 1)` table, `dp[i][j]` looks at `a[i - 1]`, not `a[i]`.
- **Wrong knapsack direction.** 0/1 → capacity loop goes down; unbounded → up. Getting it backwards gives plausible but wrong numbers.
- **Losing the diagonal** when squeezing to one row. Save it before you overwrite.
- **Wrong neutral value** at the edges: `0` for counting, `Infinity` for minimizing, `-Infinity` for maximizing.
- **Answer location.** Sometimes it's `dp[m][n]`, sometimes the max over all cells. Decide while defining the state.

## Practice

- [Unique Paths II](#/practice/17-2d-dynamic-programming/unique-paths-ii) — Medium
- [Minimum Path Sum](#/practice/17-2d-dynamic-programming/minimum-path-sum) — Medium
- [Partition Equal Subset Sum](#/practice/17-2d-dynamic-programming/partition-equal-subset-sum) — Medium
- [Coin Change II](#/practice/17-2d-dynamic-programming/coin-change-ii) — Medium
- [Target Sum](#/practice/17-2d-dynamic-programming/target-sum) — Medium
- [Best Time to Buy and Sell Stock with Cooldown](#/practice/17-2d-dynamic-programming/best-time-to-buy-and-sell-stock-with-cooldown) — Medium
- [Interleaving String](#/practice/17-2d-dynamic-programming/interleaving-string) — Medium
- [Edit Distance](#/practice/17-2d-dynamic-programming/edit-distance) — Medium
- [Longest Increasing Path in a Matrix](#/practice/17-2d-dynamic-programming/longest-increasing-path-in-a-matrix) — Hard
- [Distinct Subsequences](#/practice/17-2d-dynamic-programming/distinct-subsequences) — Hard

## Before moving on

- [ ] I can describe a 2D state in one sentence, including what row 0 and column 0 mean.
- [ ] I can build a 2D table with `Array.from` and explain why `fill` with an array breaks.
- [ ] I can draw a small table, fill it by hand, and read the loop order off the arrows.
- [ ] I can explain why 0/1 knapsack loops capacity downwards and unbounded loops upwards.
- [ ] I can squeeze a table to one row and keep track of up, left and diagonal.
- [ ] I can write a memoized DFS on a grid and say why it can't loop forever.
