# Daily Temperatures

You get an array `temperatures` of daily temperatures. For each day, figure out **how many days you'd have to wait** until a strictly warmer day. If no warmer day ever comes, the answer for that day is `0`.

Return an array `answer` of the same length.

## Examples

```
Input:  temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]
```

```
Input:  temperatures = [30,40,50,60]
Output: [1,1,1,0]
```

```
Input:  temperatures = [30,60,90]
Output: [1,1,0]
```

## Constraints

- `1 <= temperatures.length <= 10^5`
- `30 <= temperatures[i] <= 100`

## Hints

<details><summary>Hint 1</summary>

The brute force scans forward from every day: `O(n²)`. Flip it around — when you're on day `i`, which *earlier* days just found their answer?

</details>

<details><summary>Hint 2</summary>

Keep a stack of indices of days that are still "waiting" for a warmer day. Their temperatures are in decreasing order from bottom to top (a *monotonic stack*).

</details>

<details><summary>Hint 3</summary>

On day `i`, while the day on top of the stack is colder than today, pop it — its answer is `i - poppedIndex`. Then push `i`.

</details>
