# Merge Two Sorted Lists

You get the heads of two linked lists, `list1` and `list2`, each already sorted in non-decreasing order. Combine them into **one** sorted linked list by splicing their existing nodes together, and return the head of the merged list.

## Examples

```
Input:  list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
```

```
Input:  list1 = [], list2 = []
Output: []
```

```
Input:  list1 = [], list2 = [0]
Output: [0]
```

## Constraints

- Each list has between `0` and `50` nodes.
- `-100 <= Node.val <= 100`
- Both lists are sorted in non-decreasing order.

## Hints

<details><summary>Hint 1</summary>

This is the "merge" step of merge sort. Look at the front of both lists — whichever is smaller goes next.

</details>

<details><summary>Hint 2</summary>

Handling "what's the head of the result?" is annoying. Create a fake `dummy` node, build the merged list off `dummy.next`, and return `dummy.next` at the end.

</details>

<details><summary>Hint 3</summary>

When one list runs out, you don't need to loop over the other — just attach whatever remains in one step.

</details>
