/**
 * Palindrome Partitioning — backtracking on "where does the next piece end?".
 * Time O(n · 2^n) (up to 2^(n-1) ways to cut, O(n) to check/copy each),
 * Space O(n) extra for recursion + path, plus the output.
 *
 * From index `start`, try every end index. If s[start..end] is a palindrome,
 * take it as the next piece and partition the rest. Reaching the end of the
 * string means every piece so far was a palindrome, so we record the path.
 */
function isPalindrome(s, i, j) {
  while (i < j) {
    if (s[i++] !== s[j--]) return false;
  }
  return true;
}

function partition(s) {
  const res = [];
  const path = [];

  function dfs(start) {
    if (start === s.length) {
      res.push([...path]);
      return;
    }
    for (let end = start; end < s.length; end++) {
      if (!isPalindrome(s, start, end)) continue; // prune: piece must be a palindrome
      path.push(s.slice(start, end + 1));
      dfs(end + 1);
      path.pop();
    }
  }

  dfs(0);
  return res;
}

module.exports = partition;
