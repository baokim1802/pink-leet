# Cheapest Flights Within K Stops

There are `n` cities labeled `0` to `n - 1`. Each entry of `flights` is `[from, to, price]`: a **one-way** flight from `from` to `to` costing `price`.

Given a starting city `src`, a destination `dst`, and an integer `k`, return the **cheapest price** to get from `src` to `dst` using **at most `k` stops** (a stop is an intermediate city, so at most `k + 1` flights). If there's no such route, return `-1`.

## Examples

```
Input:  n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]],
        src = 0, dst = 3, k = 1
Output: 700
// 0 → 1 → 3 costs 700. 0 → 1 → 2 → 3 costs only 400 but uses 2 stops.
```

```
Input:  n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1
Output: 200
```

```
Input:  n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0
Output: 500
// no stops allowed, so only the direct flight counts
```

## Constraints

- `1 <= n <= 100`
- `0 <= flights.length <= n * (n - 1) / 2`
- `0 <= from, to < n`, `from !== to`, `1 <= price <= 10^4`
- No duplicate flights.
- `0 <= src, dst, k < n`, `src !== dst`

## Hints

<details><summary>Hint 1</summary>

Plain Dijkstra finds the cheapest route but ignores the number of flights — the cheapest route may use too many. You need to limit the number of **edges**.

</details>

<details><summary>Hint 2</summary>

Bellman-Ford's round `i` computes the cheapest cost using at most `i` edges. Run exactly `k + 1` rounds.

</details>

<details><summary>Hint 3</summary>

In each round, read costs from a **copy** of the previous round's array and write into the new one. Otherwise one round could chain several flights together and sneak past the limit.

</details>
