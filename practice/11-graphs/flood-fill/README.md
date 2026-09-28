# Flood Fill

You're given an image as a 2D grid of integers `image`, where each number is a pixel's color, plus a starting pixel `(sr, sc)` and a new `color`.

Do what the paint-bucket tool does: recolor the starting pixel, and every pixel connected to it **horizontally or vertically** that has the *same original color* as the starting pixel, to `color`. Keep spreading from each recolored pixel. Return the modified image.

## Examples

```
Input:  image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2
Output: [[2,2,2],[2,2,0],[2,0,1]]
// the bottom-right 1 only touches the region diagonally, so it stays 1
```

```
Input:  image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0
Output: [[0,0,0],[0,0,0]]
// the new color equals the old one — nothing changes
```

## Constraints

- `1 <= image.length, image[i].length <= 50`
- `0 <= image[i][j], color < 2^16`
- `0 <= sr < image.length`, `0 <= sc < image[0].length`

## Hints

<details><summary>Hint 1</summary>

Remember the starting pixel's original color first. Then DFS/BFS from `(sr, sc)` to every 4-directional neighbor that still has that original color.

</details>

<details><summary>Hint 2</summary>

Recoloring a pixel doubles as marking it "visited" — a recolored pixel no longer matches the original color, so you won't visit it again.

</details>

<details><summary>Hint 3</summary>

That trick breaks when `color` already equals the original color: nothing ever looks visited and you loop forever. Return early in that case.

</details>
