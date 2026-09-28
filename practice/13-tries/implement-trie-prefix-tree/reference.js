/**
 * Implement Trie — nodes with a Map of children and an isEnd flag.
 * Time O(L) per operation (L = length of the word/prefix),
 * Space O(total characters inserted) in the worst case (no shared prefixes).
 *
 * insert walks down the characters, creating missing nodes, and marks the
 * last node as the end of a word. search and startsWith share the same walk
 * (`find`); a whole-word match also requires the final node's isEnd flag.
 */
class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch);
    }
    node.isEnd = true;
  }

  search(word) {
    const node = this.find(word);
    return node !== null && node.isEnd;
  }

  startsWith(prefix) {
    return this.find(prefix) !== null;
  }

  /** Follow `s` from the root; return the node it ends at, or null if the path breaks. */
  find(s) {
    let node = this.root;
    for (const ch of s) {
      node = node.children.get(ch);
      if (!node) return null;
    }
    return node;
  }
}

module.exports = Trie;
