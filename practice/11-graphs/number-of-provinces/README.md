# Number of Provinces

There are `n` cities. Connections are given as an `n x n` **adjacency matrix** `isConnected`: `isConnected[i][j] === 1` means cities `i` and `j` are directly linked, `0` means they aren't. Links go both ways, and every city is linked to itself.

If `a` is linked to `b` and `b` to `c`, then `a` and `c` are *indirectly* connected. A **province** is a group of cities that are all connected (directly or indirectly), with nobody outside the group connected to them.

Return the number of provinces.

## Examples

```
Input:  isConnected = [[1,1,0],[1,1,0],[0,0,1]]
Output: 2
// {0, 1} and {2}
```

```
Input:  isConnected = [[1,0,0],[0,1,0],[0,0,1]]
Output: 3
// nobody is linked — each city is its own province
```

## Constraints

- `1 <= n <= 200`
- `isConnected[i][j]` is `0` or `1`
- `isConnected[i][i] === 1` and `isConnected[i][j] === isConnected[j][i]`

## Hints

<details><summary>Hint 1</summary>

This is "count connected components". The graph just arrives as a matrix instead of an edge list: city `i`'s neighbors are every `j` with `isConnected[i][j] === 1`.

</details>

<details><summary>Hint 2</summary>

Loop over cities. Every city you haven't visited yet starts a new province — count it and DFS/BFS to mark everything reachable from it.

</details>

<details><summary>Hint 3</summary>

Union-find works too: start with `n` groups and subtract one every time a union merges two different groups.

</details>
