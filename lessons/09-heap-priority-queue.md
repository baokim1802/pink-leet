# Heap / Priority Queue

## The big idea

A **priority queue** is a bag of items where you can always grab the **most important** one quickly — the smallest, the largest, the earliest deadline, the closest point. A **heap** is the classic way to build one.

The trick is that a heap does *not* keep everything sorted. It only promises one thing: **every parent is ≤ its children** (for a min-heap). That weak promise is cheap to maintain, and it's enough to guarantee the minimum is always sitting at the top.

| Operation | Sorted array | Heap |
| --- | --- | --- |
| Peek at min | `O(1)` | `O(1)` |
| Remove min | `O(1)` from the end / `O(n)` from the front | `O(log n)` |
| Insert | `O(n)` (shift to make room) | `O(log n)` |

So when items keep **arriving** and you keep **taking the best one**, a heap wins.

## How to recognize it

- "**k-th** largest / smallest", "**top k**", "**k closest**" → a heap of size `k`.
- "Repeatedly take the two biggest / smallest and ..." → simulation with a heap.
- "Merge **k** sorted lists/arrays" → heap holding the current front of each list.
- "Median of a stream" → two heaps (a max-heap for the lower half, a min-heap for the upper half).
- Scheduling: "process tasks in order of deadline/cost", Dijkstra's shortest path → priority queue.

## JavaScript toolkit

**JavaScript has no built-in heap.** No `PriorityQueue`, no `heapq`. You have three options:

1. **On LeetCode**, the environment ships `@datastructures-js/priority-queue`, exposing globals like `MinPriorityQueue`, `MaxPriorityQueue` and `PriorityQueue` (with a comparator). The exact API has changed between versions (older versions return `{ element, priority }` objects from `dequeue()`, newer ones return the value directly), so check before relying on it.
2. **In an interview**, you may be asked to write one yourself, or the interviewer may let you say "assume I have a heap with push/pop/peek". Ask! Either way, **you should be able to write your own** in about 5 minutes.
3. **Sometimes sorting is good enough.** If all the data is known up front and you need everything in order (or `k` is close to `n`), `arr.sort((a, b) => a - b)` in `O(n log n)` is simpler and fast. A heap earns its keep when data **streams in**, when you only need the top `k` of a huge `n` (`O(n log k)`), or when new items appear mid-process (simulation, Dijkstra).

Remember: `sort()` without a comparator sorts **as strings** — `[10, 9, 1].sort()` gives `[1, 10, 9]`. Always pass `(a, b) => a - b`.

### How a heap lives in an array

A heap is a complete binary tree stored level by level in a plain array — no node objects needed:

```
index:   0  1  2  3  4  5
array:  [1, 3, 2, 7, 4, 5]

            1          <- index 0 is always the min
          /   \
         3     2
        / \   /
       7   4 5
```

For the node at index `i`:

- parent: `(i - 1) >> 1` (that's `Math.floor((i - 1) / 2)`)
- left child: `2 * i + 1`
- right child: `2 * i + 2`

## Template

A full min-heap with a comparator. Pass `(a, b) => b - a` to get a max-heap, or compare by a field (`(a, b) => a.dist - b.dist`) to heap objects.

```js
class MinHeap {
  // compare(a, b) < 0 means a should come out before b
  constructor(compare = (a, b) => a - b) {
    this.data = [];
    this.compare = compare;
  }

  size() {
    return this.data.length;
  }

  peek() {
    return this.data.length ? this.data[0] : null;
  }

  push(value) {
    this.data.push(value);          // add at the bottom...
    this.siftUp(this.data.length - 1); // ...and bubble up
  }

  pop() {
    const a = this.data;
    if (!a.length) return null;
    const top = a[0];
    const last = a.pop();           // take the last leaf
    if (a.length) {
      a[0] = last;                  // put it at the root...
      this.siftDown(0);             // ...and let it sink
    }
    return top;
  }

  siftUp(i) {
    const a = this.data;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.compare(a[i], a[parent]) >= 0) break; // parent already first: done
      [a[i], a[parent]] = [a[parent], a[i]];
      i = parent;
    }
  }

  siftDown(i) {
    const a = this.data;
    const n = a.length;
    while (true) {
      const left = 2 * i + 1;
      const right = left + 1;
      let best = i;
      if (left < n && this.compare(a[left], a[best]) < 0) best = left;
      if (right < n && this.compare(a[right], a[best]) < 0) best = right;
      if (best === i) break;        // both children are "later": done
      [a[i], a[best]] = [a[best], a[i]];
      i = best;
    }
  }
}

const maxHeap = new MinHeap((a, b) => b - a); // same class, flipped comparator
```

Why the costs are what they are: a complete tree with `n` nodes has height `log n`, and `siftUp`/`siftDown` move at most one level per swap.

### The "top k" pattern

To keep the `k` **largest** items, use a **min**-heap of size `k` (yes, the opposite one). Its top is the weakest of your champions, so it's the one to kick out when a better candidate arrives.

```js
const heap = new MinHeap();
for (const x of nums) {
  heap.push(x);
  if (heap.size() > k) heap.pop(); // drop the smallest of the k+1
}
// heap holds the k largest; heap.peek() is the k-th largest
```

Symmetric rule: `k` **smallest** / closest → **max**-heap of size `k`.

## Worked example

**Merge k sorted arrays** into one sorted array (the array version of LeetCode 23, "Merge k Sorted Lists").

Input: `[[1, 4, 7], [2, 5], [0, 6, 9]]`

Idea: the next output value is always the smallest among the **current fronts** of the arrays. Keep those fronts in a min-heap as `[value, whichArray, indexInArray]`, pop the smallest, then push the next element from the same array.

```js
function mergeKSorted(arrays) {
  const heap = new MinHeap((a, b) => a[0] - b[0]);
  arrays.forEach((arr, r) => { if (arr.length) heap.push([arr[0], r, 0]); });
  const out = [];
  while (heap.size()) {
    const [val, r, i] = heap.pop();
    out.push(val);
    if (i + 1 < arrays[r].length) heap.push([arrays[r][i + 1], r, i + 1]);
  }
  return out;
}
```

Trace (heap contents shown as values only, smallest first for readability):

| Step | Pop | From array | Push next | Heap after | Output so far |
| --- | --- | --- | --- | --- | --- |
| start | – | – | 1, 2, 0 | 0, 1, 2 | `[]` |
| 1 | 0 | #2 | 6 | 1, 2, 6 | `[0]` |
| 2 | 1 | #0 | 4 | 2, 4, 6 | `[0,1]` |
| 3 | 2 | #1 | 5 | 4, 5, 6 | `[0,1,2]` |
| 4 | 4 | #0 | 7 | 5, 6, 7 | `[0,1,2,4]` |
| 5 | 5 | #1 | (done) | 6, 7 | `[0,1,2,4,5]` |
| 6 | 6 | #2 | 9 | 7, 9 | `[...,6]` |
| 7 | 7 | #0 | (done) | 9 | `[...,7]` |
| 8 | 9 | #2 | (done) | empty | `[0,1,2,4,5,6,7,9]` |

The heap never holds more than `k` items, so with `N` total elements this is `O(N log k)` — better than concatenating and sorting (`O(N log N)`) when `k` is small.

## Complexity cheat sheet

| Operation | Time | Notes |
| --- | --- | --- |
| `peek` | `O(1)` | the root |
| `push` | `O(log n)` | sift up |
| `pop` | `O(log n)` | sift down |
| Build heap by pushing `n` items | `O(n log n)` | (a bottom-up "heapify" is `O(n)`) |
| Top `k` of `n` with size-`k` heap | `O(n log k)` time, `O(k)` space | |
| Sort then slice | `O(n log n)` time | simpler; fine when `k ≈ n` or data is static |
| Merge `k` sorted lists, `N` total | `O(N log k)` | |

## Common mistakes

- **Using the wrong heap direction for top k.** `k` largest → min-heap; `k` smallest → max-heap.
- **Forgetting the one-element case in `pop`.** If you `a.pop()` the last item and then write it back into `a[0]`, you resurrect it. Only move `last` to the root if the array is still non-empty.
- **Only comparing with one child in `siftDown`.** You must swap with the *smaller* (or better) of the two children, otherwise the heap property breaks.
- **Off-by-one index math.** Parent is `(i - 1) >> 1`, not `i >> 1` (that's for 1-indexed heaps).
- **Assuming a heap is sorted.** Only `data[0]` is guaranteed; `data[1]` is *not* necessarily the second smallest. To get sorted output, pop repeatedly.
- **Default `sort()`** on numbers sorts lexicographically. Always pass a comparator.
- **Comparator subtraction with huge values** is fine for normal integers, but for strings use `a < b ? -1 : a > b ? 1 : 0`.

## Practice

- [Implement a Min Heap](#/practice/09-heap-priority-queue/implement-min-heap) — Easy
- [Kth Largest Element in a Stream](#/practice/09-heap-priority-queue/kth-largest-element-in-a-stream) — Easy
- [Last Stone Weight](#/practice/09-heap-priority-queue/last-stone-weight) — Easy
- [K Closest Points to Origin](#/practice/09-heap-priority-queue/k-closest-points-to-origin) — Medium

## Before moving on

- [ ] I can write a `MinHeap` class (push, pop, peek, size, siftUp, siftDown) from memory in a few minutes.
- [ ] I can recite the parent/child index formulas for an array-backed heap.
- [ ] I can turn my min-heap into a max-heap or an object heap by changing only the comparator.
- [ ] I know which heap direction to use for "k largest" vs "k smallest", and why.
- [ ] I can explain when sorting is good enough and when a heap is worth it.
- [ ] I know LeetCode offers `MinPriorityQueue` / `MaxPriorityQueue`, but I don't depend on it.
