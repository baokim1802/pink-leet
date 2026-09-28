# Fizz Buzz

Given an integer `n`, return an array of strings `answer` of length `n` (1-indexed, so the entry for `i` lives at `answer[i - 1]`) where:

- `"FizzBuzz"` if `i` is divisible by both 3 and 5,
- `"Fizz"` if `i` is divisible by 3 only,
- `"Buzz"` if `i` is divisible by 5 only,
- otherwise the number `i` itself **as a string**.

## Examples

```
Input:  n = 3
Output: ["1","2","Fizz"]
```

```
Input:  n = 5
Output: ["1","2","Fizz","4","Buzz"]
```

```
Input:  n = 15
Output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]
```

## Constraints

- `1 <= n <= 10^4`

## Hints

<details><summary>Hint 1</summary>

Loop `i` from `1` to `n` inclusive. The `%` operator tells you divisibility: `i % 3 === 0`.

</details>

<details><summary>Hint 2</summary>

Order matters: check "divisible by 15" (both) *before* checking 3 or 5 alone. And don't forget to turn numbers into strings with `String(i)`.

</details>
