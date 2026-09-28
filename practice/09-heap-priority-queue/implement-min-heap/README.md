# Implement a Min Heap

JavaScript has no built-in heap, so in interviews you often have to bring your own. Build a class `MinHeap` that stores numbers and always gives back the **smallest** one first.

- `new MinHeap()` — creates an empty heap.
- `push(x)` — adds the number `x`.
- `pop()` — removes and returns the smallest number, or `null` if the heap is empty.
- `peek()` — returns the smallest number *without* removing it, or `null` if the heap is empty.
- `size()` — returns how many numbers are in the heap.

`push` and `pop` must run in `O(log n)`; `peek` and `size` in `O(1)`. (This one isn't on LeetCode. It's the building block for the rest of this topic.)

## Examples

```
Input:
  ["MinHeap", "push", "push", "push", "peek", "pop", "pop", "size"]
  [[],        [5],    [3],    [8],    [],     [],    [],    []]
Output:
  [null,      null,   null,   null,   3,      3,     5,     1]
```

```
Input:
  ["MinHeap", "pop", "peek", "size"]
  [[],        [],    [],     []]
Output:
  [null,      null,  null,   0]
```

## Constraints

- Values are integers in `[-10^9, 10^9]`; duplicates are allowed.
- Up to `10^4` calls in total.

## Hints

<details><summary>Hint 1</summary>

Store the heap in a plain array. For the node at index `i`: parent is `(i - 1) >> 1`, children are `2i + 1` and `2i + 2`. The minimum is always at index `0`.

</details>

<details><summary>Hint 2</summary>

`push`: append to the end, then **sift up** — swap with the parent while it's smaller than the parent.

</details>

<details><summary>Hint 3</summary>

`pop`: remember `arr[0]`, move the **last** element into slot `0` (via `arr.pop()`), then **sift down** — swap with the smaller child while a child is smaller. Watch out for the heap that has exactly one element.

</details>
