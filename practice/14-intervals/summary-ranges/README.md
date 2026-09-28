# Summary Ranges

You're given a **sorted** array of **unique** integers `nums`. Describe it as the smallest list of ranges of consecutive integers that covers every number exactly — no range may include a number that isn't in `nums`.

Write each range `[a, b]` as:

- `"a->b"` when `a !== b`
- `"a"` when `a === b`

Return the ranges in increasing order.

## Examples

```
Input:  nums = [0,1,2,4,5,7]
Output: ["0->2","4->5","7"]
```

```
Input:  nums = [0,2,3,4,6,8,9]
Output: ["0","2->4","6","8->9"]
```

```
Input:  nums = []
Output: []
```

## Constraints

- `0 <= nums.length <= 20`
- `-2^31 <= nums[i] <= 2^31 - 1`
- All values are unique, and `nums` is sorted in ascending order.

## Hints

<details><summary>Hint 1</summary>

Walk through the array once. A range keeps growing while the next number is exactly one more than the current one.

</details>

<details><summary>Hint 2</summary>

Remember where the current range **started**. When the chain breaks (or the array ends), emit the range from that start to the current number, then start a new range at the next number.

</details>

<details><summary>Hint 3</summary>

Template literals keep the formatting simple: `` start === end ? `${start}` : `${start}->${end}` ``. Don't forget the empty array.

</details>
