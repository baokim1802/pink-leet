# Odd Even Linked List

Given the `head` of a singly linked list, regroup it so that all nodes at **odd positions** come first, followed by all nodes at **even positions**. Positions are counted from `1`, so the head is position 1 (odd), the next node is position 2 (even), and so on. This is about **positions**, not the values stored in the nodes.

Inside each group, keep the nodes in their original relative order. Return the new head.

Do it in `O(1)` extra space and `O(n)` time — rewire the existing nodes rather than creating new ones.

## Examples

```
Input:  head = [1,2,3,4,5]
Output: [1,3,5,2,4]      // positions 1,3,5 then 2,4
```

```
Input:  head = [2,1,3,5,6,4,7]
Output: [2,3,6,7,1,5,4]
```

## Constraints

- The list has between `0` and `10^4` nodes.
- `-10^6 <= Node.val <= 10^6`

## Hints

<details><summary>Hint 1</summary>

Build two chains at the same time: an "odd" chain starting at `head` and an "even" chain starting at `head.next`. Save the even chain's head — you'll need it at the end.

</details>

<details><summary>Hint 2</summary>

Leapfrog: `odd.next = even.next`, advance `odd`; then `even.next = odd.next`, advance `even`. Keep going while `even && even.next`.

</details>

<details><summary>Hint 3</summary>

Finally glue the chains: the last odd node's `next` becomes the saved even head. Don't forget the empty list!

</details>
