/**
 * K Closest Points to Origin — max-heap of size k keyed by squared distance.
 * Time O(n log k), Space O(k)
 *
 * The heap's top is the farthest of the current k candidates. Whenever the
 * heap exceeds k, evict that farthest point. The survivors are the answer.
 * (Sorting by distance and slicing is a fine O(n log n) alternative.)
 */
class Heap {
  constructor(compare) {
    this.a = [];
    this.cmp = compare; // cmp(a, b) < 0 means a should come out first
  }
  size() {
    return this.a.length;
  }
  push(x) {
    const a = this.a;
    a.push(x);
    let i = a.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.cmp(a[p], a[i]) <= 0) break;
      [a[p], a[i]] = [a[i], a[p]];
      i = p;
    }
  }
  pop() {
    const a = this.a;
    const top = a[0];
    const last = a.pop();
    if (a.length) {
      a[0] = last;
      let i = 0;
      while (true) {
        const l = 2 * i + 1;
        const r = l + 1;
        let m = i;
        if (l < a.length && this.cmp(a[l], a[m]) < 0) m = l;
        if (r < a.length && this.cmp(a[r], a[m]) < 0) m = r;
        if (m === i) break;
        [a[m], a[i]] = [a[i], a[m]];
        i = m;
      }
    }
    return top;
  }
}

function kClosest(points, k) {
  const dist = ([x, y]) => x * x + y * y;
  const heap = new Heap((a, b) => dist(b) - dist(a)); // farthest on top
  for (const p of points) {
    heap.push(p);
    if (heap.size() > k) heap.pop();
  }
  return heap.a;
}

module.exports = kClosest;
