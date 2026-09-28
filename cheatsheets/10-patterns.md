# Handy Patterns

## Grid neighbors
```js
const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
for (const [dr, dc] of dirs) {
  const nr = r + dr, nc = c + dc;
  if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
  // use grid[nr][nc]
}
```

## Adjacency list from edges
```js
const graph = Array.from({ length: n }, () => []);
for (const [u, v] of edges) {
  graph[u].push(v);
  graph[v].push(u);          // skip for a directed graph
}
```

## DFS (recursive) with visited
```js
const seen = new Set();
function dfs(node) {
  if (seen.has(node)) return;
  seen.add(node);
  for (const nei of graph[node]) dfs(nei);
}
```

## Prefix sums
```js
const pre = [0];
for (const x of a) pre.push(pre.at(-1) + x);
const sumIJ = pre[j + 1] - pre[i];     // sum of a[i..j]
```

## Two pointers
```js
let l = 0, r = a.length - 1;
while (l < r) {
  const sum = a[l] + a[r];
  if (sum === target) break;
  sum < target ? l++ : r--;
}
```

## Sliding window
```js
let l = 0, best = 0;
const count = new Map();
for (let r = 0; r < s.length; r++) {
  count.set(s[r], (count.get(s[r]) ?? 0) + 1);   // grow
  while (/* window invalid */ false) {
    count.set(s[l], count.get(s[l]) - 1);        // shrink
    l++;
  }
  best = Math.max(best, r - l + 1);
}
```

## Binary search
```js
let lo = 0, hi = a.length - 1;
while (lo <= hi) {
  const mid = Math.floor((lo + hi) / 2);
  if (a[mid] === target) return mid;
  if (a[mid] < target) lo = mid + 1;
  else hi = mid - 1;
}
return -1;
```

## Memoization
```js
const memo = new Map();
function dp(i, j) {
  const key = `${i},${j}`;
  if (memo.has(key)) return memo.get(key);
  const res = /* recurse */ 0;
  memo.set(key, res);
  return res;
}
```

## Backtracking
```js
const res = [];
function backtrack(start, path) {
  res.push([...path]);                 // copy!
  for (let i = start; i < nums.length; i++) {
    path.push(nums[i]);
    backtrack(i + 1, path);
    path.pop();
  }
}
backtrack(0, []);
```
