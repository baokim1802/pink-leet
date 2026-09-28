/**
 * Pacific Atlantic Water Flow — reverse flow from each ocean.
 * Time O(R · C), Space O(R · C)
 *
 * Instead of asking "where can water from this cell go?", ask "which cells can
 * drain into this ocean?". Start a multi-source BFS from each ocean's edge
 * cells and walk uphill (neighbor height >= current). A cell that both searches
 * reach can drain into both oceans.
 */
function pacificAtlantic(heights) {
  const rows = heights.length;
  const cols = heights[0].length;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  const reach = (starts) => {
    const seen = Array.from({ length: rows }, () => new Array(cols).fill(false));
    const queue = [];
    for (const [r, c] of starts) {
      if (!seen[r][c]) {
        seen[r][c] = true;
        queue.push([r, c]);
      }
    }
    for (let head = 0; head < queue.length; head++) {
      const [r, c] = queue[head];
      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || seen[nr][nc]) continue;
        if (heights[nr][nc] < heights[r][c]) continue; // water can't flow uphill to us
        seen[nr][nc] = true;
        queue.push([nr, nc]);
      }
    }
    return seen;
  };

  const pacificStarts = [];
  const atlanticStarts = [];
  for (let r = 0; r < rows; r++) {
    pacificStarts.push([r, 0]);
    atlanticStarts.push([r, cols - 1]);
  }
  for (let c = 0; c < cols; c++) {
    pacificStarts.push([0, c]);
    atlanticStarts.push([rows - 1, c]);
  }

  const pacific = reach(pacificStarts);
  const atlantic = reach(atlanticStarts);
  const result = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) if (pacific[r][c] && atlantic[r][c]) result.push([r, c]);
  }
  return result;
}

module.exports = pacificAtlantic;
