// large: s2 is "ab" repeated (9996 chars) followed by "qzyx" — the only match is "zyx" at the very end
const bigS2 = 'ab'.repeat(4998) + 'qzyx';

module.exports = {
  fn: 'checkInclusion',
  cases: [
    { args: ['ab', 'eidbaooo'], expected: true },
    { args: ['ab', 'eidboaoo'], expected: false },
    { name: 's1 longer than s2', args: ['abc', 'ab'], expected: false },
    { name: 'identical single letters', args: ['a', 'a'], expected: true },
    { name: 'single letter missing', args: ['a', 'bcd'], expected: false },
    { name: 'match at the very start', args: ['abc', 'cbaxyz'], expected: true },
    { name: 'match at the very end', args: ['abc', 'xyzbca'], expected: true },
    { name: 'duplicates in s1, absent', args: ['aab', 'abcab'], expected: false },
    { name: 'duplicates in s1, present', args: ['aab', 'bbaab'], expected: true },
    { name: 'right letters, wrong counts', args: ['abc', 'aabbcc'], expected: false },
    { name: 'large, match at the end', args: ['xyz', bigS2], expected: true },
    { name: 'large, no match', args: ['aa', 'ab'.repeat(5000)], expected: false },
  ],
};
