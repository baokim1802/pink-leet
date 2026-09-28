# Dynamic Programming

## The big idea

Dynamic programming (DP) is **recursion that remembers**. Many problems break into smaller versions of themselves, and a naive recursive solution solves the *same* small problems over and over. DP solves each small problem **once**, stores the answer, and reuses it.

Two ingredients make a problem a DP problem:

1. **Optimal substructure** — the answer to the big problem can be built from answers to smaller problems.
2. **Overlapping subproblems** — those smaller problems repeat. (If they didn't repeat, plain recursion / divide and conquer would be enough.)

The whole skill is answering two questions:

- **State:** what does `dp[i]` (or `dp[i][j]`) *mean*, in one sentence?
- **Transition:** how do I compute `dp[i]` from smaller states?

Once you can say those out loud, the code almost writes itself. Everyone finds DP hard at first — it gets much easier after you've done the four-step progression below a few times.

## How to recognize it

- "Count the number of ways to ..."
- "Minimum / maximum cost, length, profit ..."
- "Is it possible to ..." (reach, make, split, form)
- You make a **sequence of choices** and each choice affects what's allowed later (take it or skip it, step 1 or step 2).
- A brute-force recursion exists but is exponential, and you notice it calls itself with the same arguments repeatedly.
- Two strings/arrays compared prefix by prefix (edit distance, common subsequence) → usually **2D DP**.

Contrast with backtracking: backtracking *lists* every solution; DP *counts* or *optimizes* over them without listing them.

## JavaScript toolkit

| Idiom | Use | Notes |
|---|---|---|
| `new Array(n + 1).fill(0)` | 1D table | `+ 1` so `dp[0]` can mean "empty prefix". |
| `Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))` | 2D table | **Never** `new Array(m).fill(new Array(n))` — every row would be the same array. |
| `new Map()` / `new Array(n).fill(-1)` | memo for top-down | Use an array when states are small integers — faster than a Map. For 2D states, key a Map with `` `${i},${j}` `` or use a 2D array. |
| `Infinity` | "impossible" for min problems | `Math.min(Infinity, x)` just works. Convert back to `-1` at the end if needed. |
| `Math.max` / `Math.min` | transitions | Avoid `Math.max(...hugeArray)` — spreading 100k+ items can overflow the call stack. |
| `let prev2 = 0, prev1 = 0` | rolling variables | When `dp[i]` only needs the last one or two values. |

**Recursion depth:** JS stacks top out around 10,000 frames. A memoized recursion over `n = 100000` states will crash — switch to bottom-up tabulation.

## Template

We'll go through the four steps on **Min Cost Climbing Stairs** (LeetCode 746): `cost[i]` is the price of stepping on stair `i`; you can start on stair `0` or `1`, climb 1 or 2 stairs at a time, and want the cheapest way to get past the last stair (to position `n`).

**State:** `f(i)` = the minimum cost to reach position `i`.
**Transition:** you got to `i` from `i - 1` (paying `cost[i-1]`) or from `i - 2` (paying `cost[i-2]`):
`f(i) = min(f(i-1) + cost[i-1], f(i-2) + cost[i-2])`, with `f(0) = f(1) = 0`.

### Step 1 — plain recursion (correct but exponential)

```js
function minCost(cost) {
  function f(i) {
    if (i <= 1) return 0;
    return Math.min(f(i - 1) + cost[i - 1], f(i - 2) + cost[i - 2]);
  }
  return f(cost.length);
}
// O(2^n): f(i - 2) gets computed from both f(i) and f(i - 1), and so on down.
```

### Step 2 — memoization (top-down DP)

Same recursion, but cache every answer.

```js
function minCost(cost) {
  const memo = new Array(cost.length + 1).fill(-1);
  function f(i) {
    if (i <= 1) return 0;
    if (memo[i] !== -1) return memo[i];
    return (memo[i] = Math.min(f(i - 1) + cost[i - 1], f(i - 2) + cost[i - 2]));
  }
  return f(cost.length);
}
// O(n) time, O(n) space (memo + recursion stack)
```

### Step 3 — tabulation (bottom-up DP)

Fill the table from the base cases upward, so everything you need is already computed. No recursion.

```js
function minCost(cost) {
  const n = cost.length;
  const dp = new Array(n + 1).fill(0); // dp[0] = dp[1] = 0
  for (let i = 2; i <= n; i++) {
    dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
  }
  return dp[n];
}
// O(n) time, O(n) space
```

### Step 4 — space optimization

`dp[i]` only looks at the previous two entries, so keep just two variables.

```js
function minCost(cost) {
  let prev2 = 0, prev1 = 0; // dp[i-2], dp[i-1]
  for (let i = 2; i <= cost.length; i++) {
    const cur = Math.min(prev1 + cost[i - 1], prev2 + cost[i - 2]);
    prev2 = prev1;
    prev1 = cur;
  }
  return prev1;
}
// O(n) time, O(1) space
```

In an interview, it's completely fine to start at step 1 or 2 and improve from there — say out loud what you're doing.

### 2D template

When the state needs two indices (two strings, a grid, "first i items with capacity j"):

```js
const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
// fill base row / column
for (let i = 1; i <= m; i++) {
  for (let j = 1; j <= n; j++) {
    dp[i][j] = /* combine dp[i-1][j], dp[i][j-1], dp[i-1][j-1] */;
  }
}
return dp[m][n];
```

If row `i` only reads row `i - 1`, you can keep two rows (or one, carefully) for O(n) space.

## Worked example

**Unique Paths** (LeetCode 62): a robot starts at the top-left of an `m × n` grid and can only move **right** or **down**. How many distinct paths reach the bottom-right?

**State:** `dp[r][c]` = number of paths from the start to cell `(r, c)`.
**Transition:** you arrive from above or from the left: `dp[r][c] = dp[r-1][c] + dp[r][c-1]`.
**Base cases:** the whole first row and first column are `1` (only one way: go straight).

For `m = 3, n = 4`:

| | c=0 | c=1 | c=2 | c=3 |
|---|---|---|---|---|
| **r=0** | 1 | 1 | 1 | 1 |
| **r=1** | 1 | 2 | 3 | 4 |
| **r=2** | 1 | 3 | 6 | **10** |

Each cell is "the one above + the one to the left". Answer: **10**.

```js
function uniquePaths(m, n) {
  const row = new Array(n).fill(1); // the first row
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      row[c] += row[c - 1]; // row[c] (above) + row[c-1] (left, already updated)
    }
  }
  return row[n - 1];
}
```

That's the 2D table squeezed into one row: before the update, `row[c]` still holds the value from the row above.

## Complexity cheat sheet

General rule: **time = (number of states) × (work per transition)**; space = number of states (often reducible).

| Pattern | States | Time | Space (optimized) |
|---|---|---|---|
| 1D, look back a constant amount (stairs, robber) | n | O(n) | O(1) |
| 1D, look at all smaller states (LIS) | n | O(n²) | O(n) |
| 1D over an amount with k options (coin change) | amount | O(amount · k) | O(amount) |
| 2D over two strings (LCS, edit distance) | m · n | O(m · n) | O(min(m, n)) |
| 2D grid paths | m · n | O(m · n) | O(n) |
| 0/1 knapsack, n items, capacity W | n · W | O(n · W) | O(W) |

## Common mistakes

- **Vague state.** If you can't say what `dp[i]` means in one sentence, stop and pin it down before coding.
- **Wrong or missing base cases.** Check `dp[0]` (empty input) explicitly — it's where most off-by-one bugs live.
- **Iterating in the wrong order.** Bottom-up must compute a state *after* everything it depends on.
- **`fill` with a shared array** for 2D tables. Use `Array.from` with a factory.
- **Using `0` as "not computed" in a memo** when `0` is a legitimate answer. Use `-1`, `undefined`, or `memo.has(key)`.
- **Using `0` as "impossible" in a min problem.** Use `Infinity`, and translate to `-1` at the end.
- **Greedy instead of DP.** Picking the biggest coin first fails for coins `[1, 3, 4]`, amount `6` (greedy: 4+1+1, optimal: 3+3).
- **Deep recursion** on large `n` — switch to tabulation.

## Practice

- [Climbing Stairs](#/practice/12-dynamic-programming/climbing-stairs) — Easy
- [House Robber](#/practice/12-dynamic-programming/house-robber) — Medium
- [Coin Change](#/practice/12-dynamic-programming/coin-change) — Medium
- [Longest Common Subsequence](#/practice/12-dynamic-programming/longest-common-subsequence) — Medium
- [Fibonacci Number](#/practice/12-dynamic-programming/fibonacci-number) — Easy
- [House Robber II](#/practice/12-dynamic-programming/house-robber-ii) — Medium
- [Maximum Product Subarray](#/practice/12-dynamic-programming/maximum-product-subarray) — Medium
- [Decode Ways](#/practice/12-dynamic-programming/decode-ways) — Medium
- [Palindromic Substrings](#/practice/12-dynamic-programming/palindromic-substrings) — Medium
- [Longest Palindromic Substring](#/practice/12-dynamic-programming/longest-palindromic-substring) — Medium
- [Word Break](#/practice/12-dynamic-programming/word-break) — Medium
- [Longest Increasing Subsequence](#/practice/12-dynamic-programming/longest-increasing-subsequence) — Medium

## Before moving on

- [ ] I can state a DP state in one sentence and write its transition.
- [ ] I can take a recursive solution and add memoization.
- [ ] I can convert memoization into a bottom-up table and pick the loop order.
- [ ] I can shrink a table to rolling variables or a single row when possible.
- [ ] I can build a 2D table in JS without the shared-row bug.
- [ ] I can estimate complexity as states × transition cost.
