# Largest Rectangle in Histogram

`heights` describes a histogram: bar `i` has width `1` and height `heights[i]`, and the bars stand side by side. Return the area of the **largest rectangle** that fits entirely inside the histogram.

A rectangle can span several neighbouring bars; its height is limited by the shortest bar it covers.

## Examples

```
Input:  heights = [2,1,5,6,2,3]
Output: 10         // bars 5 and 6: width 2 × height 5
```

```
Input:  heights = [2,4]
Output: 4
```

## Constraints

- `1 <= heights.length <= 10^5`
- `0 <= heights[i] <= 10^4`

## Hints

<details><summary>Hint 1</summary>

Flip the question: for each bar, what's the widest rectangle that uses **that bar's height** exactly? It stretches left and right until it hits a shorter bar.

</details>

<details><summary>Hint 2</summary>

So you need, for every bar, the nearest shorter bar on each side. "Nearest smaller element" is a classic monotonic stack job.

</details>

<details><summary>Hint 3</summary>

Keep a stack of indices with increasing heights. When bar `i` is shorter than the top, pop the top: `i` is its right boundary and the new top is its left boundary, so its width is `i - newTop - 1`. A sentinel bar of height `0` at the end flushes the stack.

</details>
