# Hand of Straights

Alice holds a hand of cards, where `hand[i]` is the number written on card `i`. She wants to split **all** of her cards into groups of exactly `groupSize` cards, where each group is a run of **consecutive** numbers (like `4, 5, 6`).

Return `true` if she can do it, otherwise `false`.

## Examples

```
Input:  hand = [1,2,3,6,2,3,4,7,8], groupSize = 3
Output: true
// [1,2,3], [2,3,4], [6,7,8]
```

```
Input:  hand = [1,2,3,4,5], groupSize = 4
Output: false
// 5 cards can't be split into groups of 4
```

## Constraints

- `1 <= hand.length <= 10^4`
- `0 <= hand[i] <= 10^9`
- `1 <= groupSize <= hand.length`

## Hints

<details><summary>Hint 1</summary>

If `hand.length` isn't divisible by `groupSize`, the answer is immediately `false`.

</details>

<details><summary>Hint 2</summary>

Look at the **smallest** card still in the hand. It can't be the middle or end of a run (nothing smaller is left), so it **must** start one. That choice is forced — no guessing needed.

</details>

<details><summary>Hint 3</summary>

Count cards in a `Map`, then go through the distinct values in sorted order. For each value `v` with count `c > 0`, you must start `c` runs at `v`: subtract `c` from `v, v+1, ..., v+groupSize-1`, failing if any count would go negative.

</details>
