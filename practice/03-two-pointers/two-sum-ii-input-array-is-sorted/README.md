# Two Sum II - Input Array Is Sorted

`numbers` is sorted in **non-decreasing** order. Find two numbers in it that add up to `target` and return their positions as `[index1, index2]`, where the positions are **1-indexed** and `index1 < index2`.

There is always **exactly one** solution, and you can't use the same element twice. Your solution should use only **constant extra space**.

## Examples

```
Input:  numbers = [2,7,11,15], target = 9
Output: [1,2]          // 2 + 7 === 9, positions 1 and 2
```

```
Input:  numbers = [2,3,4], target = 6
Output: [1,3]
```

```
Input:  numbers = [-1,0], target = -1
Output: [1,2]
```

## Constraints

- `2 <= numbers.length <= 3 * 10^4`
- `-1000 <= numbers[i] <= 1000`
- `numbers` is sorted in non-decreasing order.
- `-1000 <= target <= 1000`
- Exactly one valid answer exists.

## Hints

<details><summary>Hint 1</summary>

The hash-map trick from Two Sum works but uses `O(n)` space. The array is **sorted** — how can you use that?

</details>

<details><summary>Hint 2</summary>

Start with the smallest and largest numbers. If their sum is too small, which pointer should move? If it's too big?

</details>

<details><summary>Hint 3</summary>

Don't forget to add 1 to each index when you return.

</details>
