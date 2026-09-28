# Big-O & the JavaScript Toolkit

Welcome! Before we touch a single pattern, we need two things: a way to talk about **how fast** code is, and a solid grip on the **JavaScript tools** you'll reach for in every interview. Get these down and every later topic gets easier.

## The big idea

Big-O describes how the work your code does **grows** as the input grows. We don't count exact steps — we care about the *shape* of the growth when `n` gets large.

- Drop constants: `O(2n)` is just `O(n)`.
- Keep the dominant term: `O(n² + n)` is just `O(n²)`.
- Different inputs get different letters: looping over `a` then `b` is `O(a + b)`, nesting them is `O(a · b)`.

Here's the intuition for the classes you'll see most, with `n = 1,000,000`:

| Big-O | Name | Rough feel at n = 10⁶ | Typical example |
|---|---|---|---|
| `O(1)` | constant | instant | `map.get(key)`, `arr[i]` |
| `O(log n)` | logarithmic | ~20 steps | binary search |
| `O(n)` | linear | a million steps — fine | one loop over the array |
| `O(n log n)` | linearithmic | ~20 million — fine | `arr.sort(...)` |
| `O(n²)` | quadratic | a trillion — too slow | nested loops over the same array |
| `O(2ⁿ)` | exponential | heat death of the universe | all subsets |
| `O(n!)` | factorial | even worse | all permutations |

> Rule of thumb: a judge does roughly 10⁷–10⁸ simple operations per second. Use the constraints to guess the target complexity: `n ≤ 10⁵` usually means `O(n)` or `O(n log n)`; `n ≤ 20` hints that exponential (backtracking/bitmask) is OK.

## How to analyze code

### Loops

```js
for (let i = 0; i < n; i++) { /* O(1) */ }            // O(n)

for (let i = 0; i < n; i++)
  for (let j = 0; j < n; j++) { /* O(1) */ }          // O(n²)

for (let i = 0; i < n; i++)
  for (let j = i + 1; j < n; j++) { /* O(1) */ }      // still O(n²) — n(n-1)/2 pairs

for (let i = 1; i < n; i *= 2) { /* O(1) */ }         // O(log n) — i doubles each time
```

Watch for **hidden loops**: `arr.includes(x)`, `arr.indexOf(x)`, `arr.slice()`, `str + str`, `[...arr]` and `arr.shift()` are all `O(n)`. A `for` loop that calls `includes` inside is `O(n²)`!

### Recursion

Think: **(number of calls) × (work per call)**. Draw the call tree.

```js
function fact(n) { return n <= 1 ? 1 : n * fact(n - 1); }  // n calls × O(1) = O(n)

function fib(n) { return n < 2 ? n : fib(n - 1) + fib(n - 2); } // branches twice per level → O(2ⁿ)
```

Space for recursion includes the **call stack**: `fact(n)` uses `O(n)` space even though it allocates nothing. Also, JS engines don't do tail-call optimization in practice, so very deep recursion (~10⁴+ frames) can throw `RangeError: Maximum call stack size exceeded`.

### Space

Count the extra memory you allocate that grows with input: new arrays, maps, sets, strings, and the recursion depth. The output itself is usually not counted (but say so out loud in an interview).

## JavaScript toolkit

### Arrays and their costs

| Operation | Cost | Notes |
|---|---|---|
| `arr[i]`, `arr[i] = x`, `arr.length` | `O(1)` | |
| `push(x)`, `pop()` | `O(1)` amortized | use as a stack |
| `shift()`, `unshift(x)` | `O(n)` | re-indexes everything! |
| `includes`, `indexOf`, `find`, `some`, `every` | `O(n)` | linear scan |
| `slice`, `concat`, `[...arr]` | `O(n)` | copies |
| `splice(i, k)` | `O(n)` | shifts the tail |
| `map`, `filter`, `reduce`, `forEach` | `O(n)` | allocate new arrays (except `forEach`/`reduce`) |
| `sort(cmp)` | `O(n log n)` | in place, mutates! |
| `reverse()` | `O(n)` | in place, mutates! |

### The `sort()` gotcha

The default `sort()` converts elements to **strings** and sorts lexicographically:

```js
[10, 9, 1, 100].sort();               // [1, 10, 100, 9]  😱
[10, 9, 1, 100].sort((a, b) => a - b); // [1, 9, 10, 100] ✔ ascending
[10, 9, 1, 100].sort((a, b) => b - a); // [100, 10, 9, 1] ✔ descending
words.sort((a, b) => a.localeCompare(b)); // strings
pairs.sort((a, b) => a[0] - b[0] || a[1] - b[1]); // by first, then second
```

### Building 2D arrays: the shared-reference trap

```js
const bad = new Array(3).fill([]);  // ONE array, referenced 3 times
bad[0].push(1);                      // bad → [[1], [1], [1]]  😱

const grid = Array.from({ length: rows }, () => new Array(cols).fill(0)); // ✔ fresh row each time
```

`fill` with a primitive (`0`, `false`, `Infinity`) is fine. `fill` with an object/array shares it.

### Map / Set vs plain objects

```js
const count = new Map();
count.set(x, (count.get(x) || 0) + 1);  // O(1) average
count.has(x); count.delete(x); count.size;
for (const [key, val] of count) { ... }  // insertion order

const seen = new Set(nums);              // O(n) to build
seen.has(5);                             // O(1)
```

Prefer `Map`/`Set` in interviews: keys can be any type (numbers stay numbers, objects work by reference), `.size` is `O(1)`, and there are no prototype surprises (`obj['constructor']` exists on a plain `{}`!). Plain objects are fine for fixed small alphabets, but remember their keys are always strings.

Arrays or objects as `Map` keys compare by **reference**, not by value — `map.get([1, 2])` never finds a key you set with a different `[1, 2]`. Serialize to a string instead: `` `${r},${c}` `` or `arr.join('#')`.

### Strings are immutable

```js
let s = 'cat';
s[0] = 'b';          // silently does nothing
s = 'b' + s.slice(1); // creates a new string: O(n)
```

Building a string with `+=` in a loop can be `O(n²)` in the worst case. Push pieces into an array and `join('')` at the end. To "edit" a string, `split('')` it into an array, change it, then `join('')`.

### Character codes

```js
'a'.charCodeAt(0);              // 97
String.fromCharCode(98);        // 'b'
const idx = ch.charCodeAt(0) - 97; // 'a'→0 ... 'z'→25, handy for a 26-slot count array
```

### Numbers

```js
Math.floor(7 / 2);          // 3 — `/` is float division in JS!
Math.trunc(-7 / 2);         // -3 — rounds toward zero (what C/Java do)
(lo + hi) >> 1;             // fast floor-halving for small non-negative ints
Number.MAX_SAFE_INTEGER;    // 2^53 - 1 ≈ 9.007e15 — beyond this, integers lose precision
Infinity, -Infinity;        // great initial values for min/max
12345678901234567890n * 2n; // BigInt: exact huge integers (can't mix with normal numbers)
```

Bitwise operators (`|`, `>>`, `&`) work on **32-bit** signed ints, so `x | 0` breaks for values above ~2.1 billion.

### Handy idioms

```js
[a, b] = [b, a];                       // destructuring swap
[arr[i], arr[j]] = [arr[j], arr[i]];   // swap in an array
const [first, ...rest] = arr;          // rest is a copy: O(n)
Math.max(...arr);                      // O(n); can overflow the stack for ~10⁵+ items — use a loop or reduce
for (const x of arr) { ... }           // values
for (const [i, x] of arr.entries()) { ... } // index + value
```

### Queue without `shift()`

JS has no built-in queue, and `shift()` is `O(n)`. Use a read pointer instead:

```js
const queue = [start];
let head = 0;
while (head < queue.length) {
  const node = queue[head++];   // O(1) "dequeue"
  // ... queue.push(next);
}
```

JS also has **no built-in heap / priority queue** — you'll write one in the heaps topic.

## Worked example

**Problem:** return `true` if some pair in `nums` sums to `target`.

**Attempt 1 — nested loops:**

```js
for (let i = 0; i < n; i++)
  for (let j = i + 1; j < n; j++)
    if (nums[i] + nums[j] === target) return true;
```

`n(n-1)/2` pairs → `O(n²)` time, `O(1)` space. With `n = 10⁵` that's ~5 billion checks. Too slow.

**Attempt 2 — sort + scan:** sorting costs `O(n log n)`; then two pointers from both ends walk inward in `O(n)`. Total `O(n log n)`, `O(1)` extra (ignoring sort internals).

**Attempt 3 — a Set:**

```js
const seen = new Set();
for (const x of nums) {
  if (seen.has(target - x)) return true;
  seen.add(x);
}
return false;
```

One pass, `O(1)` lookups → `O(n)` time, `O(n)` space. We traded memory for speed — the most common trade in interviews.

## Complexity cheat sheet

| Structure / op | Access | Search | Insert | Delete |
|---|---|---|---|---|
| Array (end) | `O(1)` | `O(n)` | `O(1)` push | `O(1)` pop |
| Array (front/middle) | `O(1)` | `O(n)` | `O(n)` | `O(n)` |
| `Map` / `Set` | — | `O(1)` avg | `O(1)` avg | `O(1)` avg |
| String | `O(1)` char | `O(n)` | `O(n)` (new string) | `O(n)` |
| Sorted array + binary search | `O(1)` | `O(log n)` | `O(n)` | `O(n)` |

## Common mistakes

- Calling `includes`/`indexOf` inside a loop and calling it `O(n)`.
- `nums.sort()` without a comparator on numbers.
- `new Array(n).fill([])` for a grid.
- `queue.shift()` in a BFS over a big graph.
- Forgetting `Math.floor` when computing a middle index: `(lo + hi) / 2` can be `2.5`.
- Using an array as a `Map` key and wondering why lookups fail.
- Forgetting that `sort` and `reverse` **mutate** the original array.

## Practice

- [Fizz Buzz](#/practice/01-big-o-and-js-toolkit/fizz-buzz) — Easy
- [Running Sum of 1d Array](#/practice/01-big-o-and-js-toolkit/running-sum-of-1d-array) — Easy

## Before moving on

- [ ] I can state the Big-O of a nested loop, a halving loop, and a simple recursion.
- [ ] I can guess the target complexity from the constraints.
- [ ] I know which array methods are secretly `O(n)`.
- [ ] I always pass `(a, b) => a - b` when sorting numbers.
- [ ] I can build a 2D grid with `Array.from` without shared rows.
- [ ] I reach for `Map`/`Set` for fast lookups and know why keys like `[1, 2]` don't work.
- [ ] I can run a BFS queue with a head pointer instead of `shift()`.
