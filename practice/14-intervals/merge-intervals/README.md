# Merge Intervals

You're given an array of `intervals`, where `intervals[i] = [start, end]`. Merge every group of overlapping intervals into one, and return the resulting list of non-overlapping intervals that covers exactly the same numbers.

Intervals that merely **touch** (like `[1,4]` and `[4,5]`) count as overlapping. The input is **not** necessarily sorted. Any order of the output intervals is accepted.

## Examples

```
Input:  intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
// [1,3] and [2,6] overlap, so they become [1,6]
```

```
Input:  intervals = [[1,4],[4,5]]
Output: [[1,5]]
// touching intervals merge
```

```
Input:  intervals = [[4,7],[1,4]]
Output: [[1,7]]
```

## Constraints

- `1 <= intervals.length <= 10^4`
- `intervals[i].length === 2`
- `0 <= start <= end <= 10^4`

## Hints

<details><summary>Hint 1</summary>

If the intervals were sorted by start, any interval that overlaps the "current merged block" would come right after it. So sort first — and remember that JS `sort()` needs a comparator for numbers.

</details>

<details><summary>Hint 2</summary>

After sorting, walk left to right. Compare each interval's start with the **end of the last merged interval**: if `start <= lastEnd`, they overlap; otherwise start a new block.

</details>

<details><summary>Hint 3</summary>

When merging, the new end is `Math.max(lastEnd, end)`, not just `end` — think `[1,10]` followed by `[2,3]`.

</details>
