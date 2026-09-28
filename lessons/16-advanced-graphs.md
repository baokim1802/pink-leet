# Advanced Graphs

## The big idea

In the Graphs lesson every edge cost the same, so **BFS** found shortest paths for free. Real problems put **weights** on edges — travel time, price, effort — and then "fewest edges" and "cheapest route" are no longer the same thing.

This lesson adds four tools on top of DFS/BFS:

1. **Dijkstra** — cheapest path from one source when weights are **non-negative**. It's BFS where the queue is replaced by a **min-heap** keyed by distance.
2. **Union-find (disjoint set union)** — the fast "are these connected yet?" structure, now with **path compression + union by rank**, which makes each operation `O(α(n))` — effectively `O(1)`.
3. **Minimum spanning tree (MST)** — connect *all* nodes as cheaply as possible: **Prim's** (grow one tree) or **Kruskal's** (sort edges + union-find).
4. **Bellman-Ford** — relax every edge in rounds; round `i` knows the cheapest paths with at most `i` edges. Perfect for "**at most k** flights/stops".

## How to recognize it

- "**Minimum time / cost / effort** to get from A to B" with weighted edges → Dijkstra.
- "Minimize the **maximum** edge on a path" (effort, water level, bottleneck) → Dijkstra with `max` instead of `+`, or union-find adding edges in sorted order.
- "Connect **all** points/cities with minimum total cost" → MST.
- "Which edge creates a **cycle**" / "are `a` and `b` connected after these unions" → union-find.
- "Cheapest route with **at most k stops**" → Bellman-Ford with `k + 1` rounds (plain Dijkstra ignores the stop count).
- Negative edge weights → Bellman-Ford (Dijkstra breaks). Weights only `0`/`1` → 0-1 BFS.

## JavaScript toolkit

**There is no built-in heap in JavaScript.** For Dijkstra and Prim's-with-a-heap you write your own (below) — worth memorizing.

| Idiom | Use | Notes |
|---|---|---|
| `Array.from({ length: n }, () => [])` | weighted adjacency list of `[neighbor, weight]` | Never `new Array(n).fill([])` (shared array). |
| `new Array(n).fill(Infinity)` | distance table | `Infinity + 5` is still `Infinity`, so relaxing from unreached nodes is harmless. |
| `heap.push([dist, node])` | priority queue entries | Compare with `(a, b) => a[0] - b[0]`. |
| `if (d > dist[node]) continue;` | skip **stale** heap entries | JS heaps can't "decrease key", so we push duplicates and ignore old ones ("lazy deletion"). |
| `[...prev]` | snapshot for Bellman-Ford rounds | Without the copy, one round can chain many edges. |
| `edges.sort((a, b) => a[0] - b[0])` | Kruskal's edge order | Sort by the **weight** field explicitly. |

## Template

### MinHeap

```js
class MinHeap {
  constructor(compare = (a, b) => a - b) { this.a = []; this.cmp = compare; }
  size() { return this.a.length; }
  push(x) {
    const a = this.a; a.push(x);
    let i = a.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.cmp(a[p], a[i]) <= 0) break;
      [a[p], a[i]] = [a[i], a[p]]; i = p;
    }
  }
  pop() {
    const a = this.a, top = a[0], last = a.pop();
    if (a.length) {
      a[0] = last;
      for (let i = 0; ; ) {
        const l = 2 * i + 1, r = l + 1; let m = i;
        if (l < a.length && this.cmp(a[l], a[m]) < 0) m = l;
        if (r < a.length && this.cmp(a[r], a[m]) < 0) m = r;
        if (m === i) break;
        [a[m], a[i]] = [a[i], a[m]]; i = m;
      }
    }
    return top;
  }
}
```

### Dijkstra

```js
function dijkstra(graph, src) {            // graph[u] = [[v, w], ...], w >= 0
  const dist = new Array(graph.length).fill(Infinity);
  const heap = new MinHeap((x, y) => x[0] - y[0]);
  dist[src] = 0;
  heap.push([0, src]);
  while (heap.size()) {
    const [d, u] = heap.pop();
    if (d > dist[u]) continue;             // stale entry
    for (const [v, w] of graph[u]) {
      if (d + w < dist[v]) { dist[v] = d + w; heap.push([d + w, v]); }
    }
  }
  return dist;
}
```

Why it works: when a node is popped with the smallest distance in the heap, no other route can beat it later, because every remaining route is already at least that long and weights never go negative. That's also exactly why **negative weights break it**.

**Bottleneck variant:** replace `d + w` with `Math.max(d, w)` to minimize the largest edge on the path.

### Union-find (path compression + union by rank)

```js
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);     // upper bound on tree height
  }
  find(x) {
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]); // compress
    return this.parent[x];
  }
  union(a, b) {
    let ra = this.find(a), rb = this.find(b);
    if (ra === rb) return false;          // already connected
    if (this.rank[ra] < this.rank[rb]) [ra, rb] = [rb, ra];
    this.parent[rb] = ra;                 // shorter tree goes under taller
    if (this.rank[ra] === this.rank[rb]) this.rank[ra]++;
    return true;
  }
}
```

### Kruskal's MST

```js
function kruskal(n, edges) {               // edges = [[w, u, v], ...]
  edges.sort((a, b) => a[0] - b[0]);
  const uf = new UnionFind(n);
  let total = 0, used = 0;
  for (const [w, u, v] of edges) {
    if (uf.union(u, v)) { total += w; if (++used === n - 1) break; }
  }
  return used === n - 1 ? total : -1;      // -1: graph was disconnected
}
```

### Prim's MST

Grow a tree from node 0; always add the cheapest edge leaving it. With a heap it's Dijkstra's twin (push `[w, v]` instead of `[d + w, v]`). On a **dense** graph (every pair is an edge), skip the heap: keep `minDist[v]` and scan for the smallest unvisited one each round — `O(V²)` total, which beats `O(E log E) = O(V² log V)`.

### Bellman-Ford with an edge limit

```js
function cheapestWithin(n, edges, src, maxEdges) {  // edges = [[u, v, w], ...]
  let cost = new Array(n).fill(Infinity);
  cost[src] = 0;
  for (let round = 0; round < maxEdges; round++) {
    const prev = cost;
    cost = [...prev];                       // read old round, write new round
    for (const [u, v, w] of edges) {
      if (prev[u] + w < cost[v]) cost[v] = prev[u] + w;
    }
  }
  return cost;
}
```

Run `V - 1` rounds for unrestricted shortest paths; if round `V` still improves something, there's a **negative cycle**.

### 0-1 BFS (mention)

If every weight is `0` or `1`, use a deque: push a `0`-weight neighbor to the **front**, a `1`-weight neighbor to the **back**. It's Dijkstra in `O(V + E)` without a heap. (JS arrays make `unshift` `O(n)`, so for big inputs use two arrays or a circular buffer.)

### Which algorithm when?

| Situation | Use |
|---|---|
| Unweighted / all weights equal | BFS |
| Weights only 0 or 1 | 0-1 BFS |
| Non-negative weights, one source | Dijkstra |
| Minimize the max edge on a path | Dijkstra with `max`, or union-find on sorted edges |
| Limit on number of edges / stops | Bellman-Ford with `k` rounds |
| Negative weights (or detect negative cycle) | Bellman-Ford |
| Connect everything cheaply | MST — Kruskal (sparse edge list) or Prim (dense) |
| Dynamic connectivity, cycle-closing edge | Union-find |

## Worked example

**Path with Maximum Probability** (LeetCode 1514): an undirected graph where edge `i` succeeds with probability `succProb[i]`. Find the **highest** probability of getting from `start` to `end` (multiplying along the path), or `0`.

It's Dijkstra "upside down": we want the **largest** product, and multiplying by a number in `[0, 1]` can only make it smaller — the same "a path never gets better as it grows" property that makes Dijkstra correct. So use a **max-heap** (flip the comparator) and `*` instead of `+`.

```js
function maxProbability(n, edges, succProb, start, end) {
  const graph = Array.from({ length: n }, () => []);
  edges.forEach(([a, b], i) => {
    graph[a].push([b, succProb[i]]);
    graph[b].push([a, succProb[i]]);
  });
  const best = new Array(n).fill(0);
  const heap = new MinHeap((x, y) => y[0] - x[0]);   // biggest probability first
  best[start] = 1;
  heap.push([1, start]);
  while (heap.size()) {
    const [p, u] = heap.pop();
    if (u === end) return p;
    if (p < best[u]) continue;                        // stale
    for (const [v, q] of graph[u]) {
      if (p * q > best[v]) { best[v] = p * q; heap.push([p * q, v]); }
    }
  }
  return 0;
}
```

Trace with `n = 3`, edges `0–1 (0.5)`, `1–2 (0.5)`, `0–2 (0.2)`, from `0` to `2`:

| Pop | best after relaxing | Heap afterwards |
|---|---|---|
| `[1, 0]` | best[1] = 0.5, best[2] = 0.2 | `[0.5, 1]`, `[0.2, 2]` |
| `[0.5, 1]` | 0.5 · 0.5 = 0.25 > 0.2 → best[2] = 0.25 | `[0.25, 2]`, `[0.2, 2]` |
| `[0.25, 2]` | it's `end` → return **0.25** | — |

The direct edge (0.2) was found first, but the two-hop route (0.25) is better. The heap made sure we popped the better one before trusting it — and the stale `[0.2, 2]` entry never gets used.

## Complexity cheat sheet

`V` = nodes, `E` = edges.

| Algorithm | Time | Space |
|---|---|---|
| Dijkstra (binary heap, lazy deletion) | O(E log E) = O(E log V) | O(V + E) |
| 0-1 BFS | O(V + E) | O(V) |
| Bellman-Ford, k rounds | O(k · E) | O(V) |
| Bellman-Ford, full | O(V · E) | O(V) |
| Union-find, m operations | O(m · α(V)) ≈ O(m) | O(V) |
| Kruskal | O(E log E) (the sort) | O(V + E) |
| Prim with heap | O(E log V) | O(V + E) |
| Prim with array (dense graph) | O(V²) | O(V) |

## Common mistakes

- **Using Dijkstra with negative weights.** It silently returns wrong answers. Use Bellman-Ford.
- **Using plain Dijkstra when the number of edges is limited.** The cheapest route may use too many stops; Dijkstra happily returns it.
- **Forgetting the stale-entry check** (`if (d > dist[u]) continue`). Still correct, but can blow up runtime.
- **Bellman-Ford without a snapshot.** Updating `cost` in place lets one round travel several edges.
- **Union by nothing.** Without rank/size (or at least path compression), `find` degrades to `O(n)` on a long chain.
- **Off-by-one on labels.** Many problems label nodes `1..n` — size arrays `n + 1`.

## Practice

- [Network Delay Time](#/practice/16-advanced-graphs/network-delay-time) — Medium
- [Path With Minimum Effort](#/practice/16-advanced-graphs/path-with-minimum-effort) — Medium
- [Redundant Connection](#/practice/16-advanced-graphs/redundant-connection) — Medium
- [Min Cost to Connect All Points](#/practice/16-advanced-graphs/min-cost-to-connect-all-points) — Medium
- [Cheapest Flights Within K Stops](#/practice/16-advanced-graphs/cheapest-flights-within-k-stops) — Medium
- [Swim in Rising Water](#/practice/16-advanced-graphs/swim-in-rising-water) — Hard

## Before moving on

- [ ] I can write a `MinHeap` in JavaScript from memory (push, pop, sift up/down).
- [ ] I can implement Dijkstra with lazy deletion and explain why weights must be non-negative.
- [ ] I can adapt Dijkstra to "minimize the max edge" or "maximize a product".
- [ ] I can write union-find with path compression and union by rank.
- [ ] I can build an MST with both Kruskal's and Prim's, and know which fits a dense graph.
- [ ] I can use Bellman-Ford for "at most k edges" and explain why the snapshot matters.
- [ ] Given a problem, I can pick BFS, 0-1 BFS, Dijkstra, Bellman-Ford, MST, or union-find.
