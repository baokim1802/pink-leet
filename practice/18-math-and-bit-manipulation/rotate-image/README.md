# Rotate Image

You're given an `n x n` 2D `matrix` representing an image. Rotate it **90 degrees clockwise**.

You must do it **in place**: change `matrix` itself, and don't allocate a second 2D matrix. The function doesn't return anything.

## Examples

```
Input:  matrix = [[1,2,3],
                  [4,5,6],
                  [7,8,9]]
After:  matrix = [[7,4,1],
                  [8,5,2],
                  [9,6,3]]
```

```
Input:  matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
After:  matrix = [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
```

## Constraints

- `n == matrix.length == matrix[i].length`
- `1 <= n <= 20`
- `-1000 <= matrix[i][j] <= 1000`

## Hints

<details><summary>Hint 1</summary>

Track where one cell goes: after a clockwise rotation, the value at `(r, c)` ends up at `(c, n - 1 - r)`. Can you get there with two simpler moves?

</details>

<details><summary>Hint 2</summary>

**Transpose** (swap `matrix[r][c]` with `matrix[c][r]`) sends `(r, c)` to `(c, r)`. Then **reverse each row** sends `(c, r)` to `(c, n - 1 - r)`.

</details>

<details><summary>Hint 3</summary>

When transposing, only loop over `c > r` (the upper triangle). If you swap every pair twice, you undo your own work.

</details>
