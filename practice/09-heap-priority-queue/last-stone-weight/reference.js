/**
 * Last Stone Weight — simulate with a max-heap.
 * Time O(n log n), Space O(n)
 *
 * Pop the two heaviest, push back the difference if it's non-zero,
 * repeat until at most one stone remains.
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

function lastStoneWeight(stones) {
  const heap = new Heap((a, b) => b - a); // max-heap
  for (const s of stones) heap.push(s);
  while (heap.size() > 1) {
    const y = heap.pop();
    const x = heap.pop();
    if (y !== x) heap.push(y - x);
  }
  return heap.size() ? heap.pop() : 0;
}

module.exports = lastStoneWeight;
