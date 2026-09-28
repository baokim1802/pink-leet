# Jump Game II

Same setup as Jump Game: you start at index `0`, and `nums[i]` is the maximum forward jump from index `i`. This time the last index is **guaranteed to be reachable**.

Return the **minimum number of jumps** needed to reach the last index.

## Examples

```
Input:  nums = [2,3,1,1,4]
Output: 2
// jump to index 1, then 3 steps to the last index
```

```
Input:  nums = [2,3,0,1,4]
Output: 2
```

## Constraints

- `1 <= nums.length <= 10^4`
- `0 <= nums[i] <= 1000`
- You can always reach `nums[n - 1]`.

## Hints

<details><summary>Hint 1</summary>

Think of it as BFS: "level 0" is index 0, "level 1" is every index reachable in one jump, and so on. The answer is the level of the last index.

</details>

<details><summary>Hint 2</summary>

Each level is a contiguous window of indices. You don't need a queue — just the window's right edge (`end`) and the farthest index reachable from anything inside the window.

</details>

<details><summary>Hint 3</summary>

Scan `i` from `0` to `n - 2`, updating `farthest`. When `i` hits `end`, you must take another jump: `jumps++` and `end = farthest`.

</details>
