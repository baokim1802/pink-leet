/**
 * Find Median from Data Stream — two heaps.
 * Time O(log n) per addNum, O(1) per findMedian. Space O(n)
 *
 * `low` is a max-heap holding the smaller half, `high` a min-heap holding
 * the larger half. Invariants: every value in low <= every value in high,
 * and low.size() is high.size() or high.size() + 1. Then the median is
 * low's top (odd count) or the average of both tops (even count).
 */
class Heap {
  /** @param {(a: number, b: number) => boolean} before true if a should sit above b */
  constructor(before) {
    this.a = [];
    this.before = before;
  }
  size() {
    return this.a.length;
  }
  peek() {
    return this.a[0];
  }
  push(x) {
    const a = this.a;
    a.push(x);
    let i = a.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (!this.before(a[i], a[p])) break;
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
        if (l < a.length && this.before(a[l], a[m])) m = l;
        if (r < a.length && this.before(a[r], a[m])) m = r;
        if (m === i) break;
        [a[m], a[i]] = [a[i], a[m]];
        i = m;
      }
    }
    return top;
  }
}

class MedianFinder {
  constructor() {
    this.low = new Heap((a, b) => a > b); // max-heap
    this.high = new Heap((a, b) => a < b); // min-heap
  }

  addNum(num) {
    // Route through low so the ordering invariant holds, then fix the sizes.
    this.low.push(num);
    this.high.push(this.low.pop());
    if (this.high.size() > this.low.size()) this.low.push(this.high.pop());
  }

  findMedian() {
    if (this.low.size() > this.high.size()) return this.low.peek();
    return (this.low.peek() + this.high.peek()) / 2;
  }
}

module.exports = MedianFinder;
