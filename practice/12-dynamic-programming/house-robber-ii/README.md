# House Robber II

Same rules as House Robber — `nums[i]` is the money in house `i`, and you can't take from **two adjacent houses** — but this time the houses stand in a **circle**. That means the first and the last house are neighbors too.

Return the maximum amount you can collect.

## Examples

```
Input:  nums = [2,3,2]
Output: 3
// houses 0 and 2 would add up to 4, but they're neighbors in the circle
```

```
Input:  nums = [1,2,3,1]
Output: 4
// houses 0 and 2: 1 + 3
```

```
Input:  nums = [1,2,3]
Output: 3
```

## Constraints

- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 1000`

## Hints

<details><summary>Hint 1</summary>

The only new trouble is the pair (first house, last house). In any valid plan, at least one of those two is skipped.

</details>

<details><summary>Hint 2</summary>

So solve the ordinary straight-line House Robber twice: once on `nums` without the last house, once without the first house. Take the larger answer.

</details>

<details><summary>Hint 3</summary>

Watch the single-house case: removing either end leaves an empty row, so handle `nums.length === 1` directly.

</details>
