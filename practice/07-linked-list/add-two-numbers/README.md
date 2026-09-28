# Add Two Numbers

Two non-negative integers are stored as linked lists, one digit per node, with the digits in **reverse order** — the head holds the ones digit, the next node the tens digit, and so on. For example `342` is stored as `2 → 4 → 3`.

Add the two numbers and return the sum as a linked list in the same reverse-digit format. Neither input has leading zeros, except the number `0` itself (a single node `0`).

## Examples

```
Input:  l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]            // 342 + 465 = 807
```

```
Input:  l1 = [0], l2 = [0]
Output: [0]
```

```
Input:  l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]  // 9999999 + 9999 = 10009998
```

## Constraints

- Each list has between `1` and `100` nodes.
- `0 <= Node.val <= 9`
- No leading zeros except for the number `0` itself.

## Hints

<details><summary>Hint 1</summary>

Don't convert to numbers — 100 digits is far beyond `Number.MAX_SAFE_INTEGER`. Do grade-school addition instead: the lists are already in the order you add digits (ones first).

</details>

<details><summary>Hint 2</summary>

Walk both lists together with a `carry`. At each step: `sum = (a ? a.val : 0) + (b ? b.val : 0) + carry`, output digit `sum % 10`, new carry `Math.floor(sum / 10)`.

</details>

<details><summary>Hint 3</summary>

A dummy head makes building the output list painless. Keep looping while **either** list has nodes **or** `carry` is non-zero — that last carry can add a new digit.

</details>
