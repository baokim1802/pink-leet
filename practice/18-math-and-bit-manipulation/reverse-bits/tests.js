module.exports = {
  fn: 'reverseBits',
  cases: [
    { args: [43261596], expected: 964176192 },
    { args: [4294967293], expected: 3221225471 },
    { name: 'zero', args: [0], expected: 0 },
    { name: 'one -> top bit (unsigned!)', args: [1], expected: 2147483648 },
    { name: 'top bit -> one', args: [2147483648], expected: 1 },
    { name: 'all ones', args: [4294967295], expected: 4294967295 },
    { args: [2], expected: 1073741824 },
    { name: 'low half -> high half', args: [65535], expected: 4294901760 },
    { name: 'top nibble -> bottom nibble', args: [4026531840], expected: 15 },
  ],
};
