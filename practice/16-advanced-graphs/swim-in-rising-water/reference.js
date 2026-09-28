/**
 * Swim in Rising Water — Dijkstra minimizing the highest cell on the path.
 * Time O(n² log n), Space O(n²)
 *
 * A route is usable at time t iff every cell on it has elevation <= t, so we
 * want the route with the smallest maximum elevation. Always expand the
 * reachable cell with the lowest "max so far" (a min-heap); the first time the
 * target is popped, that max is the answer.
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

function swimInWater(grid) {
  const n = grid.length;
  const seen = Array.from({ length: n }, () => new Array(n).fill(false));
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const heap = new MinHeap((x, y) => x[0] - y[0]);
  heap.push([grid[0][0], 0, 0]); // [max elevation so far, row, col]
  seen[0][0] = true;

  while (heap.size()) {
    const [t, r, c] = heap.pop();
    if (r === n - 1 && c === n - 1) return t;
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nr >= n || nc < 0 || nc >= n || seen[nr][nc]) continue;
      seen[nr][nc] = true; // safe: the first push already carries the best max
      heap.push([Math.max(t, grid[nr][nc]), nr, nc]);
    }
  }
  return -1; // unreachable for valid input
}

module.exports = swimInWater;
