# Stack, Queue & Heap

## Stack (LIFO)
```js
const stack = [];
stack.push(x);                  // O(1)
stack.pop();                    // O(1) → undefined if empty
stack[stack.length - 1];        // peek (or stack.at(-1))
stack.length === 0;             // empty?
```

## Queue (FIFO), fast version
`shift()` is O(n). Use a head pointer instead.
```js
const queue = [start];
let head = 0;
while (head < queue.length) {
  const node = queue[head++];   // dequeue, O(1)
  queue.push(next);             // enqueue
}
```

## BFS level by level
```js
let level = [start];
while (level.length) {
  const next = [];
  for (const node of level) {
    // visit node, push neighbors into next
  }
  level = next;
}
```

## Monotonic stack (next greater)
```js
const res = new Array(n).fill(-1);
const st = [];                          // indices, values decreasing
for (let i = 0; i < n; i++) {
  while (st.length && a[st.at(-1)] < a[i]) res[st.pop()] = a[i];
  st.push(i);
}
```

## Heap: no built-in 😢
Quick fix when data is small or static: sort.
```js
a.sort((x, y) => x - y);        // min at a[0]
a.sort((x, y) => y - x);        // max at a[0]
```
On LeetCode you can use `MinPriorityQueue` / `MaxPriorityQueue` from `@datastructures-js/priority-queue`. In an interview, be ready to write your own (next section).

## MinHeap (copy-paste)
```js
class MinHeap {
  constructor(cmp = (a, b) => a - b) { this.h = []; this.cmp = cmp; }
  get size() { return this.h.length; }
  peek() { return this.h[0]; }
  push(x) {
    const h = this.h;
    h.push(x);
    let i = h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.cmp(h[i], h[p]) >= 0) break;
      [h[i], h[p]] = [h[p], h[i]];
      i = p;
    }
  }
  pop() {
    const h = this.h;
    if (!h.length) return undefined;
    const top = h[0];
    const last = h.pop();
    if (h.length) {
      h[0] = last;
      let i = 0;
      while (true) {
        const l = 2 * i + 1, r = l + 1;
        let m = i;
        if (l < h.length && this.cmp(h[l], h[m]) < 0) m = l;
        if (r < h.length && this.cmp(h[r], h[m]) < 0) m = r;
        if (m === i) break;
        [h[i], h[m]] = [h[m], h[i]];
        i = m;
      }
    }
    return top;
  }
}
```

## Heap: usage
```js
const minH = new MinHeap();
const maxH = new MinHeap((a, b) => b - a);          // max-heap
const byDist = new MinHeap((a, b) => a.d - b.d);    // by a field
const byPair = new MinHeap((a, b) => a[0] - b[0]);  // [priority, value]
minH.push(5); minH.peek(); minH.pop(); minH.size;
```
