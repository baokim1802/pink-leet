# Container With Most Water

You're given an array `height` of `n` non-negative integers. Picture `n` vertical lines: line `i` stands at x-position `i` and is `height[i]` tall.

Pick **two** lines. Together with the x-axis they form a container; the water it holds is `(distance between the lines) × (height of the shorter line)`. Return the **maximum** amount of water any pair of lines can hold.

(The container can't be tilted, and the lines in between don't get in the way.)

## Examples

```
Input:  height = [1,8,6,2,5,4,8,3,7]
Output: 49         // lines at index 1 (8) and index 8 (7): width 7 × height 7
```

```
Input:  height = [1,1]
Output: 1
```

## Constraints

- `2 <= height.length <= 10^5`
- `0 <= height[i] <= 10^4`

## Hints

<details><summary>Hint 1</summary>

Checking every pair is `O(n²)`. Start with the **widest** container: one pointer at each end.

</details>

<details><summary>Hint 2</summary>

To find something bigger you have to give up width, so you need a taller *shorter* side. Which pointer is holding you back?

</details>

<details><summary>Hint 3</summary>

Always move the pointer at the **shorter** line inward. Moving the taller one can never help: the width shrinks and the height is still capped by the same short line.

</details>
