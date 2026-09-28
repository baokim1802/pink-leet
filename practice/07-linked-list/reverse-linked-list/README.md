# Reverse Linked List

You're given the `head` of a singly linked list. Flip the direction of every `next` pointer so the list runs backwards, and return the **new head** (which was the old tail).

## Examples

```
Input:  head = [1,2,3,4,5]
Output: [5,4,3,2,1]
```

```
Input:  head = [1,2]
Output: [2,1]
```

```
Input:  head = []
Output: []
```

## Constraints

- The list has between `0` and `5000` nodes.
- `-5000 <= Node.val <= 5000`

**Follow-up:** can you do it both iteratively *and* recursively?

## Hints

<details><summary>Hint 1</summary>

Walk the list once. At each node you want to point `cur.next` backwards — but if you do that first, you lose the rest of the list. What do you need to save before you rewire?

</details>

<details><summary>Hint 2</summary>

Keep three pointers: `prev` (starts as `null`), `cur`, and a temporary `next`. Save `next = cur.next`, set `cur.next = prev`, then slide `prev` and `cur` forward one step.

</details>

<details><summary>Hint 3</summary>

When `cur` becomes `null`, `prev` is sitting on the old tail — that's your new head.

</details>
