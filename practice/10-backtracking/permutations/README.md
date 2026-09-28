# Permutations

Given an array `nums` of **distinct** integers, return every possible ordering (permutation) of its elements.

You may return the permutations in any order — but of course the order of numbers *inside* each permutation is what makes it a permutation.

## Examples

```
Input:  nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

```
Input:  nums = [0,1]
Output: [[0,1],[1,0]]
```

```
Input:  nums = [1]
Output: [[1]]
```

## Constraints

- `1 <= nums.length <= 6`
- `-10 <= nums[i] <= 10`
- All values in `nums` are unique.

## Hints

<details><summary>Hint 1</summary>

Fill the positions one at a time. For the first slot you have `n` choices, for the second `n - 1`, and so on. How many permutations is that?

</details>

<details><summary>Hint 2</summary>

Unlike subsets, a `start` index won't work here: after picking `3` first, you still need to be able to pick `1` and `2`. Keep a `used` boolean array instead.

</details>

<details><summary>Hint 3</summary>

When `path.length === nums.length`, record a copy. Otherwise loop over *all* indices, skip the used ones, and do choose → explore → unchoose (remember to reset `used[i]` too).

</details>
