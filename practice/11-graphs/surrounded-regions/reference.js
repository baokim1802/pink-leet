/**
 * Surrounded Regions — flood fill from the border.
 * Time O(R · C), Space O(R · C) worst case for the stack.
 *
 * A region survives exactly when it touches the border. So flood-fill from
 * every border "O", marking reachable cells as safe ("S"). Then one sweep:
 * leftover "O"s are surrounded and become "X"; "S" cells turn back into "O".
 */
function solve(board) {
  const rows = board.length;
  const cols = board[0].length;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  const markSafe = (r, c) => {
    if (board[r][c] !== 'O') return;
    board[r][c] = 'S';
    const stack = [[r, c]];
    while (stack.length) {
      const [cr, cc] = stack.pop();
      for (const [dr, dc] of dirs) {
        const nr = cr + dr;
        const nc = cc + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === 'O') {
          board[nr][nc] = 'S';
          stack.push([nr, nc]);
        }
      }
    }
  };

  for (let r = 0; r < rows; r++) {
    markSafe(r, 0);
    markSafe(r, cols - 1);
  }
  for (let c = 0; c < cols; c++) {
    markSafe(0, c);
    markSafe(rows - 1, c);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === 'O') board[r][c] = 'X';
      else if (board[r][c] === 'S') board[r][c] = 'O';
    }
  }
}

module.exports = solve;
