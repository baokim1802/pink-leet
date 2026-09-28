# Combination Sum II

You're given an array of positive integers `candidates` (it **may contain duplicates**) and a positive integer `target`. Return every unique combination of candidates whose sum is exactly `target`.

This time each element of `candidates` may be used **at most once** in a combination. And the answer must not contain the same combination twice — combinations that use the same values the same number of times are equal, no matter which copies of a duplicate you picked.

Return the combinations in any order.

## Examples

```
Input:  candidates = [10,1,2,7,6,1,5], target = 8
Output: [[1,1,6],[1,2,5],[1,7],[2,6]]
```

```
Input:  candidates = [2,5,2,1,2], target = 5
Output: [[1,2,2],[5]]
```

```
Input:  candidates = [2], target = 4
Output: []
// the single 2 can't be used twice
```

## Constraints

- `1 <= candidates.length <= 100`
- `1 <= candidates[i] <= 50`
- `1 <= target <= 30`

## Hints

<details><summary>Hint 1</summary>

Compared to Combination Sum there are two changes: every element is used at most once (so recurse with `i + 1`), and the input has duplicates (so you need to stop the same combination from appearing twice).

</details>

<details><summary>Hint 2</summary>

Sort the candidates. At one level of the recursion, if `candidates[i]` equals `candidates[i - 1]` and `i > start`, starting a branch with it would just repeat the previous sibling branch — skip it.

</details>

<details><summary>Hint 3</summary>

Sorting also gives you pruning for free: as soon as `candidates[i] > remaining`, `break` — every later candidate is at least as big.

</details>
