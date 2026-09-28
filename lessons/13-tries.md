# Tries

## The big idea

A **trie** (say "try", from re*trie*val), also called a **prefix tree**, stores a set of strings as a tree where **each edge is one character**. Words that start the same way share the same path from the root, and each node has a small flag saying "a word ends here".

Here's a trie holding `car`, `cat`, `cats` and `dog` (`*` marks nodes where a word ends):

```
            (root)
           /      \
          c        d
          |        |
          a        o
         / \       |
        r*  t*     g*
            |
            s*
```

Why bother? Because walking down the tree answers **prefix questions** in time proportional to the length of the prefix, no matter how many words are stored:

- "Is `ca` the start of some word?" → follow `c`, `a`. The node exists, so yes.
- "Is `ca` itself a word?" → same walk, but the node has no `*`, so no.
- "Which words start with `cat`?" → walk to the `t` node, then collect everything below it.

A `Set` of strings can answer "is this exact word stored?" just as fast, but it has no idea which words *share a prefix* — for that it would have to scan every word.

## How to recognize it

- The problem talks about **prefixes**: "starts with", autocomplete, "shortest root", "longest common prefix".
- You search for **many words at once** in the same text or grid (Word Search II, multi-pattern matching).
- **Wildcard** searches where `.` matches any letter — a trie lets you branch only where needed.
- You'd like to **stop early** as soon as the characters so far can't start any word. A trie tells you that instantly (the child is missing).
- Bonus signal: the alphabet is small (lowercase letters) and word lengths are small, while the number of words is large.

## JavaScript toolkit

| Idiom | What it does | Notes |
|---|---|---|
| `{ children: new Map(), isEnd: false }` | a trie node | `Map` has `.has/.get/.set/.size` and iterates in insertion order. |
| `{ children: {}, isEnd: false }` | node with a plain object | Works too; use `ch in node.children`. Fine for letters, but a key like `"__proto__"` can surprise you — `Map` has no such traps. |
| `new Array(26).fill(null)` | fixed child slots | Index with `ch.charCodeAt(0) - 97`. Fast, but uses 26 slots per node even when most are empty. |
| `for (const ch of word)` | loop over characters | Clean and readable; `word[i]` in an index loop is equally fine. |
| `node.children.values()` | iterate over children | What you need for wildcard `.` searches and for DFS over the whole trie. |
| `node.word = word` | store the whole word on its end node | Handy when a DFS needs to report words: no need to rebuild the string from the path. |

**Map or object?** Both are O(1) per lookup on average. `Map` is the safer default (any key, a real `.size`, no prototype); a plain object is slightly shorter to type. Pick one and be consistent.

## Template

The node plus the three classic operations:

```js
class TrieNode {
  constructor() {
    this.children = new Map(); // char -> TrieNode
    this.isEnd = false;        // does a word end exactly here?
  }
}

const root = new TrieNode();

function insert(word) {
  let node = root;
  for (const ch of word) {
    if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
    node = node.children.get(ch);
  }
  node.isEnd = true;
}

// walk down; return the node where `s` ends, or null if the path breaks
function walk(s) {
  let node = root;
  for (const ch of s) {
    node = node.children.get(ch);
    if (!node) return null;
  }
  return node;
}

const search = (word) => walk(word)?.isEnd === true; // whole word
const startsWith = (prefix) => walk(prefix) !== null; // any word with this prefix
```

The **only** difference between `search` and `startsWith` is that last `isEnd` check. Forgetting it is the classic bug.

### DFS over a trie

To list or count everything below a node (autocomplete, wildcards), do a DFS down the children. It's the same choose → explore → unchoose pattern from backtracking, where the "choices" are the node's children:

```js
// every stored word that starts with `prefix`
function wordsWithPrefix(prefix) {
  const start = walk(prefix);
  const res = [];
  function dfs(node, path) {
    if (node.isEnd) res.push(path);
    for (const [ch, child] of node.children) dfs(child, path + ch);
  }
  if (start) dfs(start, prefix);
  return res;
}
```

Grid problems combine this DFS with a DFS over the board: you step to a neighboring cell **only if** the current trie node has a child for that cell's letter. The trie prunes every path that isn't the start of some word.

## When a trie beats a Set

| Question | `Set` of words | Trie |
|---|---|---|
| Is `w` a stored word? | O(L) (hash the string) | O(L) |
| Does any word start with `p`? | O(n · L) scan, or store every prefix (lots of memory) | O(len(p)) |
| All words starting with `p` | O(n · L) scan | O(len(p) + size of the answer) |
| Shortest stored prefix of `w` | try every prefix: O(L²) slicing + hashing | O(L), one walk |
| Pattern with `.` wildcards | check every word | branch only at the dots |

(n = number of words, L = word length.) If you only ever ask "is this exact word present?", a `Set` is simpler — use it. Reach for a trie when prefixes matter.

## Worked example

**Replace Words** (LeetCode 648): you get a dictionary of *roots* and a sentence. Replace every word in the sentence with the **shortest** root that is a prefix of it (leave words with no root as they are).

```
roots    = ["cat", "bat", "rat", "ca"]
sentence = "the cattle was rattled by the battery"
answer   = "the ca was rat by the bat"
```

**Step 1 — build a trie of the roots.** After inserting `cat`, `bat`, `rat`, `ca`:

```
        (root)
       /   |   \
      c    b    r
      |    |    |
      a*   a    a
      |    |    |
      t*   t*   t*
```

Note that `ca` marked the `a` under `c` as an end, even though `cat` was inserted first.

**Step 2 — for each word, walk down and stop at the first end node.**

| Word | Walk | Result |
|---|---|---|
| `the` | `t`: no child → stop | no root, keep `the` |
| `cattle` | `c` → `a*` end node after 2 letters | `ca` |
| `was` | `w`: no child → stop | keep `was` |
| `rattled` | `r` → `a` → `t*` end node | `rat` |
| `by` | `b` → `y`: no child → stop | keep `by` |
| `battery` | `b` → `a` → `t*` | `bat` |

The **first** end node we meet is automatically the **shortest** root, so we can stop right there.

```js
function replaceWords(roots, sentence) {
  const root = new TrieNode();
  for (const r of roots) {
    let node = root;
    for (const ch of r) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch);
    }
    node.isEnd = true;
  }

  const shortestRoot = (word) => {
    let node = root;
    for (let i = 0; i < word.length; i++) {
      node = node.children.get(word[i]);
      if (!node) return word;                 // path broke: no root
      if (node.isEnd) return word.slice(0, i + 1); // first end = shortest root
    }
    return word;                              // word is shorter than every root below it
  };

  return sentence.split(' ').map(shortestRoot).join(' ');
}
```

With a `Set` of roots you'd have to try `word.slice(0, 1)`, `word.slice(0, 2)`, … for every word — each slice costs O(L), so O(L²) per word. The trie does one walk: O(L).

## Complexity cheat sheet

Let L = length of the word/prefix, N = total number of characters over all inserted words, Σ = alphabet size.

| Operation | Time | Space |
|---|---|---|
| `insert(word)` | O(L) | up to O(L) new nodes |
| `search(word)` / `startsWith(prefix)` | O(L) | O(1) |
| Build a trie of all words | O(N) | O(N) nodes in the worst case (no shared prefixes) |
| Collect all words under a prefix | O(L + size of the subtree) | O(depth) recursion |
| Wildcard search with d dots | O(Σ^d · L) worst case | O(L) recursion |
| Array-of-26 children | same times, faster constants | 26 slots per node (more memory) |

## Common mistakes

- **`search` returning `true` for a prefix.** After walking the word you must check `node.isEnd`; the path existing is not enough.
- **Setting `isEnd` on the wrong node** — it goes on the node reached *after* the last character, not on the root or the second-to-last node.
- **Creating nodes during `search`.** Only `insert` should add nodes; a search that creates children pollutes the trie and breaks later `startsWith` calls.
- **Reporting the same word twice** in grid searches, when two different paths spell it. Clear `node.word` (or keep a `Set`) after reporting.
- **Forgetting to restore a grid cell** after marking it visited during a board DFS.
- **Rebuilding strings over and over.** Store the full word on its end node instead of re-concatenating the path when you find it.
- **Using a trie when a `Set` would do.** If no question involves prefixes or wildcards, the extra code buys you nothing.

## Practice

- [Implement Trie (Prefix Tree)](#/practice/13-tries/implement-trie-prefix-tree) — Medium
- [Design Add and Search Words Data Structure](#/practice/13-tries/design-add-and-search-words-data-structure) — Medium
- [Word Search II](#/practice/13-tries/word-search-ii) — Hard

## Before moving on

- [ ] I can write a `TrieNode` and the `insert` / `search` / `startsWith` trio from memory.
- [ ] I can explain the one-line difference between `search` and `startsWith`.
- [ ] I can say when a trie beats a `Set`, and when a `Set` is the simpler choice.
- [ ] I can DFS over a trie to list every word under a prefix.
- [ ] I can combine a grid DFS with a trie walk and prune dead branches early.
- [ ] I can state the time and space costs in terms of word length L and total characters N.
