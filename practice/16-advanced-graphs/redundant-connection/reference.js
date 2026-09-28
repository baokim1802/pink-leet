/**
 * Redundant Connection — union-find with path compression + union by rank.
 * Time O(n · α(n)) ≈ O(n), Space O(n)
 *
 * Process edges in order. If an edge's endpoints already share a root, adding
 * it closes a cycle. Every other edge on that cycle came earlier, so this edge
 * is the cycle edge that appears last in the input — exactly what's asked.
 */
class UnionFind {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, i) => i);
    this.rank = new Array(size).fill(0);
  }
  find(x) {
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]); // path compression
    return this.parent[x];
  }
  union(a, b) {
    let ra = this.find(a);
    let rb = this.find(b);
    if (ra === rb) return false;
    if (this.rank[ra] < this.rank[rb]) [ra, rb] = [rb, ra];
    this.parent[rb] = ra; // attach the shorter tree under the taller one
    if (this.rank[ra] === this.rank[rb]) this.rank[ra]++;
    return true;
  }
}

function findRedundantConnection(edges) {
  const uf = new UnionFind(edges.length + 1);
  for (const [a, b] of edges) {
    if (!uf.union(a, b)) return [a, b];
  }
  return [];
}

module.exports = findRedundantConnection;
