# Interval List Intersections

You get two lists of closed intervals, `firstList` and `secondList`. Within each list, the intervals are pairwise disjoint and sorted.

Return every intersection between an interval of the first list and an interval of the second, in sorted order. The intersection of two closed intervals is either empty or another closed interval — for example, `[1,3]` and `[2,4]` intersect in `[2,3]`, and `[1,5]` and `[5,8]` intersect in the single point `[5,5]`.

## Examples

```
Input:  firstList  = [[0,2],[5,10],[13,23],[24,25]]
        secondList = [[1,5],[8,12],[15,24],[25,26]]
Output: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
```

```
Input:  firstList = [[1,3],[5,9]], secondList = []
Output: []
```

## Constraints

- `0 <= firstList.length, secondList.length <= 1000`
- `firstList.length + secondList.length >= 1`
- `0 <= start < end <= 10^9`
- Within each list, every interval ends before the next one starts.

## Hints

<details><summary>Hint 1</summary>

Two intervals `a` and `b` intersect in `[max(a[0], b[0]), min(a[1], b[1])]` — and that's a real interval only when the left side is `<=` the right side.

</details>

<details><summary>Hint 2</summary>

Checking every pair is O(m · n). Both lists are sorted, so use two pointers `i` and `j`, like merging two sorted arrays.

</details>

<details><summary>Hint 3</summary>

After comparing `firstList[i]` and `secondList[j]`, advance the pointer of whichever interval **ends first** — it can't intersect anything further along the other list.

</details>
