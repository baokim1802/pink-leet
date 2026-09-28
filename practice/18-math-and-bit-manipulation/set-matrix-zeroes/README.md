# Set Matrix Zeroes

Given an `m x n` integer `matrix`, whenever a cell holds `0`, set its **entire row and entire column** to `0`.

Do it **in place**: modify `matrix` itself. The function doesn't return anything.

Careful: only the zeros that were in the **original** matrix count. Zeros you write along the way must not spread further.

## Examples

```
Input:  matrix = [[1,1,1],
                  [1,0,1],
                  [1,1,1]]
After:  matrix = [[1,0,1],
                  [0,0,0],
                  [1,0,1]]
```

```
Input:  matrix = [[0,1,2,0],
                  [3,4,5,2],
                  [1,3,1,5]]
After:  matrix = [[0,0,0,0],
                  [0,4,5,0],
                  [0,3,1,0]]
```

## Constraints

- `m == matrix.length`, `n == matrix[0].length`
- `1 <= m, n <= 200`
- `-2^31 <= matrix[i][j] <= 2^31 - 1`

**Follow-up:** remembering the zero rows and columns in two sets uses `O(m + n)` space. Can you get it down to `O(1)` extra space?

## Hints

<details><summary>Hint 1</summary>

Don't zero things out while you're still scanning for zeros. First pass: record which rows and which columns contain a zero. Second pass: zero every cell whose row or column was recorded.

</details>

<details><summary>Hint 2</summary>

For `O(1)` space, reuse the matrix itself: use row 0 and column 0 as your "this row/column must be zeroed" markers.

</details>

<details><summary>Hint 3</summary>

Row 0 and column 0 share the corner cell `matrix[0][0]`, and their own markers would get overwritten. Remember separately (in one boolean) whether column 0 originally had a zero, and fill the inner cells before the marker row/column.

</details>
