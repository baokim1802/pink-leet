/**
 * Word Search — DFS from every cell, marking cells in place while they're used.
 * Time O(m · n · 3^L) (L = word.length: after the first step there are at
 * most 3 unvisited directions), Space O(L) for the recursion.
 *
 * dfs(r, c, i) checks whether word[i..] can be traced starting at (r, c).
 * We overwrite the current cell with '#' so the path can't revisit it, and
 * restore the letter on the way back out (choose → explore → unchoose).
 * A quick letter-count check first rejects words the board can't possibly
 * spell, which avoids the exponential search in the worst cases.
 */
function exist(board, word) {
  const rows = board.length;
  const cols = board[0].length;
  if (word.length > rows * cols) return false;

  // pruning: the board must contain enough of every letter in the word
  const count = new Map();
  for (const row of board) for (const ch of row) count.set(ch, (count.get(ch) || 0) + 1);
  for (const ch of word) {
    if (!count.get(ch)) return false;
    count.set(ch, count.get(ch) - 1);
  }

  function dfs(r, c, i) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || board[r][c] !== word[i]) return false;
    if (i === word.length - 1) return true;

    const saved = board[r][c];
    board[r][c] = '#'; // choose: mark as used
    const found =
      dfs(r + 1, c, i + 1) || dfs(r - 1, c, i + 1) ||
      dfs(r, c + 1, i + 1) || dfs(r, c - 1, i + 1);
    board[r][c] = saved; // unchoose
    return found;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (dfs(r, c, 0)) return true;
    }
  }
  return false;
}

module.exports = exist;
