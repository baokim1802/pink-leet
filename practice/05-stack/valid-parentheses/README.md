# Valid Parentheses

Given a string `s` made only of the characters `()[]{}`, decide whether the brackets are **valid**:

- every opening bracket is closed by a bracket of the **same type**, and
- brackets close in the **right order** (the most recently opened one closes first), and
- every closing bracket has a matching opener.

Return `true` or `false`.

## Examples

```
Input:  s = "()[]{}"
Output: true
```

```
Input:  s = "(]"
Output: false      // wrong type
```

```
Input:  s = "([)]"
Output: false      // right types, wrong order
```

```
Input:  s = "{[]}"
Output: true
```

## Constraints

- `1 <= s.length <= 10^4`
- `s` consists only of `()[]{}`.

## Hints

<details><summary>Hint 1</summary>

When you meet a closing bracket, which opening bracket must it match? The one you saw **most recently** that hasn't been closed yet.

</details>

<details><summary>Hint 2</summary>

"Most recent first" is exactly what a stack gives you. Push openers; on a closer, pop and check the type. What should happen if the stack is empty at that moment — or not empty at the very end?

</details>
