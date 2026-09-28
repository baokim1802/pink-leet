# Non-overlapping Intervals

Given an array of `intervals` where `intervals[i] = [start, end]`, return the **minimum number of intervals to remove** so that the ones left don't overlap.

Here, intervals that only **touch** do *not* overlap: `[1,2]` and `[2,3]` can both stay.

## Examples

```
Input:  intervals = [[1,2],[2,3],[3,4],[1,3]]
Output: 1
// remove [1,3]; the rest only touch
```

```
Input:  intervals = [[1,2],[1,2],[1,2]]
Output: 2
```

```
Input:  intervals = [[1,2],[2,3]]
Output: 0
```

## Constraints

- `1 <= intervals.length <= 10^5`
- `intervals[i].length === 2`
- `-5 * 10^4 <= start < end <= 5 * 10^4`

## Hints

<details><summary>Hint 1</summary>

Flip the question: removing the fewest intervals is the same as **keeping the most** non-overlapping intervals. Answer = `n - kept`.

</details>

<details><summary>Hint 2</summary>

Which interval should you keep first? The one that **ends earliest** — it leaves the most room for everything after it.

</details>

<details><summary>Hint 3</summary>

Sort by end. Walk through, keeping an interval whenever its start is `>= lastEnd` (then update `lastEnd`), and counting it as removed otherwise.

</details>
