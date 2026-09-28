/**
 * Design Add and Search Words — a trie, searched with DFS for '.' wildcards.
 * addWord: Time O(L). search: O(L) with no dots; with d dots up to
 * O(26^d · L) in the worst case (d <= 2 here). Space O(total characters added).
 *
 * dfs(node, i) asks whether pattern[i..] can be matched from `node`. A letter
 * follows its one child; a '.' tries every child and succeeds if any does.
 * Reaching the end of the pattern only counts if a word ends at that node.
 */
class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEnd = false;
  }
}

class WordDictionary {
  constructor() {
    this.root = new TrieNode();
  }

  addWord(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch);
    }
    node.isEnd = true;
  }

  search(pattern) {
    const dfs = (node, i) => {
      if (i === pattern.length) return node.isEnd;
      const ch = pattern[i];
      if (ch === '.') {
        for (const child of node.children.values()) {
          if (dfs(child, i + 1)) return true;
        }
        return false;
      }
      const next = node.children.get(ch);
      return next !== undefined && dfs(next, i + 1);
    };
    return dfs(this.root, 0);
  }
}

module.exports = WordDictionary;
