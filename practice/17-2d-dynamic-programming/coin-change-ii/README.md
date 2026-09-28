# Coin Change II

You have an unlimited supply of coins of each denomination in `coins`. Return the number of **different combinations** of coins that add up to exactly `amount`.

Order doesn't matter: `1 + 2` and `2 + 1` are the same combination and count once. If no combination works, return `0`.

## Examples

```
Input:  amount = 5, coins = [1,2,5]
Output: 4
// 5 | 2+2+1 | 2+1+1+1 | 1+1+1+1+1
```

```
Input:  amount = 3, coins = [2]
Output: 0
```

```
Input:  amount = 10, coins = [10]
Output: 1
```

## Constraints

- `1 <= coins.length <= 300`
- `1 <= coins[i] <= 5000`, all values are distinct
- `0 <= amount <= 5000`
- The answer fits in a 32-bit signed integer.

## Hints

<details><summary>Hint 1</summary>

Think "first `i` coin types, amount `a`": `ways[i][a] = ways[i-1][a]` (never use coin `i`) `+ ways[i][a - coin]` (use it at least once more). What is `ways[..][0]`?

</details>

<details><summary>Hint 2</summary>

That table collapses into one row `ways[a]`. Put the **coin loop outside** and the amount loop inside. If you swap them you count orderings (`1+2` and `2+1` separately).

</details>

<details><summary>Hint 3</summary>

Because each coin can be reused, the inner loop runs amounts **upwards**: `ways[a] += ways[a - coin]` for `a` from `coin` to `amount`.

</details>
