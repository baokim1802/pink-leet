module.exports = {
  fn: 'decodeString',
  cases: [
    { args: ['3[a]2[bc]'], expected: 'aaabcbc' },
    { args: ['3[a2[c]]'], expected: 'accaccacc' },
    { args: ['2[abc]3[cd]ef'], expected: 'abcabccdcdcdef' },
    { name: 'no encoding', args: ['leet'], expected: 'leet' },
    { name: 'single letter', args: ['1[z]'], expected: 'z' },
    { name: 'multi-digit count', args: ['12[ab]'], expected: 'abababababababababababab' },
    { name: 'text around brackets', args: ['ab2[c]d'], expected: 'abccd' },
    { name: 'deep nesting', args: ['2[a2[b2[c]]]'], expected: 'abccbccabccbcc' },
    { name: 'siblings inside nesting', args: ['2[x1[y]2[z]]'], expected: 'xyzzxyzz' },
    { name: 'large output', args: ['100[10[ab]]'], expected: 'ab'.repeat(1000) },
  ],
};
