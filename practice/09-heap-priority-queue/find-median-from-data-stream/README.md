# Find Median from Data Stream

The **median** of a sorted list is its middle value; if the list has an even length, it's the average of the two middle values. For `[2,3,4]` the median is `3`, and for `[2,3]` it's `2.5`.

Design a class that receives numbers one at a time and can report the median of everything seen so far:

- `new MedianFinder()` — starts empty.
- `addNum(num)` — adds an integer to the collection.
- `findMedian()` — returns the median of all numbers added so far (answers within `1e-5` of the true value are accepted).

## Examples

```
Input:
  ["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
  [[], [1], [2], [], [3], []]
Output:
  [null, null, null, 1.5, null, 2]

  after 1, 2    -> median (1 + 2) / 2 = 1.5
  after 1, 2, 3 -> median 2
```

## Constraints

- `-10^5 <= num <= 10^5`
- `findMedian` is only called when at least one number has been added.
- Up to `5 * 10^4` calls in total.

**Follow-up:** if every number were in the range `[0, 100]`, how could you make it even faster?

## Hints

<details><summary>Hint 1</summary>

Keeping a sorted array and inserting with binary search works, but each insert still shifts elements — `O(n)` per `addNum`. You only ever need the **middle** one or two values.

</details>

<details><summary>Hint 2</summary>

Split the numbers into a **lower half** and an **upper half**. Keep the lower half in a **max-heap** (its top is the biggest small number) and the upper half in a **min-heap** (its top is the smallest big number).

</details>

<details><summary>Hint 3</summary>

After each `addNum`, rebalance so the lower half has the same size as the upper half or exactly one more. Then the median is either the lower top, or the average of both tops. A simple way to add: push to the lower heap, move its top to the upper heap, and if the upper heap got bigger, move its top back.

</details>
