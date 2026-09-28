/**
 * Number of Provinces — count connected components with DFS.
 * Time O(n²) (we read the whole matrix), Space O(n)
 *
 * Every unvisited city starts a new province. From it, DFS through the matrix
 * row (neighbors are the columns holding a 1) and mark everything reachable.
 */
function findCircleNum(isConnected) {
  const n = isConnected.length;
  const visited = new Array(n).fill(false);
  let provinces = 0;

  for (let start = 0; start < n; start++) {
    if (visited[start]) continue;
    provinces++;
    visited[start] = true;
    const stack = [start];
    while (stack.length) {
      const city = stack.pop();
      for (let next = 0; next < n; next++) {
        if (isConnected[city][next] === 1 && !visited[next]) {
          visited[next] = true;
          stack.push(next);
        }
      }
    }
  }
  return provinces;
}

module.exports = findCircleNum;
