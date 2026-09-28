# Two Pointers

Two pointers is the art of walking through a sequence with **two indices at once** so that every step rules out a whole bunch of possibilities. It often turns an `O(n²)` "check every pair" into a single `O(n)` sweep — with `O(1)` extra space, which even hashing can't give you.

## The big idea

There are two main flavors:

1. **Opposite ends (converging).** Start `left = 0`, `right = n - 1` and move them toward each other. Works when the data has some **order** (sorted array, or a string you're comparing with its mirror). At every step you can decide *which* pointer to move because moving the other one could only make things worse.
2. **Same direction (fast/slow, read/write).** Both pointers start at the left. One *reads* every element, the other marks where to *write* or where a window starts. Great for in-place filtering, removing duplicates, and partitioning.

Why does the converging version work on a sorted array? Say you want a pair summing to `target`, and `nums[left] + nums[right]` is **too small**. Pairing `nums[left]` with anything left of `right` would be even smaller — so `nums[left]` is useless, and `left++` is safe. Too big? By the same logic, `right--`. Each step throws away one element for good, so there are at most `n` steps.

## How to recognize it

- The input is **sorted** (or sorting it doesn't hurt the answer) and you're looking for pairs/triplets with some sum.
- "Palindrome", "reverse", "compare from both ends".
- "In place", "`O(1)` extra space", "remove duplicates / move zeros / partition".
- "Merge two sorted arrays/lists".
- Brute force is "for each `i`, for each `j > i`" and there's monotonic structure to exploit.

## JavaScript toolkit

```js
// Swap in place
[arr[l], arr[r]] = [arr[r], arr[l]];

// Sort numbers (never forget the comparator!)
nums.sort((a, b) => a - b);          // O(n log n), mutates

// Characters
s[i]                                  // character at i (strings are read-only)
s.charCodeAt(i)                       // numeric code
ch.toLowerCase()
/[a-z0-9]/i.test(ch)                  // alphanumeric check (regex)
```

A regex-free alphanumeric check that's handy in tight loops:

```js
function isAlnum(ch) {
  const c = ch.charCodeAt(0);
  return (c >= 48 && c <= 57) ||  // 0-9
         (c >= 65 && c <= 90) ||  // A-Z
         (c >= 97 && c <= 122);   // a-z
}
```

**Gotchas**

- Strings are immutable: to reverse or modify in place, `split('')` into an array first. Or better — don't build a new string at all, just compare `s[l]` and `s[r]`.
- `s.split('').reverse().join('')` is easy but costs `O(n)` extra space; two pointers do the same comparison in `O(1)`.
- LeetCode sometimes uses **1-indexed** answers (e.g. "return `[index1, index2]` where `1 <= index1 < index2`"). Read carefully.
- Skipping duplicates: use `while (l < r && nums[l] === nums[l - 1]) l++;` — always keep the `l < r` guard.

## Template

**Converging pointers**

```js
function converge(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l < r) {
    const sum = nums[l] + nums[r];
    if (sum === target) return [l, r];
    if (sum < target) l++;   // need bigger → move the small side up
    else r--;                // need smaller → move the big side down
  }
  return [-1, -1];
}
```

**Read / write pointers (in-place filter)**

```js
function keepIf(nums, keep) {
  let write = 0;
  for (let read = 0; read < nums.length; read++) {
    if (keep(nums[read])) nums[write++] = nums[read];
  }
  return write; // new logical length
}
```

**Fix one, two-pointer the rest** (for k-sum)

```js
nums.sort((a, b) => a - b);
for (let i = 0; i < nums.length; i++) {
  if (i > 0 && nums[i] === nums[i - 1]) continue; // skip duplicate anchors
  // converge l = i + 1, r = n - 1 looking for -nums[i] ...
}
```

## Worked example

**Squares of a Sorted Array:** given a sorted array (may contain negatives), return the squares in sorted order.

`nums = [-4, -1, 0, 3, 10]`

The obvious answer — square everything and sort — is `O(n log n)`. But notice: the **largest square** is always at one of the two ends (big negative or big positive). So compare the ends and fill the result **from the back**.

| step | l | r | nums[l]² | nums[r]² | bigger goes to | result |
|---|---|---|---|---|---|---|
| 1 | 0 | 4 | 16 | 100 | pos 4 (`r--`) | `[_, _, _, _, 100]` |
| 2 | 0 | 3 | 16 | 9 | pos 3 (`l++`) | `[_, _, _, 16, 100]` |
| 3 | 1 | 3 | 1 | 9 | pos 2 (`r--`) | `[_, _, 9, 16, 100]` |
| 4 | 1 | 2 | 1 | 0 | pos 1 (`l++`) | `[_, 1, 9, 16, 100]` |
| 5 | 2 | 2 | 0 | 0 | pos 0 | `[0, 1, 9, 16, 100]` |

```js
function sortedSquares(nums) {
  const n = nums.length;
  const result = new Array(n);
  let l = 0, r = n - 1;
  for (let pos = n - 1; pos >= 0; pos--) {
    const a = nums[l] * nums[l], b = nums[r] * nums[r];
    if (a > b) { result[pos] = a; l++; }
    else       { result[pos] = b; r--; }
  }
  return result;
}
```

One pass → `O(n)` time. Every step places one number and discards one end — that "discard one candidate per step" feeling is the heart of two pointers.

## Complexity cheat sheet

| Problem shape | Brute force | Two pointers |
|---|---|---|
| Pair with sum in sorted array | `O(n²)` | `O(n)` time, `O(1)` space |
| Palindrome check | `O(n)` with reversed copy (`O(n)` space) | `O(n)` time, `O(1)` space |
| Triplets summing to 0 | `O(n³)` | `O(n²)` (sort `O(n log n)` + n sweeps) |
| Remove duplicates in place | `O(n²)` with `splice` | `O(n)` time, `O(1)` space |
| Merge two sorted arrays | `O((m+n) log(m+n))` concat + sort | `O(m + n)` |

## Common mistakes

- Using two pointers on **unsorted** data where moving a pointer isn't justified. Sort first (if allowed) or use a hash map.
- `while (l <= r)` when you need two **distinct** elements — use `l < r`.
- Forgetting to move a pointer in some branch → infinite loop.
- Skipping duplicates with an unguarded `while`, running `l` past `r` or off the array.
- In 3Sum-style problems, skipping duplicate **anchors** but not duplicate **inner** values (or vice versa), producing repeated triplets.
- Sorting with default `sort()` — negatives and multi-digit numbers end up in the wrong order.

## Practice

- [Valid Palindrome](#/practice/03-two-pointers/valid-palindrome) — Easy
- [Two Sum II - Input Array Is Sorted](#/practice/03-two-pointers/two-sum-ii-input-array-is-sorted) — Medium
- [3Sum](#/practice/03-two-pointers/3sum) — Medium

## Before moving on

- [ ] I can explain *why* moving the smaller pointer is safe in a sorted pair-sum.
- [ ] I know the difference between converging and read/write pointers and when to use each.
- [ ] I can check a palindrome in `O(1)` extra space while skipping unwanted characters.
- [ ] I can extend pair-sum to 3Sum by fixing one element, and I can skip duplicates correctly.
- [ ] I always write `l < r` guards inside inner `while` loops.
