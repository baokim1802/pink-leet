# Intervals

## The big idea

An interval is just a pair `[start, end]`: a meeting from 9 to 10, a balloon spanning x = 2..8, a range of numbers. Interval problems ask things like *do any of these clash?*, *squash the overlapping ones together*, *how few do I need to remove?*, or *where do two schedules overlap?*

Almost all of them become easy after one move: **sort**. A pile of unsorted intervals is chaos, because any interval might overlap any other, so you'd have to check O(n²) pairs. Once they're sorted by start, an interval can only overlap the ones **right next to it** in the order. After that, a single left-to-right sweep does the rest.

Which key you sort by depends on the question:

- **Sort by start** when you're *combining* intervals (merge, insert, check for clashes).
- **Sort by end** when you're *choosing* intervals greedily (keep the most, stab them with the fewest points). Picking whatever finishes first leaves the most room for everything after it.

When the input is **already sorted** (two sorted lists, a sorted array), skip the sort and walk it with one or two pointers in O(n).

## How to recognize it

- Input looks like `[[1,3],[2,6],[8,10]]`: pairs of start/end values.
- Words like *meetings, schedules, bookings, ranges, time slots, overlapping, conflicting, covering, free time*.
- "Merge / combine overlapping…" → sort by start, sweep.
- "Minimum number to remove so none overlap" / "maximum number of non-overlapping…" → sort by end, greedy.
- "Minimum number of points/arrows/rooms to cover…" → sort by end (points), or a sweep over start/end events (rooms).
- "Intersection of two sorted interval lists" → two pointers.
- A sorted array of numbers where you group **consecutive runs** is the same idea in disguise: each run is an interval.

## JavaScript toolkit

| Idiom | Use | Notes |
|---|---|---|
| `arr.sort((a, b) => a[0] - b[0])` | sort intervals by start | Sorts **in place** and returns the same array. O(n log n). |
| `arr.sort((a, b) => a[1] - b[1])` | sort by end | For greedy "keep/stab the most" problems. |
| `const [start, end] = interval` | destructuring | Much easier to read than `interval[0]`, `interval[1]`. |
| `out[out.length - 1]` or `out.at(-1)` | last merged interval | Mutating it (`last[1] = ...`) updates the array in place. |
| `Math.max(a, b)` / `Math.min(a, b)` | combine ends | Merged end = max of ends; intersection = [max of starts, min of ends]. |

**Tie-breaks:** to sort by start and then by end, chain the comparisons with `||`. It falls through to the second key only when the first difference is `0`:

```js
intervals.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
```

**Sorting reminder:** `[[10, 1], [9, 2]].sort()` with **no comparator** converts every element to a *string* and compares them lexicographically: `"10,1" < "9,2"`, so `[10,1]` comes first. Always pass a comparator for numbers. Subtraction comparators are safe in JS even for values near ±2³¹, because numbers are doubles and don't overflow the way 32-bit ints do in Java or C++.

**Mutation:** `sort` rearranges the caller's array. That's usually fine in an interview, but say it out loud, or copy first with `[...intervals].sort(...)`.

## The overlap test

Two closed intervals `a` and `b` overlap exactly when **each starts before the other ends**:

```js
const overlaps = (a, b) => a[0] <= b[1] && b[0] <= a[1];
```

It's easier to think about the opposite: they *don't* overlap when one ends before the other starts (`a[1] < b[0] || b[1] < a[0]`). Negate that and you get the test above.

Two details decide a lot of edge cases:

- **Touching.** With `<=`, `[1,4]` and `[4,5]` overlap (they share the point 4). Some problems, like meeting schedules, say a meeting ending at 4 and one starting at 4 **don't** clash. Then use `<`. Read the statement carefully and check the examples.
- **After sorting by start**, `a[0] <= b[0]` is already true, so the test shrinks to `b[0] <= a[1]`: does the next interval start before the current one ends?

The **intersection** of two overlapping intervals is `[Math.max(a[0], b[0]), Math.min(a[1], b[1])]`. If that start is greater than that end, they didn't overlap at all.

## Template

### Sort by start, then sweep and merge

```js
function mergeAll(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const out = [];
  for (const [start, end] of intervals) {
    const last = out[out.length - 1];
    if (last && start <= last[1]) {
      last[1] = Math.max(last[1], end); // overlap: stretch the last block
    } else {
      out.push([start, end]);           // gap: start a new block
    }
  }
  return out;
}
```

Why `Math.max`? The next interval might sit entirely inside the current block (`[1,10]` then `[2,3]`). Setting `last[1] = end` would shrink the block to `[1,3]`, which is wrong.

### Sort by end, greedy choose

```js
function maxNonOverlapping(intervals) {
  intervals.sort((a, b) => a[1] - b[1]);
  let count = 0;
  let lastEnd = -Infinity;
  for (const [start, end] of intervals) {
    if (start >= lastEnd) { // fits after the last chosen one (touching allowed)
      count++;
      lastEnd = end;
    }
  }
  return count;
}
```

The greedy argument: among all intervals, the one that **ends first** is always a safe first pick. Anything you could fit after some other first choice also fits after this one, since it frees up the timeline earliest. Repeat on what's left.

### Sweep line over events

When the question is "how many intervals are active at the busiest moment?", split each interval into two events and sort them:

```js
function maxActive(intervals) {
  const starts = intervals.map((i) => i[0]).sort((a, b) => a - b);
  const ends = intervals.map((i) => i[1]).sort((a, b) => a - b);
  let active = 0, best = 0, e = 0;
  for (const s of starts) {
    while (e < ends.length && ends[e] <= s) { active--; e++; } // free up finished ones
    active++;
    best = Math.max(best, active);
  }
  return best;
}
```

(`ends[e] <= s` treats "ends at 4, starts at 4" as no clash. Use `<` if touching counts.)

### Two pointers over two sorted lists

```js
let i = 0, j = 0;
while (i < A.length && j < B.length) {
  const lo = Math.max(A[i][0], B[j][0]);
  const hi = Math.min(A[i][1], B[j][1]);
  if (lo <= hi) { /* A[i] and B[j] overlap on [lo, hi] */ }
  if (A[i][1] < B[j][1]) i++; else j++; // drop whichever ends first
}
```

The interval that ends first can't overlap anything further along the other list, so it's safe to move past it.

## Worked example

**Meeting Rooms** (LeetCode 252): given meeting times `[start, end]`, can one person attend **all** of them? A meeting ending at 10 and another starting at 10 don't clash.

The question is "does *any* pair overlap?" Checking every pair is O(n²). Sort by start instead: if any clash exists, some meeting must clash with the **one right after it** in sorted order.

Input: `[[7,10],[2,4],[15,20],[9,12]]`

1. Sort by start → `[[2,4],[7,10],[9,12],[15,20]]`.
2. Compare each meeting with the previous one:

| Previous | Current | `current.start < previous.end`? | Verdict |
|---|---|---|---|
| `[2,4]` | `[7,10]` | 7 < 4? no | fine |
| `[7,10]` | `[9,12]` | 9 < 10? **yes** | clash! |

3. Stop early → `false`. With `[[2,4],[4,6]]` instead: `4 < 4` is false, so touching meetings are fine → `true`.

```js
function canAttendMeetings(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i - 1][1]) return false; // starts before the previous ends
  }
  return true;
}
```

Time O(n log n) for the sort, then an O(n) sweep. Notice the strict `<`: this problem says touching is *not* a clash. That one character is the whole difference between "touching overlaps" and "touching is fine".

Follow-up to think about: *how many rooms* would you need to hold all the meetings? That's the sweep-line template above: the busiest moment is the answer.

## Complexity cheat sheet

| Task | Approach | Time | Space |
|---|---|---|---|
| Any overlaps? / merge overlapping | sort by start + sweep | O(n log n) | O(n) output |
| Insert into an already sorted list | one pass, three phases | O(n) | O(n) output |
| Max non-overlapping / min removals | sort by end + greedy | O(n log n) | O(1) extra |
| Min points to stab all intervals | sort by end + greedy | O(n log n) | O(1) extra |
| Max simultaneously active (rooms) | sorted starts/ends sweep, or min-heap of ends | O(n log n) | O(n) |
| Intersect two sorted lists | two pointers | O(m + n) | O(1) extra |
| Group consecutive runs in a sorted array | one pass | O(n) | O(1) extra |

## Common mistakes

- **Forgetting to sort**, or sorting with no comparator (lexicographic string sort!).
- **Sorting by the wrong key.** Merging wants start; greedy "keep the most" wants end. Sorting by start for the greedy fails on `[[1,100],[2,3],[4,5]]`: the long interval comes first and blocks everything.
- **`last[1] = end` instead of `Math.max(last[1], end)`** when merging a nested interval.
- **Getting touching wrong.** Decide `<` vs `<=` from the problem statement and check it against the examples.
- **Pushing a reference and then mutating it.** `out.push(interval)` followed by `last[1] = ...` also changes the caller's input. Push a copy (`[start, end]`) if that matters.
- **Forgetting the empty input** or the final block that's still open when the loop ends (common when grouping runs).
- **Moving the wrong pointer** in two-list problems. Advance the one that **ends** first, not the one that starts first.

## Practice

- [Summary Ranges](#/practice/14-intervals/summary-ranges) — Easy
- [Merge Intervals](#/practice/14-intervals/merge-intervals) — Medium
- [Insert Interval](#/practice/14-intervals/insert-interval) — Medium
- [Non-overlapping Intervals](#/practice/14-intervals/non-overlapping-intervals) — Medium
- [Minimum Number of Arrows to Burst Balloons](#/practice/14-intervals/minimum-number-of-arrows-to-burst-balloons) — Medium
- [Interval List Intersections](#/practice/14-intervals/interval-list-intersections) — Medium

## Before moving on

- [ ] I can write the overlap test from memory and explain why it works.
- [ ] I know when touching intervals count as overlapping, and I check it against the examples.
- [ ] I can sort intervals with a correct numeric comparator, including a tie-break.
- [ ] I can merge intervals with one sort and one sweep.
- [ ] I can explain why "sort by end, take what fits" is the right greedy choice.
- [ ] I can walk two sorted interval lists with two pointers.
- [ ] I can count the maximum number of overlapping intervals with a sweep line.
