/**
 * Spiral Matrix — shrink four boundaries after walking each edge.
 * Time O(m·n), Space O(1) extra (the output itself is O(m·n))
 *
 * top/bottom/left/right mark the ring still to visit. Walk the top row, right
 * column, bottom row and left column, pulling each boundary in after its edge.
 * The two guards stop a leftover single row/column from being walked twice.
 */
function spiralOrder(matrix) {
  const out = [];
  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) out.push(matrix[top][c]);
    top++;
    for (let r = top; r <= bottom; r++) out.push(matrix[r][right]);
    right--;
    if (top <= bottom) {
      for (let c = right; c >= left; c--) out.push(matrix[bottom][c]);
      bottom--;
    }
    if (left <= right) {
      for (let r = bottom; r >= top; r--) out.push(matrix[r][left]);
      left++;
    }
  }
  return out;
}

module.exports = spiralOrder;
