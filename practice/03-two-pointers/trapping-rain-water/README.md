# Trapping Rain Water

`height` describes an elevation map: bar `i` has width `1` and height `height[i]`. After it rains, water collects in the dips between taller bars. Return the total number of units of water that get **trapped**.

## Examples

```
Input:  height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
```

```
Input:  height = [4,2,0,3,2,5]
Output: 9
```

```
Input:  height = [3,2,1]
Output: 0          // water runs off the right side
```

## Constraints

- `1 <= height.length <= 2 * 10^4`
- `0 <= height[i] <= 10^5`

## Hints

<details><summary>Hint 1</summary>

Look at a single position `i`. The water level above it is `min(tallest bar to its left, tallest bar to its right)`. The water there is that level minus `height[i]` (or `0`).

</details>

<details><summary>Hint 2</summary>

Precomputing `leftMax[i]` and `rightMax[i]` arrays gives an `O(n)` time, `O(n)` space solution. Can you drop the arrays?

</details>

<details><summary>Hint 3</summary>

Use two pointers from both ends with running `leftMax` and `rightMax`. Whichever side has the smaller max is the limiting side — its water can be settled right now. Add it and move that pointer inward.

</details>
