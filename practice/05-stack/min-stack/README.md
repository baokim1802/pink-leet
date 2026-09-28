# Min Stack

Design a stack that, on top of the usual operations, can report its **smallest element** — and every operation must run in `O(1)` time.

Implement the `MinStack` class:

- `constructor()` — creates an empty stack.
- `push(val)` — pushes `val` onto the stack.
- `pop()` — removes the top element.
- `top()` — returns the top element.
- `getMin()` — returns the minimum element currently in the stack.

## Examples

```
Operations: MinStack, push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()
Output:     null,     null,     null,    null,     -3,       null,  0,     -2
```

After popping `-3`, the minimum "goes back" to `-2`. That's the tricky part.

## Constraints

- `-2^31 <= val <= 2^31 - 1`
- `pop`, `top` and `getMin` are only called on a non-empty stack.
- At most `3 * 10^4` calls in total.

## Hints

<details><summary>Hint 1</summary>

A single `min` variable breaks as soon as you pop the minimum — what was the minimum *before* it was pushed?

</details>

<details><summary>Hint 2</summary>

Remember the answer for every height of the stack. Next to each value, store "the minimum of everything at or below this spot" — either in a second stack or as pairs `[val, minSoFar]`.

</details>
