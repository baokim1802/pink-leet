/**
 * Word Search II — build a trie of the words, then DFS the board and the trie
 * together so every word is searched at once.
 * Time O(m · n · 4 · 3^(L-1)) in the worst case (L = longest word), usually far
 * less thanks to pruning; plus O(total characters in words) to build the trie.
 * Space O(total characters in words) for the trie, O(L) for the recursion.
 *
 * From each cell we only move to a neighbor whose letter is a child of the
 * current trie node, so any path that isn't a prefix of some word stops right
 * away. End nodes store the full word; we clear it once found (no duplicates)
 * and prune leaf nodes that no longer lead to any word.
 */
function findWords(board, words) {
  // build the trie; node = { children: Map, word: string | null }
  const root = { children: new Map(), word: null };
  for (const w of words) {
    let node = root;
    for (const ch of w) {
      if (!node.children.has(ch)) node.children.set(ch, { children: new Map(), word: null });
      node = node.children.get(ch);
    }
    node.word = w;
  }

  const rows = board.length;
  const cols = board[0].length;
  const found = [];

  function dfs(r, c, parent) {
    const ch = board[r][c];
    const node = parent.children.get(ch);
    if (!node) return; // no word continues with this letter

    if (node.word !== null) {
      found.push(node.word);
      node.word = null; // report each word once
    }

    board[r][c] = '#'; // mark visited
    if (r > 0) dfs(r - 1, c, node);
    if (c > 0) dfs(r, c - 1, node);
    if (r < rows - 1) dfs(r + 1, c, node);
    if (c < cols - 1) dfs(r, c + 1, node);
    board[r][c] = ch; // restore

    // prune: a leaf with no word left can never produce another answer
    if (node.children.size === 0 && node.word === null) parent.children.delete(ch);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) dfs(r, c, root);
  }
  return found;
}

module.exports = findWords;
