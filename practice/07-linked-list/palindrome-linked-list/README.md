# Palindrome Linked List

Given the `head` of a singly linked list, return `true` if its values read the same forwards and backwards (a **palindrome**), otherwise `false`.

## Examples

```
Input:  head = [1,2,2,1]
Output: true
```

```
Input:  head = [1,2]
Output: false
```

```
Input:  head = [1,2,3,2,1]
Output: true       // odd length: the middle value pairs with itself
```

## Constraints

- The list has between `1` and `10^5` nodes.
- `0 <= Node.val <= 9`

**Follow-up:** can you do it in `O(n)` time and `O(1)` extra space?

## Hints

<details><summary>Hint 1</summary>

The easy version: copy the values into an array, then check the array with two pointers from both ends. That's `O(n)` space.

</details>

<details><summary>Hint 2</summary>

For `O(1)` space: use fast & slow pointers to find the **middle** of the list. When `fast` reaches the end, `slow` is halfway.

</details>

<details><summary>Hint 3</summary>

Reverse the second half in place, then walk the first half and the reversed second half side by side, comparing values. (Nice touch: reverse it back afterwards so you leave the list the way you found it.)

</details>
