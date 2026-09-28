const LONG = 'a'.repeat(2000);

module.exports = {
  cls: 'Trie',
  cases: [
    {
      ops: ['Trie', 'insert', 'search', 'search', 'startsWith', 'insert', 'search'],
      args: [[], ['apple'], ['apple'], ['app'], ['app'], ['app'], ['app']],
      expected: [null, null, true, false, true, null, true],
    },
    {
      name: 'empty trie',
      ops: ['Trie', 'search', 'startsWith'],
      args: [[], ['a'], ['a']],
      expected: [null, false, false],
    },
    {
      name: 'single letter',
      ops: ['Trie', 'insert', 'search', 'startsWith', 'search', 'startsWith'],
      args: [[], ['a'], ['a'], ['a'], ['b'], ['b']],
      expected: [null, null, true, true, false, false],
    },
    {
      name: 'short word inserted before a longer one',
      ops: ['Trie', 'insert', 'insert', 'search', 'startsWith', 'search', 'search'],
      args: [[], ['app'], ['apple'], ['appl'], ['appl'], ['app'], ['apple']],
      expected: [null, null, null, false, true, true, true],
    },
    {
      name: 'duplicate insert',
      ops: ['Trie', 'insert', 'insert', 'search', 'search'],
      args: [[], ['hi'], ['hi'], ['hi'], ['h']],
      expected: [null, null, null, true, false],
    },
    {
      name: 'query longer than any word',
      ops: ['Trie', 'insert', 'startsWith', 'search', 'startsWith', 'search'],
      args: [[], ['cat'], ['cats'], ['cats'], ['cat'], ['ca']],
      expected: [null, null, false, false, true, false],
    },
    {
      name: 'branching words',
      ops: ['Trie', 'insert', 'insert', 'insert', 'startsWith', 'startsWith', 'startsWith', 'search', 'search', 'search', 'search'],
      args: [[], ['car'], ['cat'], ['dog'], ['ca'], ['d'], ['e'], ['car'], ['ca'], ['dog'], ['cow']],
      expected: [null, null, null, null, true, true, false, true, false, true, false],
    },
    {
      name: 'larger: a 2000-letter word',
      ops: ['Trie', 'insert', 'search', 'search', 'startsWith', 'startsWith'],
      args: [[], [LONG], [LONG], [LONG.slice(1)], [LONG.slice(1)], [LONG + 'a']],
      expected: [null, null, true, false, true, false],
    },
  ],
};
