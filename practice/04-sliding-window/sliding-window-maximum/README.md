# Sliding Window Maximum

You're given an integer array `nums` and a window size `k`. A window of `k` consecutive elements starts at the left edge and slides right one position at a time until it reaches the right edge.

Return an array containing the **maximum of each window**, in order.

## Examples

```
Input:  nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]

Window position                Max
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
```

```
Input:  nums = [1], k = 1
Output: [1]
```

## Constraints

- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`
- `1 <= k <= nums.length`

## Hints

<details><summary>Hint 1</summary>

Recomputing the max of each window is `O(n · k)`. What information from the previous window is worth keeping?

</details>

<details><summary>Hint 2</summary>

If a newer element is bigger than an older one, the older one can **never** be a window max again — it will leave the window first. So throw it away.

</details>

<details><summary>Hint 3</summary>

Keep a deque of **indices** whose values are decreasing from front to back. Before pushing index `i`, pop smaller values off the back. Drop the front if it slid out of the window. The front is always the current max. (JS has no deque — use an array plus a `head` index instead of `shift()`, which is `O(n)`.)

</details>
