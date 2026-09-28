# Search in Rotated Sorted Array

An ascending array of **distinct** numbers was *rotated* at some unknown point: a prefix was cut off and moved to the end. For example `[0,1,2,4,5,6,7]` might become `[4,5,6,7,0,1,2]`. (It might also not be rotated at all.)

Given the rotated array `nums` and a `target`, return the index of `target`, or `-1` if it's not present. Your solution must run in `O(log n)` time.

## Examples

```
Input:  nums = [4,5,6,7,0,1,2], target = 0
Output: 4
```

```
Input:  nums = [4,5,6,7,0,1,2], target = 3
Output: -1
```

```
Input:  nums = [1], target = 0
Output: -1
```

## Constraints

- `1 <= nums.length <= 5000`
- `-10^4 <= nums[i], target <= 10^4`
- All values are unique.
- `nums` is an ascending array, possibly rotated.

## Hints

<details><summary>Hint 1</summary>

Split the array at any `mid`. At least one of the two halves, `[lo..mid]` or `[mid..hi]`, is still perfectly sorted. How can you tell which one by comparing just two numbers?

</details>

<details><summary>Hint 2</summary>

If `nums[lo] <= nums[mid]`, the left half is sorted. For a sorted half, checking "is target inside this range?" is a simple comparison of its endpoints.

</details>

<details><summary>Hint 3</summary>

If target is inside the sorted half, search there; otherwise it must be in the other half. Either way you discard half the array each step.

</details>
