// Larger case: a pseudo-random 12x12 board and 600 words; expected answers are
// computed by brute force (a plain one-word-at-a-time grid search per word).
const makeLarge = () => {
  let seed = 2024; // tiny "minimal standard" LCG, safe within double precision
  const rand = (n) => {
    seed = (seed * 48271) % 2147483647;
    return seed % n;
  };
  const board = Array.from({ length: 12 }, () => Array.from({ length: 12 }, () => 'abcde'[rand(5)]));
  const words = new Set();
  while (words.size < 600) {
    let w = '';
    const len = 2 + rand(7);
    for (let i = 0; i < len; i++) w += 'abcde'[rand(5)];
    words.add(w);
  }
  const canTrace = (w) => {
    const seen = board.map((row) => row.map(() => false));
    const go = (r, c, i) => {
      if (r < 0 || c < 0 || r >= 12 || c >= 12 || seen[r][c] || board[r][c] !== w[i]) return false;
      if (i === w.length - 1) return true;
      seen[r][c] = true;
      const ok = go(r + 1, c, i + 1) || go(r - 1, c, i + 1) || go(r, c + 1, i + 1) || go(r, c - 1, i + 1);
      seen[r][c] = false;
      return ok;
    };
    return board.some((row, r) => row.some((_, c) => go(r, c, 0)));
  };
  const list = [...words];
  return { name: 'larger: 12x12 board, 600 words', args: [board, list], expected: list.filter(canTrace) };
};

module.exports = {
  fn: 'findWords',
  compare: 'unordered', // found words may be returned in any order
  cases: [
    {
      args: [
        [['o', 'a', 'a', 'n'], ['e', 't', 'a', 'e'], ['i', 'h', 'k', 'r'], ['i', 'f', 'l', 'v']],
        ['oath', 'pea', 'eat', 'rain'],
      ],
      expected: ['eat', 'oath'],
    },
    { name: 'nothing found', args: [[['a', 'b'], ['c', 'd']], ['abcb']], expected: [] },
    { name: 'single cell', args: [[['a']], ['a', 'b', 'aa']], expected: ['a'] },
    { name: 'two paths, report once', args: [[['a', 'a']], ['aa']], expected: ['aa'] },
    { name: 'cannot reuse a cell', args: [[['a', 'b']], ['aba', 'ab', 'ba']], expected: ['ab', 'ba'] },
    {
      name: 'one word is a prefix of another',
      args: [
        [['o', 'a', 'b', 'n'], ['o', 't', 'a', 'e'], ['a', 'h', 'k', 'r'], ['a', 'f', 'l', 'v']],
        ['oa', 'oaa'],
      ],
      expected: ['oa', 'oaa'],
    },
    {
      name: 'long winding words',
      args: [
        [['a', 'b', 'c'], ['a', 'e', 'd'], ['a', 'f', 'g']],
        ['abcdefg', 'gfedcbaaa', 'eaabcdgfa', 'befa', 'dgc', 'ade'],
      ],
      expected: ['abcdefg', 'befa', 'eaabcdgfa', 'gfedcbaaa'],
    },
    makeLarge(),
  ],
};
