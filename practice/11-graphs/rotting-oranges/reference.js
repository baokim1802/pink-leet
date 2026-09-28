/**
 * Rotting Oranges — multi-source BFS, level by level.
 * Time O(R · C), Space O(R · C)
 *
 * Seed the queue with every rotten orange and count the fresh ones. Each BFS
 * level is one minute: rot all fresh neighbors of the current level. Stop when
 * nothing fresh is left (or the queue runs dry, in which case some are unreachable).
 */
function orangesRotting(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let queue = [];
  let fresh = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) queue.push([r, c]);
      else if (grid[r][c] === 1) fresh++;
    }
  }

  let minutes = 0;
  while (queue.length && fresh > 0) {
    const next = [];
    for (const [r, c] of queue) {
      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
          grid[nr][nc] = 2;
          fresh--;
          next.push([nr, nc]);
        }
      }
    }
    queue = next;
    minutes++;
  }

  return fresh === 0 ? minutes : -1;
}

module.exports = orangesRotting;
