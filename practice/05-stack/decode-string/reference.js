/**
 * Decode String — stack of (outer string, repeat count) frames.
 * Time O(output length), Space O(output length)
 *
 * `current` is the string being built at the current nesting level.
 * On '[' save the outer string and its pending count, then start fresh.
 * On ']' pop them and splice in the inner string repeated k times.
 */
function decodeString(s) {
  const stack = []; // [outerString, repeatCount]
  let current = '';
  let num = 0;
  for (const ch of s) {
    if (ch >= '0' && ch <= '9') {
      num = num * 10 + Number(ch);
    } else if (ch === '[') {
      stack.push([current, num]);
      current = '';
      num = 0;
    } else if (ch === ']') {
      const [prev, k] = stack.pop();
      current = prev + current.repeat(k);
    } else {
      current += ch;
    }
  }
  return current;
}

module.exports = decodeString;
