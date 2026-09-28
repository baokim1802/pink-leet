# Sliding Window

## The big idea

Lots of problems ask about a **contiguous** piece of an array or string: "the longest substring that…", "the smallest subarray whose sum…", "the best average over any 5 days…". The brute force tries every start and every end, which is `O(n²)` (or worse, if you re-scan each piece).

A sliding window is smarter. You keep two pointers, `left` and `right`, that mark the current piece `[left, right]`. Then you **reuse work**: when the window moves by one step, you only update your bookkeeping for the one element that came in and the one that went out. Nothing gets recomputed from scratch.

Because `left` and `right` only ever move **forward**, each element enters the window once and leaves once. That's `O(n)` total, even when there's a `while` loop nested inside the `for` loop.

There are two flavours:

- **Fixed window** — the size `k` is given. Slide it one step at a time: add `nums[right]`, remove `nums[right - k]`.
- **Variable window** — the size is what you're solving for. Expand `right` to grow the window; when it becomes *invalid* (or *valid*, depending on the problem), shrink it from `left`.

> Think of a caterpillar: the head (`right`) stretches forward, then the tail (`left`) catches up. It never walks backwards.

## How to recognize it

- The problem says **substring**, **subarray**, or **consecutive** / **contiguous**.
- You're asked for the **longest / shortest / maximum / minimum** window satisfying a condition.
- The condition can be updated incrementally: sums, counts of characters, "number of distinct values", "is there a duplicate?".
- The condition is **monotonic** in the window: if a window is invalid, making it bigger won't fix it (or, if it's valid, making it bigger keeps it valid). That's what makes "shrink from the left" safe.

Red flags that it's *not* a plain sliding window:

- **Subsequence** (you may skip elements) — usually DP instead.
- Arrays with **negative numbers** and a sum condition — growing the window doesn't always grow the sum, so the monotonic property breaks. Prefix sums + a hash map usually win there.

## JavaScript toolkit

| Tool | Use it for | Notes |
| --- | --- | --- |
| `new Map()` | character/number → count | `map.get(k) || 0` for a default; `.size` counts distinct keys, but only if you `delete` keys whose count hits 0 |
| `new Set()` | "is this already in the window?" | `add`, `has`, `delete` are all `O(1)` average |
| `new Array(26).fill(0)` | counts for lowercase letters only | index with `s.charCodeAt(i) - 97`; faster than a Map, but only if the alphabet is known |
| `s[i]` / `s.charCodeAt(i)` | read a character | `O(1)`; strings are immutable, so never build the window with `+=` just to inspect it |
| `s.slice(a, b)` | produce the final answer | `O(b - a)` — call it **once at the end**, not every step |
| `Math.max` / `Math.min` | track the best window | Start with `0`, `-Infinity`, or `Infinity` as appropriate |

Gotchas:

- A plain object `{}` works for counts too, but a `Map` avoids prototype surprises (a key like `"constructor"`) and has a real `.size`.
- `map.size` doesn't shrink when a count drops to `0`. If you use `size` as "number of distinct characters in the window", call `map.delete(ch)` when the count reaches zero.
- `for (const ch of s)` is handy, but you usually need the index too — a classic `for (let right = 0; ...)` loop is clearer for windows.

## Template

**Fixed window of size `k`:**

```js
function fixedWindow(nums, k) {
  let windowSum = 0;
  let best = -Infinity;
  for (let right = 0; right < nums.length; right++) {
    windowSum += nums[right];                 // element enters
    if (right >= k) windowSum -= nums[right - k]; // element leaves
    if (right >= k - 1) best = Math.max(best, windowSum); // window is full
  }
  return best;
}
```

**Variable window (expand / shrink):**

```js
function variableWindow(s) {
  const counts = new Map();
  let left = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    // 1. Expand: bring s[right] into the window
    const inChar = s[right];
    counts.set(inChar, (counts.get(inChar) || 0) + 1);

    // 2. Shrink: while the window is invalid, drop s[left]
    while (/* window is invalid */ false) {
      const outChar = s[left];
      counts.set(outChar, counts.get(outChar) - 1);
      if (counts.get(outChar) === 0) counts.delete(outChar);
      left++;
    }

    // 3. Record: the window [left, right] is valid here
    best = Math.max(best, right - left + 1);
  }
  return best;
}
```

Two variations of step 2/3 you'll meet:

- **Longest valid window**: shrink *while invalid*, then record after the loop (as above).
- **Shortest valid window**: shrink *while valid*, and record **inside** the `while` loop, before removing `s[left]`.

## Worked example

**Problem:** given an array of positive integers `nums` and a number `target`, return the length of the **shortest** subarray whose sum is `>= target` (or `0` if none). (This is LeetCode 209, *Minimum Size Subarray Sum*.)

All numbers are positive, so growing the window grows the sum and shrinking shrinks it — the condition is monotonic. This is the "shortest valid window" variation.

```js
function minSubArrayLen(target, nums) {
  let left = 0;
  let sum = 0;
  let best = Infinity;
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    while (sum >= target) {            // valid: try to shrink
      best = Math.min(best, right - left + 1);
      sum -= nums[left++];
    }
  }
  return best === Infinity ? 0 : best;
}
```

Trace with `target = 7`, `nums = [2, 3, 1, 2, 4, 3]`:

| right | add | window | sum | action | best |
| --- | --- | --- | --- | --- | --- |
| 0 | 2 | [2] | 2 | too small | ∞ |
| 1 | 3 | [2,3] | 5 | too small | ∞ |
| 2 | 1 | [2,3,1] | 6 | too small | ∞ |
| 3 | 2 | [2,3,1,2] | 8 | valid → record 4, drop 2 → sum 6 | 4 |
| 4 | 4 | [3,1,2,4] | 10 | record 4, drop 3 → 7; record 3, drop 1 → 6 | 3 |
| 5 | 3 | [2,4,3] | 9 | record 3, drop 2 → 7; record 2, drop 4 → 3 | 2 |

Answer: `2` (the subarray `[4, 3]`). Notice `left` moved from 0 to 4 over the whole run — never backwards — so the total work is still `O(n)`.

## Complexity cheat sheet

| Pattern | Time | Space |
| --- | --- | --- |
| Brute force over all windows | `O(n²)` – `O(n³)` | `O(1)` |
| Fixed window of size `k` | `O(n)` | `O(1)` |
| Variable window with running sum | `O(n)` | `O(1)` |
| Variable window with `Map`/`Set` of counts | `O(n)` | `O(k)` distinct values |
| Counts in a 26-slot array | `O(n)` | `O(1)` |

## Common mistakes

- **Off-by-one on the window length.** `[left, right]` inclusive has length `right - left + 1`.
- **Recording in the wrong place.** For "longest", record after shrinking; for "shortest", record inside the shrink loop.
- **Moving `left` backwards.** If you jump `left` to a stored index (like "last seen position"), use `left = Math.max(left, ...)`.
- **Forgetting to undo bookkeeping** when an element leaves — decrement its count, subtract it from the sum, delete zero counts.
- **Slicing inside the loop.** `s.slice()` every step turns `O(n)` into `O(n²)`. Store `start` and `length`, slice once at the end.
- **Using a sliding window with negative numbers** in a sum problem — the shrink logic stops being correct.

## Practice

- [Best Time to Buy and Sell Stock](#/practice/04-sliding-window/best-time-to-buy-and-sell-stock) — Easy
- [Longest Substring Without Repeating Characters](#/practice/04-sliding-window/longest-substring-without-repeating-characters) — Medium
- [Minimum Window Substring](#/practice/04-sliding-window/minimum-window-substring) — Hard

## Before moving on

- [ ] I can explain why a window where `left` and `right` only move forward is `O(n)`, even with a nested `while`.
- [ ] I can tell a fixed-window problem from a variable-window problem.
- [ ] I can write the expand / shrink / record template from memory.
- [ ] I know when to record inside the shrink loop (shortest) vs after it (longest).
- [ ] I can keep character counts in a `Map` and remove keys that drop to zero.
- [ ] I can spot when sliding window *doesn't* apply (subsequences, negative numbers with sums).
