# Maximum Product Subarray

Given an integer array `nums`, find the non-empty **contiguous** subarray whose elements multiply to the largest product, and return that product.

## Examples

```
Input:  nums = [2,3,-2,4]
Output: 6
// [2,3]
```

```
Input:  nums = [-2,0,-1]
Output: 0
// [-2,-1] isn't contiguous, so the best is [0]
```

```
Input:  nums = [-2,3,-4]
Output: 24
// the whole array: two negatives cancel out
```

## Constraints

- `1 <= nums.length <= 2 * 10^4`
- `-10 <= nums[i] <= 10`
- The product of any subarray fits in a 32-bit integer.

## Hints

<details><summary>Hint 1</summary>

In Maximum *Subarray* (sum), you track the best sum ending at each index. Why does that alone fail for products? Think about what a negative number does to a very *small* product.

</details>

<details><summary>Hint 2</summary>

Track **two** values for subarrays ending at index `i`: the largest product and the smallest (most negative) product. A negative `nums[i]` swaps their roles.

</details>

<details><summary>Hint 3</summary>

The new max is `max(x, x * prevMax, x * prevMin)` and the new min is `min(x, x * prevMax, x * prevMin)`. Compute both from the *old* values before overwriting either. A `0` naturally resets things because `x` itself is a candidate.

</details>
