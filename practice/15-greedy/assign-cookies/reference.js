/**
 * Assign Cookies — sort both, then match smallest cookie to least greedy child.
 * Time O(n log n + m log m), Space O(1) extra (ignoring the sort)
 *
 * Greedy choice: the least greedy child should get the smallest cookie that
 * satisfies them. Any bigger cookie handed to them could only be more useful to
 * someone greedier (exchange argument). A cookie too small for the least greedy
 * waiting child is too small for everyone, so we skip it.
 */
function findContentChildren(g, s) {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);
  let child = 0;
  for (let cookie = 0; cookie < s.length && child < g.length; cookie++) {
    if (s[cookie] >= g[child]) child++;
  }
  return child;
}

module.exports = findContentChildren;
