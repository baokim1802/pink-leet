# Decode String

A string is encoded with the rule `k[encoded]`: the part inside the brackets is repeated exactly `k` times. Encodings can be **nested**, like `2[a3[b]]`.

Given an encoded string `s`, return the decoded string.

You can assume the input is always well-formed: brackets match, `k` is a positive integer, and digits only ever appear as repeat counts (the plain text never contains digits).

## Examples

```
Input:  s = "3[a]2[bc]"
Output: "aaabcbc"
```

```
Input:  s = "3[a2[c]]"
Output: "accaccacc"     // a2[c] → "acc", repeated 3 times
```

```
Input:  s = "2[abc]3[cd]ef"
Output: "abcabccdcdcdef"
```

## Constraints

- `1 <= s.length <= 30`
- `s` consists of lowercase English letters, digits and square brackets.
- `1 <= k <= 300`
- The decoded output is at most `10^5` characters long.

## Hints

<details><summary>Hint 1</summary>

Every `[` means "start a new, inner string". Every `]` means "finish the inner string, repeat it, and glue it onto the outer one". That's a stack.

</details>

<details><summary>Hint 2</summary>

Keep a `current` string and a `num`. Digits build up `num` (it can have several digits, like `12`). Letters append to `current`.

</details>

<details><summary>Hint 3</summary>

On `[`, push `[current, num]` and reset both. On `]`, pop `[prev, k]` and set `current = prev + current.repeat(k)`.

</details>
