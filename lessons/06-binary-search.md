# Binary Search

## The big idea

Guess a number between 1 and 100. After each guess you're told "higher" or "lower". The smart strategy is to guess the middle every time: 50, then 25 or 75, and so on. Each guess **throws away half** of what's left, so you need at most 7 guesses for 100 numbers, and only about 30 for a billion.

That's binary search: `O(log n)` instead of `O(n)`.

The key requirement isn't really "a sorted array" — it's that you can look at one spot and **decide which half the answer can't be in**. Sorted arrays give you that for free, but so do many other situations:

- a rotated sorted array (one half is always sorted),
- a yes/no question that flips exactly once, like "can I finish in time at speed `k`?" (no, no, no, yes, yes, yes).

That second one is called **binary search on the answer**, and it's one of the most useful interview patterns.

## How to recognize it

- The input is **sorted** (or sorted-then-rotated) and you need something faster than `O(n)`.
- The problem literally demands `O(log n)`.
- You're asked for the **minimum value that works** or the **maximum value that works**, and "works" is monotonic: if `k` works, then every bigger `k` works too (or every smaller one).
- The answer lives in a numeric range (`1..max(piles)`, `0..x`, `min..sum`) even though nothing is sorted.

## JavaScript toolkit

**Computing `mid` safely.** In languages like Java or C++, `(lo + hi) / 2` can overflow. JavaScript numbers are 64-bit floats, so `lo + hi` won't overflow for any realistic index — but there are two different traps:

- `(lo + hi) / 2` is **not an integer** in JS. `(0 + 5) / 2 === 2.5`, and `arr[2.5]` is `undefined`. You must floor it.
- `(lo + hi) >> 1` is a popular fast floor, but bitwise operators convert to **32-bit signed integers**. Once `lo + hi` exceeds `2^31 - 1` (about 2.1 billion), you get garbage — often a negative number. For array indices that's fine (arrays that big don't fit in memory), but in *binary search on the answer*, values like `10^9` or `10^12` show up all the time.

```js
const mid = (lo + hi) >> 1;                   // fast, OK for array indices only
const mid = Math.floor((lo + hi) / 2);        // safe up to 2^53
const mid = lo + Math.floor((hi - lo) / 2);   // safe, and the habit that ports to other languages
```

When in doubt, use `Math.floor`. For example, `(2000000000 + 2000000000) >> 1` is `-147483648`.

Other bits:

| Tool | Notes |
| --- | --- |
| `Math.ceil(a / b)` | "how many rounds to process `a` items at `b` per round" — common in answer-space checks |
| `Math.max(...arr)` | fine up to ~100k elements; for huge arrays use a loop or `reduce` (spread can blow the call stack) |
| `arr.indexOf(x)` / `arr.includes(x)` | linear `O(n)` — they don't know your array is sorted |
| `arr.sort((a, b) => a - b)` | the default `sort()` compares as **strings** (`[10, 9, 1].sort()` → `[1, 10, 9]`) — always pass a comparator |

## Template

**1. Find an exact target — closed interval `lo <= hi`:**

```js
function binarySearch(nums, target) {
  let lo = 0;
  let hi = nums.length - 1;           // hi is a valid index
  while (lo <= hi) {                  // range [lo, hi] is non-empty
    const mid = lo + Math.floor((hi - lo) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) lo = mid + 1;  // mid is too small, exclude it
    else hi = mid - 1;                     // mid is too big, exclude it
  }
  return -1;                          // range became empty
}
```

**Invariant:** "if the target exists, it's inside `[lo, hi]`". Every update keeps that true *and* shrinks the range, so the loop ends.

**2. Find the first position where a condition becomes true — half-open `lo < hi`:**

```js
// Smallest x in [lo, hi] with ok(x) === true. Assumes ok(hi) is true.
function firstTrue(lo, hi, ok) {
  while (lo < hi) {                   // stops when lo === hi: one candidate left
    const mid = lo + Math.floor((hi - lo) / 2);
    if (ok(mid)) hi = mid;            // mid might be the answer — keep it
    else lo = mid + 1;                // mid definitely isn't — skip it
  }
  return lo;
}
```

**Invariant:** "the answer is inside `[lo, hi]`". We never exclude `mid` when it might be the answer, so we write `hi = mid` (not `mid - 1`).

**`lo <= hi` vs `lo < hi` — which one?**

| | `while (lo <= hi)` | `while (lo < hi)` |
| --- | --- | --- |
| Use for | "find this exact value" | "find the boundary / first true / min that works" |
| Updates | `lo = mid + 1`, `hi = mid - 1` | `lo = mid + 1`, `hi = mid` |
| Ends when | range is empty | one candidate left (`lo === hi`) |
| Answer | returned inside the loop, else `-1` | `lo` after the loop |

The danger zone is mixing them. With `lo < hi` and `hi = mid`, `mid` must round **down**, or a two-element range never shrinks. If you ever need `lo = mid` (searching for the *last* true), round **up** instead: `mid = lo + Math.ceil((hi - lo) / 2)`.

**3. Binary search on the answer:**

```js
function minThatWorks(lo, hi, works) {
  // 1. Pick a range guaranteed to contain the answer.
  // 2. Write works(x) — usually a greedy O(n) simulation.
  // 3. Make sure works() is monotonic: false...false, true...true.
  return firstTrue(lo, hi, works);
}
```

## Worked example

**Problem:** return the integer square root of `x` (the floor of `√x`), without using `Math.sqrt`. (LeetCode 69.)

There's no array here — the *answer* is somewhere in `0..x`. Condition: "`mid * mid <= x`" is true for small `mid` and false after the answer, so we want the **last true**. Equivalently, find the **first** `m` where `m * m > x`, and subtract 1.

```js
function mySqrt(x) {
  let lo = 0;
  let hi = x + 1;                           // (x+1)^2 > x, so a "true" always exists
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (mid * mid > x) hi = mid;            // first m with m*m > x
    else lo = mid + 1;
  }
  return lo - 1;
}
```

Trace `x = 10`:

| lo | hi | mid | mid² | mid² > 10? | update |
| --- | --- | --- | --- | --- | --- |
| 0 | 11 | 5 | 25 | yes | hi = 5 |
| 0 | 5 | 2 | 4 | no | lo = 3 |
| 3 | 5 | 4 | 16 | yes | hi = 4 |
| 3 | 4 | 3 | 9 | no | lo = 4 |
| 4 | 4 | — | — | — | stop |

First `m` with `m² > 10` is `4`, so the answer is `3`. Five steps for a range of 11; for `x = 2^31 - 1` it's only about 32.

## Complexity cheat sheet

| Pattern | Time | Space |
| --- | --- | --- |
| Linear scan (`indexOf`, `includes`) | `O(n)` | `O(1)` |
| Binary search on a sorted array | `O(log n)` | `O(1)` |
| Recursive binary search | `O(log n)` | `O(log n)` call stack |
| Binary search on the answer (range size `M`, check costs `O(n)`) | `O(n log M)` | `O(1)` |
| Sort first, then binary search | `O(n log n)` | depends on sort |

## Common mistakes

- **Infinite loops.** With `lo <= hi` you must use `mid ± 1`. With `lo < hi` and `hi = mid`, round `mid` down.
- **Forgetting to floor `mid`** — `(lo + hi) / 2` gives a fraction in JS.
- **Using `>> 1` on big numbers** in answer-space searches (values over ~2.1 billion).
- **Wrong initial range.** For "binary search on the answer", make sure the range definitely contains a valid answer (e.g. `hi = Math.max(...piles)`, not `piles.length`).
- **Non-monotonic condition.** Binary search only works if the yes/no answer flips once. Check that before writing code.
- **Returning `mid` instead of `lo`** after a boundary search.

## Practice

- [Binary Search](#/practice/06-binary-search/binary-search) — Easy
- [Search in Rotated Sorted Array](#/practice/06-binary-search/search-in-rotated-sorted-array) — Medium
- [Koko Eating Bananas](#/practice/06-binary-search/koko-eating-bananas) — Medium

## Before moving on

- [ ] I can write the classic `lo <= hi` binary search without off-by-one bugs.
- [ ] I can state the loop invariant and explain why the loop terminates.
- [ ] I know when to use `lo < hi` with `hi = mid`, and why `mid` must round down there.
- [ ] I can explain why `(lo + hi) >> 1` breaks above `2^31 - 1` and what to use instead.
- [ ] I can turn a "minimum value that works" problem into binary search on the answer.
- [ ] I can check that a condition is monotonic before binary searching on it.
