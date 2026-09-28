// All 1000 three-letter words over the letters a..j: "aaa" -> "jjj" takes 3 changes.
const letters = 'abcdefghij';
const allWords = [];
for (const x of letters) for (const y of letters) for (const z of letters) allWords.push(x + y + z);

// A single long ladder: bump one position's letter each step, cycling through
// positions 0..4. Only consecutive words differ by exactly one letter.
const chain = ['aaaaa'];
for (let s = 0; s < 100; s++) {
  const w = chain[chain.length - 1].split('');
  const p = s % 5;
  w[p] = String.fromCharCode(w[p].charCodeAt(0) + 1);
  chain.push(w.join(''));
}

module.exports = {
  fn: 'ladderLength',
  cases: [
    { args: ['hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog']], expected: 5 },
    { args: ['hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log']], expected: 0 },
    { name: 'one-letter words', args: ['a', 'c', ['a', 'b', 'c']], expected: 2 },
    { name: 'single step', args: ['hot', 'dot', ['dot']], expected: 2 },
    { name: 'endWord in list but unreachable', args: ['hot', 'dog', ['hot', 'dog']], expected: 0 },
    { name: 'beginWord also in the list', args: ['hit', 'hot', ['hit', 'hot']], expected: 2 },
    { name: 'two equally short routes', args: ['hot', 'dog', ['hot', 'cog', 'dog', 'tot', 'hog', 'hop', 'pot', 'dot']], expected: 3 },
    { name: 'shortest beats a longer route', args: ['red', 'tax', ['ted', 'tex', 'red', 'tax', 'tad', 'den', 'rex', 'pee']], expected: 4 },
    { name: '1000 words, dense graph', args: ['aaa', 'jjj', allWords], expected: 4 },
    { name: 'ladder of 101 words', args: ['aaaaa', chain[100], chain.slice(1)], expected: 101 },
  ],
};
