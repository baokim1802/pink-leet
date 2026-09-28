# Reorder List

You're given the `head` of a singly linked list `L0 → L1 → … → Ln-1 → Ln`. Rearrange it **in place** into:

`L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → …`

That is: first node, last node, second node, second-to-last node, and so on. You must rewire the existing nodes — don't just swap the values around, and don't create new nodes. The function returns nothing; the tests look at the list starting from the original `head`.

## Examples

```
Input:  head = [1,2,3,4]
Output: [1,4,2,3]
```

```
Input:  head = [1,2,3,4,5]
Output: [1,5,2,4,3]
```

## Constraints

- The list has between `1` and `5 * 10^4` nodes.
- `1 <= Node.val <= 1000`

## Hints

<details><summary>Hint 1</summary>

The result alternates between the front half (in order) and the back half (in **reverse** order). What if the back half were already reversed?

</details>

<details><summary>Hint 2</summary>

Three steps, each one a classic: (1) find the middle with fast & slow pointers, (2) cut the list there and reverse the second half, (3) merge the two halves by alternating nodes.

</details>

<details><summary>Hint 3</summary>

Cut cleanly: the node at the end of the first half must end up with `next = null`, or you'll create a cycle. For `[1,2,3,4,5]` the halves are `1→2→3` and `5→4`.

</details>
