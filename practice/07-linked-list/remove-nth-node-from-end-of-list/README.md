# Remove Nth Node From End of List

Given the `head` of a linked list and an integer `n`, delete the node that is `n`-th **from the end** of the list (`n = 1` is the last node) and return the head of the resulting list.

## Examples

```
Input:  head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]     // the 2nd node from the end (4) is removed
```

```
Input:  head = [1], n = 1
Output: []
```

```
Input:  head = [1,2], n = 1
Output: [1]
```

## Constraints

- The list has `sz` nodes, with `1 <= sz <= 30`.
- `0 <= Node.val <= 100`
- `1 <= n <= sz`

**Follow-up:** can you do it in a single pass?

## Hints

<details><summary>Hint 1</summary>

Two passes works: count the length `L`, then walk to the node just before position `L - n` and skip over its neighbour.

</details>

<details><summary>Hint 2</summary>

What if `n` equals the length, so you have to remove the head itself? A `dummy` node in front of `head` makes that case look like every other one.

</details>

<details><summary>Hint 3</summary>

One pass: start two pointers at `dummy`. Move the first one `n + 1` steps ahead, then move both together until the first falls off the end. The second is now right *before* the node to delete.

</details>
