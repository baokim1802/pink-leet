/**
 * Partition Labels — last-occurrence table + farthest reach.
 * Time O(n), Space O(1) (26 letters)
 *
 * A piece that contains letter c must extend to c's last occurrence. Scan left
 * to right, growing the current piece's `end` to cover the last occurrence of
 * every letter inside it. When i reaches `end`, no letter in the piece appears
 * again, so cutting here is safe — and cutting as early as possible maximizes
 * the number of pieces.
 */
function partitionLabels(s) {
  const last = new Map();
  for (let i = 0; i < s.length; i++) last.set(s[i], i);

  const sizes = [];
  let start = 0;
  let end = 0;
  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, last.get(s[i]));
    if (i === end) {
      sizes.push(end - start + 1);
      start = i + 1;
    }
  }
  return sizes;
}

module.exports = partitionLabels;
