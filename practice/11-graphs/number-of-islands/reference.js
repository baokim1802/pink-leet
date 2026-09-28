/**
 * Number of Islands — flood fill.
 * Time O(R · C), Space O(R · C) worst case for the stack.
 *
 * Scan the grid; every unvisited "1" starts a new island. Flood-fill from it
 * (iterative DFS with an explicit stack) and sink each land cell to "0" so it's
 * never counted again. Mutates the input grid.
 */
function numIslands(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let count = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] !== '1') continue;
      count++;
      grid[r][c] = '0';
      const stack = [[r, c]];
      while (stack.length) {
        const [cr, cc] = stack.pop();
        for (const [dr, dc] of dirs) {
          const nr = cr + dr;
          const nc = cc + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === '1') {
            grid[nr][nc] = '0';
            stack.push([nr, nc]);
          }
        }
      }
    }
  }
  return count;
}

module.exports = numIslands;
