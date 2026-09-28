# Search a 2D Matrix

You get an `m x n` integer `matrix` with two properties:

- every row is sorted ascending, left to right;
- the first number of each row is **bigger** than the last number of the row above it.

Return `true` if `target` appears anywhere in the matrix, otherwise `false`. Aim for `O(log(m * n))` time.

## Examples

```
Input:  matrix = [[1,3,5,7],
                  [10,11,16,20],
                  [23,30,34,60]], target = 3
Output: true
```

```
Input:  matrix = [[1,3,5,7],
                  [10,11,16,20],
                  [23,30,34,60]], target = 13
Output: false      // 13 would sit between 11 and 16, but it isn't there
```

## Constraints

- `1 <= m, n <= 100`
- `-10^4 <= matrix[i][j], target <= 10^4`

## Hints

<details><summary>Hint 1</summary>

Read the rows one after another: `1,3,5,7,10,11,16,20,23,...`. Thanks to the second property, that long sequence is completely sorted.

</details>

<details><summary>Hint 2</summary>

So pretend it's one flat array of length `m * n` and binary search it — without actually building the flat array.

</details>

<details><summary>Hint 3</summary>

Flat index `i` lives at row `Math.floor(i / n)`, column `i % n`, where `n` is the number of columns.

</details>
