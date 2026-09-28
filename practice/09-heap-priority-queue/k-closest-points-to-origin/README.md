# K Closest Points to Origin

You're given an array of `points`, where `points[i] = [x, y]` is a point on the plane, and an integer `k`. Return the `k` points that are **closest to the origin** `(0, 0)` by ordinary (Euclidean) distance.

You may return them in **any order**. The inputs are chosen so the answer is unique.

## Examples

```
Input:  points = [[1,3],[-2,2]], k = 1
Output: [[-2,2]]

  distance² of [1,3]  = 1 + 9 = 10
  distance² of [-2,2] = 4 + 4 = 8   <- closer
```

```
Input:  points = [[3,3],[5,-1],[-2,4]], k = 2
Output: [[3,3],[-2,4]]     // [[-2,4],[3,3]] is also accepted
```

## Constraints

- `1 <= k <= points.length <= 10^4`
- `-10^4 <= x, y <= 10^4`

## Hints

<details><summary>Hint 1</summary>

You never need the actual square root: comparing `x*x + y*y` gives the same ordering.

</details>

<details><summary>Hint 2</summary>

Sorting all points by distance and taking the first `k` is `O(n log n)` and perfectly acceptable. Can you get `O(n log k)`?

</details>

<details><summary>Hint 3</summary>

Keep a **max-heap of size `k`** keyed by distance. Push each point; if the heap grows past `k`, pop the farthest. What's left are the `k` closest.

</details>
