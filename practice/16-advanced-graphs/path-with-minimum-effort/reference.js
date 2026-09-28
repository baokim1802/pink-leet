/**
 * Path With Minimum Effort — Dijkstra where a path costs its max edge.
 * Time O(R·C·log(R·C)), Space O(R·C)
 *
 * effort[cell] = smallest possible "max step" of a route to that cell. Moving
 * to a neighbor costs max(current effort, |height difference|), which never
 * decreases along a path — so the first time we pop the target, it's optimal.
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

function minimumEffortPath(heights) {
  const rows = heights.length;
  const cols = heights[0].length;
  const effort = Array.from({ length: rows }, () => new Array(cols).fill(Infinity));
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const heap = new MinHeap((x, y) => x[0] - y[0]);
  effort[0][0] = 0;
  heap.push([0, 0, 0]); // [effort, row, col]

  while (heap.size()) {
    const [e, r, c] = heap.pop();
    if (e > effort[r][c]) continue; // stale entry
    if (r === rows - 1 && c === cols - 1) return e;
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
      const ne = Math.max(e, Math.abs(heights[nr][nc] - heights[r][c]));
      if (ne < effort[nr][nc]) {
        effort[nr][nc] = ne;
        heap.push([ne, nr, nc]);
      }
    }
  }
  return 0; // unreachable for valid input
}

module.exports = minimumEffortPath;
