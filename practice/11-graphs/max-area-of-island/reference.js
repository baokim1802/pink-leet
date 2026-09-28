/**
 * Max Area of Island — flood fill that measures each island.
 * Time O(R · C), Space O(R · C) worst case for the stack.
 *
 * Scan the grid; each unvisited 1 starts a new island. Flood it with an
 * explicit stack, sinking cells to 0 as they're pushed (so none is counted
 * twice) and counting how many we sink. Track the largest count.
 * Mutates the input grid.
 */
function maxAreaOfIsland(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let best = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] !== 1) continue;
      grid[r][c] = 0;
      const stack = [[r, c]];
      let area = 0;
      while (stack.length) {
        const [cr, cc] = stack.pop();
        area++;
        for (const [dr, dc] of dirs) {
          const nr = cr + dr;
          const nc = cc + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
            grid[nr][nc] = 0;
            stack.push([nr, nc]);
          }
        }
      }
      best = Math.max(best, area);
    }
  }
  return best;
}

module.exports = maxAreaOfIsland;
