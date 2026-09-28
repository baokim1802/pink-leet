# Subsets

You're given an array `nums` of **distinct** integers. Return every possible subset (the *power set*) of `nums`.

The answer must not contain the same subset twice. You may return the subsets in any order, and the numbers inside each subset may be in any order too.

## Examples

```
Input:  nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
```

```
Input:  nums = [0]
Output: [[],[0]]
```

## Constraints

- `1 <= nums.length <= 10`
- `-10 <= nums[i] <= 10`
- All values in `nums` are unique.

**Follow-up:** can you solve it both with backtracking *and* iteratively (or with bitmasks)?

## Hints

<details><summary>Hint 1</summary>

For every element you make exactly one decision: **include it or skip it**. With `n` elements, how many subsets does that give?

</details>

<details><summary>Hint 2</summary>

Walk a recursion with a `start` index. At each call, the current `path` is already a valid subset — record a copy of it — then try extending it with each `nums[i]` for `i >= start`.

</details>

<details><summary>Hint 3</summary>

Remember to push `[...path]`, not `path`, and to `pop()` after the recursive call returns.

</details>
