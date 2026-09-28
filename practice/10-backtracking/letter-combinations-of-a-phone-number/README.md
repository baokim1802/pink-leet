# Letter Combinations of a Phone Number

On an old phone keypad, each digit from `2` to `9` stands for a few letters:

```
2 → abc    3 → def    4 → ghi    5 → jkl
6 → mno    7 → pqrs   8 → tuv    9 → wxyz
```

Given a string `digits` made of the characters `'2'`–`'9'`, return every letter string the digits could spell — pick one letter for each digit, keeping the digits' order. If `digits` is empty, return an empty array.

You may return the strings in any order.

## Examples

```
Input:  digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

```
Input:  digits = "2"
Output: ["a","b","c"]
```

```
Input:  digits = ""
Output: []
```

## Constraints

- `0 <= digits.length <= 4`
- `digits[i]` is a digit in the range `'2'` to `'9'`.

## Hints

<details><summary>Hint 1</summary>

Put the keypad in a lookup table (an object or `Map` from digit to letters). With `k` digits, how deep is the decision tree, and how many branches does each level have?

</details>

<details><summary>Hint 2</summary>

Recurse with an index `i` into `digits` and the string built so far. When `i === digits.length` the string is complete; otherwise try each letter for `digits[i]` and recurse with `i + 1`.

</details>

<details><summary>Hint 3</summary>

Don't forget the empty-input case: with no digits there are no combinations, so return `[]` (not `[""]`).

</details>
