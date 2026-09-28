# Number of Islands

You get a 2D grid `grid` where each cell is the **string** `"1"` (land) or `"0"` (water). Count the islands.

An island is a group of land cells connected **horizontally or vertically** (not diagonally), surrounded by water. You can assume everything outside the grid is water.

## Examples

```
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
```

```
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
```

## Constraints

- `1 <= grid.length, grid[i].length <= 300`
- `grid[i][j]` is `"0"` or `"1"`.

## Hints

<details><summary>Hint 1</summary>

Scan every cell. When you find a `"1"` you haven't seen before, you've discovered a new island — count it.

</details>

<details><summary>Hint 2</summary>

Right after counting it, "sink" the whole island: DFS or BFS from that cell to every connected `"1"` and mark them visited (for example by setting them to `"0"`), so they're never counted again.

</details>

<details><summary>Hint 3</summary>

The cells are strings: compare with `"1"`, not `1`.

</details>
