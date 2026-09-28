# Min Cost to Connect All Points

You're given `points`, where `points[i] = [x, y]` is a point on a 2D plane. Connecting two points costs their **Manhattan distance**: `|x1 - x2| + |y1 - y2|`.

Return the minimum total cost to connect **all** the points, so that there's exactly one simple path between any two of them.

## Examples

```
Input:  points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
Output: 20
// e.g. [0,0]-[2,2] (4), [2,2]-[5,2] (3), [5,2]-[7,0] (4), [2,2]-[3,10] (9)
```

```
Input:  points = [[3,12],[-2,5],[-4,1]]
Output: 18
```

## Constraints

- `1 <= points.length <= 1000`
- `-10^6 <= x, y <= 10^6`
- All points are distinct.

## Hints

<details><summary>Hint 1</summary>

"Connect everything with minimum total edge weight, no cycles" is the definition of a **minimum spanning tree** (MST). Every pair of points is a potential edge.

</details>

<details><summary>Hint 2</summary>

Kruskal: sort all `n(n-1)/2` edges and union-find them in order. Prim: grow a tree from one point, always adding the cheapest edge leaving it.

</details>

<details><summary>Hint 3</summary>

The graph is **complete** (dense), so Prim's with a plain `minDist` array — scan for the closest unvisited point each round — runs in `O(n²)` with no heap and no giant edge list.

</details>
