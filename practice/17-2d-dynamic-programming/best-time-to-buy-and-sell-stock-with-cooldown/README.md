# Best Time to Buy and Sell Stock with Cooldown

`prices[i]` is the price of a stock on day `i`. You may complete as many buy-then-sell trades as you like, with two rules:

- You can hold **at most one share** at a time (sell before you buy again).
- After you sell, you must skip the **next day** entirely (a one-day cooldown) before buying again.

Return the maximum total profit. Doing nothing (profit `0`) is always allowed.

## Examples

```
Input:  prices = [1,2,3,0,2]
Output: 3
// buy at 1, sell at 2, cooldown, buy at 0, sell at 2
```

```
Input:  prices = [1]
Output: 0
```

```
Input:  prices = [1,4,2,7]
Output: 6
// buy at 1, sell at 7 — selling at 4 would force a cooldown on the day priced 2
```

## Constraints

- `1 <= prices.length <= 5000`
- `0 <= prices[i] <= 1000`

## Hints

<details><summary>Hint 1</summary>

Describe each day by a **state**: holding a share, just sold today (so tomorrow is a cooldown), or resting with no share. The DP table has one row per day and one column per state.

</details>

<details><summary>Hint 2</summary>

Transitions: `hold = max(hold, rest - price)` (keep holding, or buy from rest), `sold = hold + price`, `rest = max(rest, sold)` (yesterday's `sold` finishes its cooldown). Use the previous day's values on the right-hand side.

</details>

<details><summary>Hint 3</summary>

Each day only needs the previous day, so three variables are enough. The answer is `max(sold, rest)` on the last day — you never want to end while holding.

</details>
