# Move Zeroes

Given an integer array `nums`, move every `0` to the **end** while keeping the non-zero elements in their original relative order.

Do it **in place** — modify `nums` directly without making a copy. The function doesn't need to return anything.

## Examples

```
Input:  nums = [0,1,0,3,12]
After:  nums = [1,3,12,0,0]
```

```
Input:  nums = [0]
After:  nums = [0]
```

## Constraints

- `1 <= nums.length <= 10^4`
- `-2^31 <= nums[i] <= 2^31 - 1`

**Follow-up:** can you keep the number of writes to a minimum?

## Hints

<details><summary>Hint 1</summary>

Use two pointers moving in the **same** direction: a *read* pointer that visits every element, and a *write* pointer marking where the next non-zero should go.

</details>

<details><summary>Hint 2</summary>

Every time the read pointer finds a non-zero, put it at the write position and advance the write pointer. Everything from the write pointer onward should end up as zeros.

</details>

<details><summary>Hint 3</summary>

Swapping `nums[read]` and `nums[write]` (instead of copying then zero-filling) does it in a single pass.

</details>
