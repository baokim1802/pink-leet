# Target Sum

You get an array of non-negative integers `nums` and an integer `target`. Put either a `+` or a `-` sign in front of **every** number, then add everything up.

Return how many different sign assignments make the result equal `target`.

## Examples

```
Input:  nums = [1,1,1,1,1], target = 3
Output: 5
// -1+1+1+1+1, +1-1+1+1+1, +1+1-1+1+1, +1+1+1-1+1, +1+1+1+1-1
```

```
Input:  nums = [1], target = 1
Output: 1
```

```
Input:  nums = [0,0,0], target = 0
Output: 8
// +0 and -0 count as different assignments
```

## Constraints

- `1 <= nums.length <= 20`
- `0 <= nums[i] <= 1000`
- `0 <= sum(nums) <= 1000`
- `-1000 <= target <= 1000`

## Hints

<details><summary>Hint 1</summary>

Brute force tries all `2^n` sign choices. A memo on `(index, running sum)` removes the repeats — there are at most `n · (2 · sum + 1)` distinct states.

</details>

<details><summary>Hint 2</summary>

Algebra trick: call the numbers with `+` the set `P` and the rest `N`. Then `P - N = target` and `P + N = total`, so `P = (total + target) / 2`. Count subsets that sum to `P`.

</details>

<details><summary>Hint 3</summary>

If `total + target` is odd or `|target| > total`, the answer is `0`. Otherwise it's a 0/1 knapsack count: `ways[s] += ways[s - x]`, looping `s` **downwards**. Don't skip zeros — each zero doubles the count.

</details>
