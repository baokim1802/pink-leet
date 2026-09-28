# Decode Ways

A message of capital letters was encoded with `A → "1"`, `B → "2"`, …, `Z → "26"`. You're given the digit string `s` and want to know how many different messages it could have come from.

A valid decoding splits `s` into pieces where every piece is a number from `1` to `26` **with no leading zero** — so `"06"` is not a valid piece (only `"6"` is).

Return the number of ways to decode `s`, or `0` if there are none.

## Examples

```
Input:  s = "12"
Output: 2
// "AB" (1 2) or "L" (12)
```

```
Input:  s = "226"
Output: 3
// "BZ" (2 26), "VF" (22 6), "BBF" (2 2 6)
```

```
Input:  s = "06"
Output: 0
// "06" can't be a piece, and "0" alone isn't a letter
```

## Constraints

- `1 <= s.length <= 100`
- `s` contains only digits and may contain leading zeros.
- The answer fits in a 32-bit integer.

## Hints

<details><summary>Hint 1</summary>

Look at the end of the string. The last piece is either one digit or two digits. Each option is only allowed under certain conditions — what are they?

</details>

<details><summary>Hint 2</summary>

Let `dp[i]` be the number of ways to decode the first `i` characters. `dp[i]` gains `dp[i - 1]` if `s[i - 1]` is `'1'..'9'`, and gains `dp[i - 2]` if the two-digit piece `s[i - 2..i - 1]` is between `10` and `26`.

</details>

<details><summary>Hint 3</summary>

`dp[0] = 1` (the empty prefix has one way: do nothing). Like Climbing Stairs, you only need the previous two values.

</details>
