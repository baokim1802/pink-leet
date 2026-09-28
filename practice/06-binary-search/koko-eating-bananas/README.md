# Koko Eating Bananas

Koko has `piles` of bananas, where `piles[i]` is the number of bananas in pile `i`. The guards will be back in `h` hours.

Koko picks an eating speed `k` (bananas per hour). Each hour she chooses one pile and eats `k` bananas from it. If the pile has fewer than `k` left, she finishes it and **wastes the rest of that hour** — she doesn't move on to another pile until the next hour.

Return the **smallest integer `k`** that lets her finish every pile within `h` hours.

## Examples

```
Input:  piles = [3,6,7,11], h = 8
Output: 4          // hours: 1 + 2 + 2 + 3 = 8
```

```
Input:  piles = [30,11,23,4,20], h = 5
Output: 30         // one pile per hour, so k must cover the biggest pile
```

```
Input:  piles = [30,11,23,4,20], h = 6
Output: 23
```

## Constraints

- `1 <= piles.length <= 10^4`
- `piles.length <= h <= 10^9`
- `1 <= piles[i] <= 10^9`

## Hints

<details><summary>Hint 1</summary>

For a fixed speed `k`, how many hours does it take? Each pile needs `Math.ceil(pile / k)` hours. Add them up.

</details>

<details><summary>Hint 2</summary>

If speed `k` works, every faster speed works too. So the answers look like `no, no, no, yes, yes, yes…` over `k = 1..max(piles)`. You want the first `yes`.

</details>

<details><summary>Hint 3</summary>

Binary search on `k` itself, not on the array. With values up to `10^9`, be careful how you compute `mid` in JavaScript.

</details>
