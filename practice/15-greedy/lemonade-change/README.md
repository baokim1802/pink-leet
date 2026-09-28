# Lemonade Change

You run a lemonade stand where each lemonade costs **$5**. Customers line up and pay one at a time, in the order given by `bills`. Each customer pays with a single `$5`, `$10`, or `$20` bill, and you must give back the correct change so that each of them effectively pays $5.

You start with **no money at all**. Return `true` if you can give every customer correct change, otherwise `false`.

## Examples

```
Input:  bills = [5,5,5,10,20]
Output: true
// after three $5s you can give $5 back for the $10,
// and $10 + $5 back for the $20
```

```
Input:  bills = [5,5,10,10,20]
Output: false
// by the time the $20 arrives you only hold two $10s — no way to make $15
```

## Constraints

- `1 <= bills.length <= 10^5`
- `bills[i]` is `5`, `10`, or `20`

## Hints

<details><summary>Hint 1</summary>

You only need to track how many `$5` and `$10` bills you hold. (`$20`s are never useful as change.)

</details>

<details><summary>Hint 2</summary>

A `$20` needs `$15` in change: either `$10 + $5` or `$5 + $5 + $5`. Which bill is more flexible and worth saving?

</details>

<details><summary>Hint 3</summary>

`$5` bills can make change for anything; `$10` bills only help with `$20`s. So when a `$20` arrives, spend a `$10` first if you have one.

</details>
