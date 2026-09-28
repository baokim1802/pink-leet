# Minimum Number of Arrows to Burst Balloons

Balloons are taped to a wall. Each balloon is given as `points[i] = [xstart, xend]`: it spans every x-coordinate from `xstart` to `xend` (inclusive). Their heights don't matter.

You can shoot arrows straight up from any x-coordinate `x`. An arrow bursts **every** balloon with `xstart <= x <= xend`, and keeps flying after hitting one.

Return the minimum number of arrows needed to burst all the balloons.

## Examples

```
Input:  points = [[10,16],[2,8],[1,6],[7,12]]
Output: 2
// an arrow at x = 6 bursts [2,8] and [1,6]; one at x = 11 bursts [10,16] and [7,12]
```

```
Input:  points = [[1,2],[3,4],[5,6],[7,8]]
Output: 4
```

```
Input:  points = [[1,2],[2,3],[3,4],[4,5]]
Output: 2
// x = 2 bursts the first two, x = 4 the last two — touching balloons share an arrow
```

## Constraints

- `1 <= points.length <= 10^5`
- `points[i].length === 2`
- `-2^31 <= xstart <= xend <= 2^31 - 1`

## Hints

<details><summary>Hint 1</summary>

Look at the balloon that **ends** first. Some arrow must hit it, and the best place for that arrow is as far right as possible: exactly at its end.

</details>

<details><summary>Hint 2</summary>

Sort by end. Shoot an arrow at the first balloon's end; it pops every balloon whose start is `<=` that x. The first balloon it misses needs a new arrow at *its* end.

</details>

<details><summary>Hint 3</summary>

This is the same greedy as Non-overlapping Intervals, except touching counts as overlapping here, so the test is `start > arrowX` for "needs a new arrow".

</details>
