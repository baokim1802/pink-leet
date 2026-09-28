# House Robber

Houses stand in a row, and `nums[i]` is the amount of money in house `i`. You want to collect as much as possible, but the alarm system goes off if you take from **two adjacent houses**.

Return the maximum amount you can collect without taking from any two neighbors.

## Examples

```
Input:  nums = [1,2,3,1]
Output: 4
// houses 0 and 2: 1 + 3
```

```
Input:  nums = [2,7,9,3,1]
Output: 12
// houses 0, 2 and 4: 2 + 9 + 1
```

## Constraints

- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 400`

## Hints

<details><summary>Hint 1</summary>

Greedy ideas like "take every other house" fail — try `[2,1,1,2]`. At each house you have a real choice: take it, or skip it.

</details>

<details><summary>Hint 2</summary>

Let `best(i)` be the most you can collect from the first `i` houses. For house `i - 1`, either skip it (`best(i - 1)`) or take it and skip its neighbor (`best(i - 2) + nums[i - 1]`).

</details>

<details><summary>Hint 3</summary>

Like Climbing Stairs, each state only needs the previous two. Two variables are enough.

</details>
