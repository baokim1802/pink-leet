# Spiral Matrix

Given an `m x n` `matrix`, return all of its elements in **spiral order**: start at the top-left, go right along the top row, down the right column, left along the bottom row, up the left column, and keep spiraling inward until every cell is visited once.

## Examples

```
Input:  matrix = [[1,2,3],
                  [4,5,6],
                  [7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]
```

```
Input:  matrix = [[1,2,3,4],
                  [5,6,7,8],
                  [9,10,11,12]]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]
```

## Constraints

- `m == matrix.length`, `n == matrix[i].length`
- `1 <= m, n <= 10`
- `-100 <= matrix[i][j] <= 100`

## Hints

<details><summary>Hint 1</summary>

Keep four boundaries: `top`, `bottom`, `left`, `right`. Walk one full edge, then shrink that boundary inward.

</details>

<details><summary>Hint 2</summary>

Order per lap: top row left→right (`top++`), right column top→bottom (`right--`), bottom row right→left (`bottom--`), left column bottom→top (`left++`).

</details>

<details><summary>Hint 3</summary>

Non-square matrices are the trap. After the first two edges, check `top <= bottom` before walking the bottom row and `left <= right` before walking the left column — otherwise a single leftover row or column gets visited twice.

</details>
