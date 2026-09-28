/**
 * Network Delay Time — Dijkstra with a binary min-heap ("lazy deletion").
 * Time O(E log E), Space O(V + E)
 *
 * Each node hears the signal at its shortest distance from k; the answer is the
 * max of those. Pop the closest unsettled node, settle it, and relax its
 * outgoing edges. Stale heap entries (for already settled nodes) are skipped.
 */
class MinHeap {
  constructor(compare) {
    this.a = [];
    this.cmp = compare; // cmp(x, y) < 0 means x comes out first
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

function networkDelayTime(times, n, k) {
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [u, v, w] of times) graph[u].push([v, w]);

  const dist = new Array(n + 1).fill(Infinity);
  const heap = new MinHeap((x, y) => x[0] - y[0]);
  dist[k] = 0;
  heap.push([0, k]);
  let settled = 0;
  let latest = 0;

  while (heap.size()) {
    const [d, node] = heap.pop();
    if (d > dist[node]) continue; // stale entry
    settled++;
    latest = d; // pops come out in nondecreasing distance order
    for (const [next, w] of graph[node]) {
      if (d + w < dist[next]) {
        dist[next] = d + w;
        heap.push([d + w, next]);
      }
    }
  }
  return settled === n ? latest : -1;
}

module.exports = networkDelayTime;
