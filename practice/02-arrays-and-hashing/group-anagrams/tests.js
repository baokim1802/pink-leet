module.exports = {
  fn: 'groupAnagrams',
  compare: 'unorderedNested',
  cases: [
    {
      args: [['eat', 'tea', 'tan', 'ate', 'nat', 'bat']],
      expected: [['bat'], ['nat', 'tan'], ['ate', 'eat', 'tea']],
    },
    { name: 'single empty string', args: [['']], expected: [['']] },
    { name: 'single letter', args: [['a']], expected: [['a']] },
    { name: 'multiple empty strings', args: [['', '', 'b']], expected: [['', ''], ['b']] },
    { name: 'duplicate words', args: [['abc', 'bca', 'abc', 'xyz']], expected: [['abc', 'abc', 'bca'], ['xyz']] },
    { name: 'no anagrams', args: [['ab', 'cd', 'ef']], expected: [['ab'], ['cd'], ['ef']] },
    { name: 'same letters, different counts', args: [['aab', 'abb', 'bab', 'baa']], expected: [['aab', 'baa'], ['abb', 'bab']] },
    { name: 'count-key ambiguity trap', args: [['abbbbbbbbbbb', 'aaaaaaaaaaab', 'bbbbbbbbbbba']], expected: [['abbbbbbbbbbb', 'bbbbbbbbbbba'], ['aaaaaaaaaaab']] },
  ],
};
