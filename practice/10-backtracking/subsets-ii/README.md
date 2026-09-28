# Subsets II

This is [Subsets](#/practice/10-backtracking/subsets) with a twist: the array `nums` **may contain duplicates**. Return every possible subset of `nums`, but each distinct subset must appear **only once**.

Two subsets count as the same if they contain the same values the same number of times — so with `nums = [1,2,2]`, picking "the first 2" or "the second 2" gives the same subset `[2]`.

You may return the subsets in any order, and the numbers inside each subset may be in any order too.

## Examples

```
Input:  nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
```

```
Input:  nums = [0]
Output: [[],[0]]
```

```
Input:  nums = [2,2,2]
Output: [[],[2],[2,2],[2,2,2]]
// only 4 subsets, not 2³ = 8
```

## Constraints

- `1 <= nums.length <= 10`
- `-10 <= nums[i] <= 10`

## Hints

<details><summary>Hint 1</summary>

Start from the plain Subsets template (record the path at every node, then extend with each `nums[i]` for `i >= start`). Where do the duplicate subsets come from?

</details>

<details><summary>Hint 2</summary>

Sort `nums` first so equal values sit next to each other. Now duplicates happen when, at the **same level** of the recursion, you start a branch with a value you already started a branch with.

</details>

<details><summary>Hint 3</summary>

Inside the loop, skip `nums[i]` when `i > start && nums[i] === nums[i - 1]`. The `i > start` part matters: it still lets you take the second `2` *after* the first one (going deeper), you just can't *begin* a sibling branch with it.

</details>
