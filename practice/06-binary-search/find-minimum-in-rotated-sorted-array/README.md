# Find Minimum in Rotated Sorted Array

Take an ascending array of **unique** numbers and rotate it some number of times: one rotation moves the last element to the front. For example `[0,1,2,4,5,6,7]` rotated 4 times becomes `[4,5,6,7,0,1,2]`. (Rotating `n` times gives back the original array.)

Given such a rotated array `nums`, return its **smallest** element. Your solution should run in `O(log n)` time.

## Examples

```
Input:  nums = [3,4,5,1,2]
Output: 1          // [1,2,3,4,5] rotated 3 times
```

```
Input:  nums = [4,5,6,7,0,1,2]
Output: 0
```

```
Input:  nums = [11,13,15,17]
Output: 11         // rotated 4 times = not rotated at all
```

## Constraints

- `1 <= nums.length <= 5000`
- `-5000 <= nums[i] <= 5000`
- All values are unique, and `nums` is a rotation of a sorted array.

## Hints

<details><summary>Hint 1</summary>

Picture the array as two ascending "ramps": a high one followed by a low one. The minimum is the first element of the low ramp.

</details>

<details><summary>Hint 2</summary>

Compare `nums[mid]` with the **last** element `nums[hi]`. If `nums[mid] > nums[hi]`, then `mid` is on the high ramp — the minimum is strictly to its right.

</details>

<details><summary>Hint 3</summary>

Otherwise `mid` is on the low ramp, so the minimum is at `mid` or to its left: `hi = mid`. Loop `while (lo < hi)` and return `nums[lo]`.

</details>
