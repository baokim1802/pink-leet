/**
 * Find if Path Exists in Graph — BFS over an adjacency list.
 * Time O(V + E), Space O(V + E)
 *
 * Turn the edge list into an adjacency list (both directions, since edges are
 * undirected), then BFS from source with a visited array. The queue is an array
 * with a moving head index so dequeuing is O(1) (no shift()).
 */
function validPath(n, edges, source, destination) {
  if (source === destination) return true;

  const graph = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  const visited = new Array(n).fill(false);
  visited[source] = true;
  const queue = [source];
  for (let head = 0; head < queue.length; head++) {
    for (const next of graph[queue[head]]) {
      if (next === destination) return true;
      if (!visited[next]) {
        visited[next] = true;
        queue.push(next);
      }
    }
  }
  return false;
}

module.exports = validPath;
