# Last Stone Weight

You have a pile of stones, with `stones[i]` being the weight of stone `i`. Each turn, pick the **two heaviest** stones, `x <= y`, and smash them together:

- if `x === y`, both stones are destroyed;
- otherwise the `x` stone is destroyed and the `y` stone now weighs `y - x`.

Keep going until at most one stone is left. Return its weight, or `0` if no stones remain.

## Examples

```
Input:  stones = [2,7,4,1,8,1]
Output: 1

  smash 8 and 7 -> 1   stones [2,4,1,1,1]
  smash 4 and 2 -> 2   stones [2,1,1,1]
  smash 2 and 1 -> 1   stones [1,1,1]
  smash 1 and 1 -> 0   stones [1]
```

```
Input:  stones = [1]
Output: 1
```

## Constraints

- `1 <= stones.length <= 30`
- `1 <= stones[i] <= 1000`

## Hints

<details><summary>Hint 1</summary>

Every turn you need "the largest remaining item", and new items keep appearing. That's a job for a **max-heap**.

</details>

<details><summary>Hint 2</summary>

A max-heap is just a min-heap with the comparison flipped — or push negated numbers into a min-heap.

</details>

<details><summary>Hint 3</summary>

With only 30 stones, re-sorting every turn also passes. Try the heap anyway: that's the skill you're building.

</details>
