# Maximum Subarray

Given an integer array `nums`, find the **contiguous** subarray (containing at least one number) with the largest sum, and return that **sum**.

## Examples

```
Input:  nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
// the subarray [4,-1,2,1] sums to 6
```

```
Input:  nums = [1]
Output: 1
```

```
Input:  nums = [5,4,-1,7,8]
Output: 23
// the whole array
```

## Constraints

- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

**Follow-up:** once you have the `O(n)` solution, try a divide-and-conquer version for practice.

## Hints

<details><summary>Hint 1</summary>

The brute force tries every start and end. Instead, stand at index `i` and ask: what's the best sum of a subarray that **ends exactly here**?

</details>

<details><summary>Hint 2</summary>

The best subarray ending at `i` either extends the best one ending at `i - 1`, or starts fresh at `i`. When is starting fresh better?

</details>

<details><summary>Hint 3</summary>

If the running sum has gone negative, it can only drag down whatever comes next — drop it. Track the best running sum you've ever seen. Careful with all-negative arrays: the answer must still contain one element.

</details>
