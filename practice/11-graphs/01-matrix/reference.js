/**
 * 01 Matrix — multi-source BFS from every 0 at once.
 * Time O(R · C), Space O(R · C)
 *
 * Seed the queue with all zeros (distance 0) and mark ones as unvisited (-1).
 * BFS spreads out from all zeros in lockstep, so the first time a cell is
 * reached, it's reached from its nearest 0: its distance is its parent's + 1.
 */
function updateMatrix(mat) {
  const rows = mat.length;
  const cols = mat[0].length;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const dist = mat.map((row) => row.map((v) => (v === 0 ? 0 : -1)));

  const queue = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) if (mat[r][c] === 0) queue.push([r, c]);
  }

  for (let head = 0; head < queue.length; head++) {
    const [r, c] = queue[head];
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && dist[nr][nc] === -1) {
        dist[nr][nc] = dist[r][c] + 1;
        queue.push([nr, nc]);
      }
    }
  }
  return dist;
}

module.exports = updateMatrix;
