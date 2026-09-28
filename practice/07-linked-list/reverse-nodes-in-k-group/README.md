# Reverse Nodes in k-Group

Given the `head` of a linked list and a positive integer `k`, reverse the nodes in consecutive groups of `k`, and return the new head.

- Walk the list from the start in chunks of `k` nodes and reverse each full chunk.
- If the last chunk has **fewer than `k`** nodes, leave it as it is.
- Rewire the nodes themselves — don't just change their values.

## Examples

```
Input:  head = [1,2,3,4,5], k = 2
Output: [2,1,4,3,5]        // [1,2] [3,4] reversed, [5] is too short
```

```
Input:  head = [1,2,3,4,5], k = 3
Output: [3,2,1,4,5]        // [1,2,3] reversed, [4,5] left alone
```

## Constraints

- The list has `n` nodes, `1 <= k <= n <= 5000`.
- `0 <= Node.val <= 1000`

**Follow-up:** can you do it with `O(1)` extra memory?

## Hints

<details><summary>Hint 1</summary>

Before reversing a group, check that it's complete: from the node just before the group, step forward `k` times. If you hit `null`, you're done.

</details>

<details><summary>Hint 2</summary>

Reverse the `k` nodes of the group with the usual `prev / cur / next` loop, but start `prev` at the node **after** the group — then the group's old first node automatically points onward to the rest of the list.

</details>

<details><summary>Hint 3</summary>

Keep a pointer `groupPrev` to the node before the current group (start with a dummy head). After reversing, `groupPrev.next` must point at the group's new first node, and the old first node becomes the next `groupPrev`.

</details>
