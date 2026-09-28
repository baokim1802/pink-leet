/**
 * Letter Combinations of a Phone Number — backtracking over the digits.
 * Time O(k · 4^k), Space O(k) extra (recursion + path), plus the output.
 * (k = digits.length; each digit has at most 4 letters.)
 *
 * Level i of the decision tree picks a letter for digits[i]. Strings are
 * immutable, so `path + ch` hands each call its own string — no undo needed.
 */
const KEYPAD = {
  2: 'abc', 3: 'def', 4: 'ghi', 5: 'jkl',
  6: 'mno', 7: 'pqrs', 8: 'tuv', 9: 'wxyz',
};

function letterCombinations(digits) {
  if (digits.length === 0) return [];
  const res = [];

  function dfs(i, path) {
    if (i === digits.length) {
      res.push(path);
      return;
    }
    for (const ch of KEYPAD[digits[i]]) dfs(i + 1, path + ch);
  }

  dfs(0, '');
  return res;
}

module.exports = letterCombinations;
