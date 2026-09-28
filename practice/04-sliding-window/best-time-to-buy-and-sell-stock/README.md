# Best Time to Buy and Sell Stock

You're given an array `prices` where `prices[i]` is the price of a stock on day `i`.

You get to make **one** trade: buy on some day, then sell on a **later** day. Return the biggest profit you can make. If no trade makes money, return `0`.

## Examples

```
Input:  prices = [7,1,5,3,6,4]
Output: 5          // buy at 1 (day 1), sell at 6 (day 4)
```

```
Input:  prices = [7,6,4,3,1]
Output: 0          // prices only fall, so don't trade
```

## Constraints

- `1 <= prices.length <= 10^5`
- `0 <= prices[i] <= 10^4`

## Hints

<details><summary>Hint 1</summary>

Try every pair `(buy, sell)` with `buy < sell` first. That's `O(n²)`. What repeated work could you avoid?

</details>

<details><summary>Hint 2</summary>

If you're selling on day `i`, the best day to have bought is the **cheapest day before `i`**. Can you keep track of that as you walk?

</details>

<details><summary>Hint 3</summary>

Think of a window `[buy, sell]`. If `prices[sell]` drops below `prices[buy]`, there's no point keeping the old left edge — jump it forward to `sell`.

</details>
