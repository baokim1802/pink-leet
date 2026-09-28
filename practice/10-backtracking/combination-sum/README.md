# Combination Sum

You're given an array of **distinct** positive integers `candidates` and a positive integer `target`. Return every unique combination of candidates whose sum equals `target`.

You may use **the same number as many times as you like**. Two combinations are the same if they use each number the same number of times (so `[2,2,3]` and `[3,2,2]` count once). Return the combinations in any order.

## Examples

```
Input:  candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
// 2 + 2 + 3 = 7, and 7 = 7. Nothing else works.
```

```
Input:  candidates = [2,3,5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]
```

```
Input:  candidates = [2], target = 1
Output: []
```

## Constraints

- `1 <= candidates.length <= 30`
- `2 <= candidates[i] <= 40`
- All values in `candidates` are distinct.
- `1 <= target <= 40`
- The number of valid combinations is less than 150.

## Hints

<details><summary>Hint 1</summary>

Track the `remaining` amount. When it hits `0` you've found a combination; when it goes negative, that branch is dead.

</details>

<details><summary>Hint 2</summary>

To avoid producing both `[2,3]` and `[3,2]`, use a `start` index so you only pick candidates at or after the current one. Because reuse is allowed, recurse with `i`, **not** `i + 1`.

</details>

<details><summary>Hint 3</summary>

Sort the candidates first. Then as soon as `candidates[i] > remaining` you can `break` — every later candidate is even bigger.

</details>
