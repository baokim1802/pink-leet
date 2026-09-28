# Insert Interval

You're given a list of non-overlapping `intervals`, already **sorted by start**, and one more interval `newInterval = [start, end]`.

Insert `newInterval` so that the list stays sorted by start and still has no overlapping intervals — merge anything that overlaps it (touching intervals count as overlapping). Return the resulting list.

You may build and return a new array; you don't have to modify `intervals` in place.

## Examples

```
Input:  intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]
```

```
Input:  intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
// [4,8] overlaps [3,5], [6,7] and [8,10]
```

```
Input:  intervals = [], newInterval = [5,7]
Output: [[5,7]]
```

## Constraints

- `0 <= intervals.length <= 10^4`
- `intervals[i].length === 2`, `0 <= start <= end <= 10^5`
- `intervals` is sorted by start and has no overlaps.
- `newInterval.length === 2`, `0 <= start <= end <= 10^5`

## Hints

<details><summary>Hint 1</summary>

You could push `newInterval` and run Merge Intervals (O(n log n)), but the input is already sorted — one O(n) pass is enough.

</details>

<details><summary>Hint 2</summary>

Split the walk into three phases: intervals that end **before** `newInterval` starts (copy them), intervals that overlap it (absorb them), and intervals that start **after** it ends (copy them).

</details>

<details><summary>Hint 3</summary>

While absorbing, grow the new interval: `start = min(start, cur[0])`, `end = max(end, cur[1])`. Push it once, between phase 2 and phase 3.

</details>
