# Kth Largest Element in a Stream

Design a class that watches a stream of numbers and can always tell you the **`k`-th largest** value seen so far (counting duplicates — it's the `k`-th largest in sorted order, not the `k`-th distinct value).

- `new KthLargest(k, nums)` — starts with the integer `k` and an initial array `nums`.
- `add(val)` — adds `val` to the stream and returns the current `k`-th largest element.

## Examples

```
Input:
  ["KthLargest", "add", "add", "add", "add", "add"]
  [[3, [4,5,8,2]], [3], [5], [10], [9], [4]]
Output:
  [null, 4, 5, 5, 8, 8]

  add(3)  -> stream 8,5,4,3,2        -> 3rd largest is 4
  add(5)  -> stream 8,5,5,4,3,2      -> 5
  add(10) -> stream 10,8,5,5,...     -> 5
  add(9)  -> stream 10,9,8,5,...     -> 8
  add(4)  -> stream 10,9,8,5,5,4,... -> 8
```

## Constraints

- `1 <= k <= 10^4`
- `0 <= nums.length <= 10^4`
- `-10^4 <= nums[i], val <= 10^4`
- Up to `10^4` calls to `add`.
- Whenever `add` is called, the stream holds at least `k` numbers.

## Hints

<details><summary>Hint 1</summary>

Sorting after every `add` works but costs `O(n log n)` per call. You only care about the top `k` values — everything smaller can be thrown away forever.

</details>

<details><summary>Hint 2</summary>

Keep a **min-heap of size `k`** holding the `k` largest values so far. Its top (the smallest of the big ones) is exactly the `k`-th largest.

</details>

<details><summary>Hint 3</summary>

On `add`: push the value; if the heap now has more than `k` items, pop the smallest. Then return `peek()`. Reuse your `MinHeap` from the first problem!

</details>
