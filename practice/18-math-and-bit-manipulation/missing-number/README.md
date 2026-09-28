# Missing Number

You're given an array `nums` holding `n` **distinct** numbers, all taken from the range `[0, n]`. That range has `n + 1` values, so exactly one of them is missing from the array. Return it.

## Examples

```
Input:  nums = [3,0,1]
Output: 2          // n = 3, range is [0,3], 2 is absent
```

```
Input:  nums = [0,1]
Output: 2          // n = 2, range is [0,2]
```

```
Input:  nums = [9,6,4,2,3,5,7,0,1]
Output: 8
```

## Constraints

- `n == nums.length`
- `1 <= n <= 10^4`
- `0 <= nums[i] <= n`
- All values in `nums` are unique.

**Follow-up:** can you do it in `O(n)` time with only `O(1)` extra space?

## Hints

<details><summary>Hint 1</summary>

Sorting works but costs `O(n log n)`. A `Set` works but costs `O(n)` space. What do you know about the range `0..n` as a whole?

</details>

<details><summary>Hint 2</summary>

Math route: the sum `0 + 1 + ... + n` is `n * (n + 1) / 2`. Subtract what you actually have.

</details>

<details><summary>Hint 3</summary>

Bit route: XOR all the indices `0..n` together with all the values. Every number that's present appears twice and cancels out.

</details>
