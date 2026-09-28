# Coin Change

You have coins of the denominations in `coins` (an unlimited supply of each) and a target `amount`.

Return the **fewest** coins needed to make exactly `amount`. If it can't be done, return `-1`.

## Examples

```
Input:  coins = [1,2,5], amount = 11
Output: 3
// 5 + 5 + 1
```

```
Input:  coins = [2], amount = 3
Output: -1
```

```
Input:  coins = [1], amount = 0
Output: 0
```

## Constraints

- `1 <= coins.length <= 12`
- `1 <= coins[i] <= 2^31 - 1`
- `0 <= amount <= 10^4`

## Hints

<details><summary>Hint 1</summary>

Greedy (always take the biggest coin that fits) is wrong. Try `coins = [1,3,4]`, `amount = 6`.

</details>

<details><summary>Hint 2</summary>

Let `dp[a]` be the fewest coins that make amount `a`. The last coin you used was some `c`, so `dp[a] = 1 + min(dp[a - c])` over every coin `c <= a`. What's `dp[0]`?

</details>

<details><summary>Hint 3</summary>

Initialize the table with `Infinity` to mean "impossible", fill it from `1` up to `amount`, and convert `Infinity` to `-1` at the end.

</details>
