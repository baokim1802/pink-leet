/**
 * Valid Palindrome — converging pointers that skip non-alphanumerics.
 * Time O(n), Space O(1)
 *
 * Move l and r inward past anything that isn't a letter or digit, then compare the
 * lowercased characters. Any mismatch means it's not a palindrome.
 */
function isAlnum(code) {
  return (code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
}

function isPalindrome(s) {
  let l = 0;
  let r = s.length - 1;
  while (l < r) {
    while (l < r && !isAlnum(s.charCodeAt(l))) l++;
    while (l < r && !isAlnum(s.charCodeAt(r))) r--;
    if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;
    l++;
    r--;
  }
  return true;
}

module.exports = isPalindrome;
