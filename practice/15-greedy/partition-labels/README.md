# Partition Labels

Given a string `s`, cut it into **as many pieces as possible** so that every letter appears in **at most one** piece. Glued back together in order, the pieces must form `s` again.

Return an array with the **length** of each piece, in order.

## Examples

```
Input:  s = "ababcbacadefegdehijhklij"
Output: [9,7,8]
// "ababcbaca" | "defegde" | "hijhklij"
// a cut like "ababcbacadefegde" | "hijhklij" is also valid but gives fewer pieces
```

```
Input:  s = "eccbbbbdec"
Output: [10]
// 'e' appears at both ends, so nothing can be split off
```

## Constraints

- `1 <= s.length <= 500`
- `s` consists of lowercase English letters.

## Hints

<details><summary>Hint 1</summary>

Once a piece contains a letter, it has to stretch at least to that letter's **last** occurrence. Precompute the last index of every letter.

</details>

<details><summary>Hint 2</summary>

Scan left to right keeping `end` = the farthest "last occurrence" of any letter seen in the current piece. Sounds a lot like Jump Game's farthest reach!

</details>

<details><summary>Hint 3</summary>

When your index `i` equals `end`, nothing in the current piece appears later — cut here, record its length, and start a new piece at `i + 1`.

</details>
