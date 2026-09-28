# Graphs

## The big idea

A graph is just **things** (nodes) and **connections** (edges). Cities and roads, courses and prerequisites, grid cells and their neighbors, people and friendships — all graphs.

Almost every interview graph problem boils down to one of a few moves:

1. **Build** the graph in a form you can walk (usually an adjacency list).
2. **Traverse** it with DFS or BFS, keeping a `visited` set so you never loop forever.
3. Pick the traversal that fits the question:
   - "Is there a path / how many connected pieces / explore everything reachable" → **DFS** (or BFS, either works).
   - "Fewest steps / shortest path in an unweighted graph / spreads minute by minute" → **BFS**.
   - "Order things so every dependency comes first / is there a cycle in a directed graph" → **topological sort**.
   - "Keep merging groups and ask whether two things are connected" → **union-find**.

The good news: once you've written each template a few times, most graph problems are 80% boilerplate.

## How to recognize it

- Words like *network, connected, path, route, neighbors, dependencies, prerequisites, friends, islands, regions*.
- Input is an **edge list** (`[[0,1],[1,2]]`), an **adjacency list**, or a **2D grid**.
- A grid where you move up/down/left/right is a graph in disguise: each cell is a node, and each neighbor is an edge.
- "Minimum number of steps/moves/minutes" with uniform cost → BFS.
- "Can you finish all tasks" / "a valid ordering" → cycle detection / topological sort.

## JavaScript toolkit

| Idiom | Use | Notes |
|---|---|---|
| `Array.from({ length: n }, () => [])` | adjacency list for nodes `0..n-1` | **Don't** use `new Array(n).fill([])` — every slot would share the *same* array! |
| `new Map()` | adjacency list for non-numeric nodes (strings, coordinates) | `map.get(k) ?? []` avoids undefined checks. |
| `new Set()` | visited set | `add`, `has` are O(1). |
| `r * cols + c` or `` `${r},${c}` `` | key for a grid cell in a Set | The number key is faster than building strings. |
| `const dirs = [[1,0],[-1,0],[0,1],[0,-1]]` | grid neighbors | Loop over it instead of writing four `if`s. |
| `queue.shift()` | dequeue | **O(n)** in JS! On big inputs use an index pointer (`queue[head++]`). |
| `grid[r][c] = '0'` | mark visited in place | Saves a Set, but mutates input — say so in an interview. |

**Bounds check first:** `grid[r]` is `undefined` when `r` is out of range, and `undefined[c]` throws. Always check `r >= 0 && r < rows && c >= 0 && c < cols` before reading.

## Template

### Build an adjacency list

```js
// edges = [[a, b], ...], nodes 0..n-1
const graph = Array.from({ length: n }, () => []);
for (const [a, b] of edges) {
  graph[a].push(b);
  graph[b].push(a); // drop this line for a directed graph
}
```

### DFS (recursive)

```js
const visited = new Set();
function dfs(node) {
  if (visited.has(node)) return;
  visited.add(node);
  for (const next of graph[node]) dfs(next);
}
```

Recursion depth can hit JS's stack limit (~10k frames) on huge graphs. If that's a risk, use an explicit stack: `const stack = [start]; while (stack.length) { const node = stack.pop(); ... }`.

### BFS with levels (and an O(1) queue)

```js
function bfs(start) {
  const visited = new Set([start]);
  let queue = [start];
  let steps = 0;
  while (queue.length) {
    const next = [];
    for (const node of queue) {
      // process node at distance `steps`
      for (const nb of graph[node]) {
        if (!visited.has(nb)) {
          visited.add(nb); // mark when ENQUEUED, not when dequeued
          next.push(nb);
        }
      }
    }
    queue = next;
    steps++;
  }
}
```

Swapping in a fresh `next` array per level avoids `shift()` entirely and gives you the level count for free. Alternatively keep one array and a `head` index: `while (head < queue.length) { const node = queue[head++]; ... }`.

### Grid traversal

```js
const rows = grid.length, cols = grid[0].length;
const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
function dfs(r, c) {
  if (r < 0 || r >= rows || c < 0 || c >= cols) return;
  if (grid[r][c] !== TARGET) return;  // wall, water, or already visited
  grid[r][c] = VISITED;
  for (const [dr, dc] of dirs) dfs(r + dr, c + dc);
}
```

### Topological sort (Kahn's algorithm)

For a **directed** graph: repeatedly take nodes with no incoming edges.

```js
const indegree = new Array(n).fill(0);
for (const [from, to] of edges) { graph[from].push(to); indegree[to]++; }
const queue = [];
for (let i = 0; i < n; i++) if (indegree[i] === 0) queue.push(i);
const order = [];
for (let head = 0; head < queue.length; head++) {
  const node = queue[head];
  order.push(node);
  for (const nb of graph[node]) if (--indegree[nb] === 0) queue.push(nb);
}
// order.length < n  →  there was a cycle
```

### Union-find (brief)

Great for "are these connected?" while edges keep arriving, or counting components.

```js
const parent = Array.from({ length: n }, (_, i) => i);
function find(x) {
  while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } // path halving
  return x;
}
function union(a, b) {
  const ra = find(a), rb = find(b);
  if (ra === rb) return false; // already connected (in an undirected graph: this edge makes a cycle)
  parent[ra] = rb;
  return true;
}
```

With path compression (plus union by rank/size) each operation is nearly O(1).

## Worked example

**Shortest Path in Binary Matrix** (LeetCode 1091): in an `n × n` grid of `0` (open) and `1` (blocked), find the length of the shortest path from top-left to bottom-right, moving in **8 directions**. Return `-1` if impossible.

"Shortest" + "every move costs the same" → **BFS**.

```js
function shortestPathBinaryMatrix(grid) {
  const n = grid.length;
  if (grid[0][0] === 1 || grid[n - 1][n - 1] === 1) return -1;
  const dirs = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
  const queue = [[0, 0]];
  grid[0][0] = 1; // mark visited
  let length = 1;
  let head = 0;
  while (head < queue.length) {
    const levelEnd = queue.length;
    while (head < levelEnd) {
      const [r, c] = queue[head++];
      if (r === n - 1 && c === n - 1) return length;
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 0) {
          grid[nr][nc] = 1;
          queue.push([nr, nc]);
        }
      }
    }
    length++;
  }
  return -1;
}
```

Trace on `[[0,0,0],[1,1,0],[1,1,0]]`:

| Level (`length`) | Cells in this level | Notes |
|---|---|---|
| 1 | (0,0) | start |
| 2 | (0,1) | only open neighbor of (0,0) |
| 3 | (0,2), (1,2) | (1,2) reached diagonally from (0,1) |
| 4 | (2,2) | reached from (1,2) → answer **4** |

Because BFS explores in rings of equal distance, the first time we pop the target we know no shorter path exists.

## Complexity cheat sheet

`V` = nodes, `E` = edges; for an `R × C` grid, `V = R·C` and `E ≈ 4·R·C`.

| Operation | Time | Space |
|---|---|---|
| Build adjacency list | O(V + E) | O(V + E) |
| DFS / BFS over whole graph | O(V + E) | O(V) visited + stack/queue |
| Grid DFS / BFS | O(R · C) | O(R · C) worst-case recursion/queue |
| Topological sort (Kahn) | O(V + E) | O(V + E) |
| Union-find, m operations | O(m · α(V)) ≈ O(m) | O(V) |
| Adjacency **matrix** lookup "is a–b an edge?" | O(1) | O(V²) memory |

## Common mistakes

- **`new Array(n).fill([])`** — all nodes share one neighbor list. Use `Array.from`.
- **Marking visited when dequeuing instead of enqueuing** in BFS. The same node gets queued many times; answers can still be right but runtime explodes.
- **Forgetting that a graph may be disconnected.** Loop over *every* node and start a traversal from each unvisited one.
- **Using `shift()` in a hot BFS loop** on large inputs — it's O(n) per call.
- **Undirected vs directed.** Course prerequisites are directed; friendships are undirected. Adding both directions to a directed graph creates fake cycles.
- **Cycle detection in a directed graph with a single `visited` set.** Reaching an already-finished node isn't a cycle; you need "visiting" vs "done" states (three colors) or Kahn's algorithm.
- **Out-of-bounds grid access** — check bounds before `grid[r][c]`.
- **Comparing grid cells to the wrong type.** LeetCode grids are often strings (`"1"`), not numbers (`1`). `"1" === 1` is `false`.

## Practice

- [Number of Islands](#/practice/11-graphs/number-of-islands) — Medium
- [Rotting Oranges](#/practice/11-graphs/rotting-oranges) — Medium
- [Course Schedule](#/practice/11-graphs/course-schedule) — Medium

## Before moving on

- [ ] I can turn an edge list into an adjacency list (directed and undirected).
- [ ] I can write recursive DFS and level-by-level BFS from memory.
- [ ] I know when BFS gives the shortest path (unweighted edges) and why.
- [ ] I can traverse a grid with a `dirs` array and correct bounds checks.
- [ ] I can implement Kahn's algorithm and use it to detect a cycle.
- [ ] I can explain what union-find is good for and write `find`/`union`.
