# Fibonacci Number

The Fibonacci numbers start with `F(0) = 0` and `F(1) = 1`, and every later number is the sum of the two before it:

`F(n) = F(n - 1) + F(n - 2)` for `n > 1`.

Given `n`, return `F(n)`.

## Examples

```
Input:  n = 2
Output: 1
// F(2) = F(1) + F(0) = 1 + 0
```

```
Input:  n = 3
Output: 2
// F(3) = F(2) + F(1) = 1 + 1
```

```
Input:  n = 4
Output: 3
// F(4) = F(3) + F(2) = 2 + 1
```

## Constraints

- `0 <= n <= 30`

## Hints

<details><summary>Hint 1</summary>

The recurrence is handed to you. Writing it as plain recursion works, but draw the call tree for `F(5)`: how many times is `F(2)` computed?

</details>

<details><summary>Hint 2</summary>

Cache each answer the first time you compute it (memoization), or fill an array from `F(0)` upward (tabulation). Both are O(n).

</details>

<details><summary>Hint 3</summary>

Each value only needs the two before it. Two variables are enough — and don't forget `n = 0` and `n = 1`.

</details>
