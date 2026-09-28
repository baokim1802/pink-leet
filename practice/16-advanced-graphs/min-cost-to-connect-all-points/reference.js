/**
 * Min Cost to Connect All Points — Prim's MST, array version for dense graphs.
 * Time O(n²), Space O(n)
 *
 * Grow the tree from point 0. minDist[i] = cheapest edge from the tree to point
 * i. Each round, add the closest point not yet in the tree, then see whether it
 * offers a cheaper connection to the points still outside. With n² edges, the
 * O(n) scan per round beats a heap (which would be O(n² log n) here).
 */
function minCostConnectPoints(points) {
  const n = points.length;
  const inTree = new Array(n).fill(false);
  const minDist = new Array(n).fill(Infinity);
  minDist[0] = 0;
  let total = 0;

  for (let round = 0; round < n; round++) {
    let u = -1;
    for (let i = 0; i < n; i++) {
      if (!inTree[i] && (u === -1 || minDist[i] < minDist[u])) u = i;
    }
    inTree[u] = true;
    total += minDist[u];
    const [ux, uy] = points[u];
    for (let v = 0; v < n; v++) {
      if (inTree[v]) continue;
      const d = Math.abs(ux - points[v][0]) + Math.abs(uy - points[v][1]);
      if (d < minDist[v]) minDist[v] = d;
    }
  }
  return total;
}

module.exports = minCostConnectPoints;
