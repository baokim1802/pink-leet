# Valid Palindrome

A phrase counts as a **palindrome** if, after lowercasing every letter and throwing away everything that isn't a letter or digit, it reads the same forwards and backwards.

Given a string `s`, return `true` if it's a palindrome by that rule, otherwise `false`.

## Examples

```
Input:  s = "A man, a plan, a canal: Panama"
Output: true           // cleaned: "amanaplanacanalpanama"
```

```
Input:  s = "race a car"
Output: false          // cleaned: "raceacar"
```

```
Input:  s = " "
Output: true           // cleaned: "" — an empty string is a palindrome
```

## Constraints

- `1 <= s.length <= 2 * 10^5`
- `s` contains printable ASCII characters only.

**Follow-up:** can you solve it with `O(1)` extra space (no cleaned copy of the string)?

## Hints

<details><summary>Hint 1</summary>

The easy way: build the cleaned lowercase string and compare it to its reverse. That works, but uses `O(n)` extra space.

</details>

<details><summary>Hint 2</summary>

Put one pointer at each end. Move each pointer inward past any non-alphanumeric characters, then compare the two characters (lowercased).

</details>

<details><summary>Hint 3</summary>

Watch out: digits count, and `'0'` is not the same as `'P'`. Keep `l < r` in every inner loop so pointers never cross.

</details>
