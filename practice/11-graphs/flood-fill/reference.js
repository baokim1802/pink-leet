/**
 * Flood Fill — iterative DFS from the start pixel.
 * Time O(R · C), Space O(R · C) worst case for the stack.
 *
 * Remember the original color, then spread to 4-directional neighbors that
 * still have it, recoloring as we go (recoloring is our "visited" mark). If the
 * new color equals the original there's nothing to do — and bailing out early
 * also avoids an infinite loop. Mutates and returns the input image.
 */
function floodFill(image, sr, sc, color) {
  const original = image[sr][sc];
  if (original === color) return image;

  const rows = image.length;
  const cols = image[0].length;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  image[sr][sc] = color;
  const stack = [[sr, sc]];

  while (stack.length) {
    const [r, c] = stack.pop();
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && image[nr][nc] === original) {
        image[nr][nc] = color;
        stack.push([nr, nc]);
      }
    }
  }
  return image;
}

module.exports = floodFill;
