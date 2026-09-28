# Climbing Stairs

A staircase has `n` steps. Each move, you climb either **1 step or 2 steps**. In how many distinct ways can you reach the top?

(Order matters: `1 + 2` and `2 + 1` are different ways.)

## Examples

```
Input:  n = 2
Output: 2
// 1 + 1, or 2
```

```
Input:  n = 3
Output: 3
// 1 + 1 + 1, 1 + 2, 2 + 1
```

## Constraints

- `1 <= n <= 45`

## Hints

<details><summary>Hint 1</summary>

Think about your **last** move. To stand on step `n`, you came either from step `n - 1` or from step `n - 2`.

</details>

<details><summary>Hint 2</summary>

So `ways(n) = ways(n - 1) + ways(n - 2)`. Plain recursion is exponential for `n = 45` — memoize it or build the answers bottom-up.

</details>

<details><summary>Hint 3</summary>

You only ever need the previous two values. Can you do it with two variables?

</details>
