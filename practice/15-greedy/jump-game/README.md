# Jump Game

You start at index `0` of an array `nums`. Each value `nums[i]` is the **maximum** number of steps you may jump forward from index `i` (you can also jump fewer).

Return `true` if you can reach the **last index**, otherwise `false`.

## Examples

```
Input:  nums = [2,3,1,1,4]
Output: true
// jump 1 step to index 1, then 3 steps to the end
```

```
Input:  nums = [3,2,1,0,4]
Output: false
// every route lands on index 3, whose value 0 traps you
```

## Constraints

- `1 <= nums.length <= 10^4`
- `0 <= nums[i] <= 10^5`

## Hints

<details><summary>Hint 1</summary>

You don't need to know *which* jumps to take. Just track the set of indices you could possibly stand on. What shape does that set always have?

</details>

<details><summary>Hint 2</summary>

The reachable indices always form a prefix `0..farthest`. Walk left to right; from every index inside that prefix, update `farthest = max(farthest, i + nums[i])`.

</details>

<details><summary>Hint 3</summary>

If you ever arrive at an index `i > farthest`, you're stuck. (Alternative: walk backwards keeping a "goal" index that you shift left whenever `i + nums[i] >= goal`.)

</details>
