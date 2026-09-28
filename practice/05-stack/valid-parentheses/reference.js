/**
 * Valid Parentheses — stack of expected closers.
 * Time O(n), Space O(n)
 *
 * On an opening bracket we push the closer we now expect. On a closing
 * bracket it must equal the top of the stack (pop() on an empty array
 * returns undefined, which never matches). The string is valid only if
 * the stack is empty at the end.
 */
function isValid(s) {
  const pairs = { '(': ')', '[': ']', '{': '}' };
  const stack = [];
  for (const ch of s) {
    if (ch in pairs) stack.push(pairs[ch]);
    else if (stack.pop() !== ch) return false;
  }
  return stack.length === 0;
}

module.exports = isValid;
