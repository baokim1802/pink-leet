# Arrays & Hashing

Most interview problems start here. The trick is simple but powerful: **trade memory for speed** by remembering what you've already seen in a hash map or set, so that "have I seen X?" costs `O(1)` instead of another loop.

## The big idea

A brute-force solution often looks like "for each item, scan the rest of the array for something". That's `O(n²)`. Hashing replaces the inner scan with a lookup:

- **Set** — "have I seen this value?"
- **Map (value → index)** — "where did I see it?"
- **Map (value → count)** — "how many times?"
- **Map (key → list)** — "which items belong together?" (grouping)

Choosing the right **key** is the whole game. Two things that should be "the same" must produce the same key: e.g. anagrams share the same sorted letters, or the same letter counts.

## How to recognize it

- "Find a pair / complement that sums to…" → map of seen values.
- "Contains duplicate", "first unique", "is there any repeat…" → set or counts.
- "Group items that are equivalent under some rule" → map from a canonical key to a list.
- "Most frequent / top k / majority" → count map, then sort or bucket.
- Constraints like `n ≤ 10⁵` rule out `O(n²)` — you need a single pass or sorting.
- The input is **unsorted** and you're not allowed to (or don't want to) sort it.

## JavaScript toolkit

```js
// Counting
const count = new Map();
for (const x of nums) count.set(x, (count.get(x) || 0) + 1);

// Set of seen values
const seen = new Set();
if (seen.has(x)) { /* duplicate */ }
seen.add(x);
new Set(nums).size;            // number of distinct values, O(n)

// Grouping
const groups = new Map();
if (!groups.has(key)) groups.set(key, []);
groups.get(key).push(item);
[...groups.values()];          // array of the groups

// Iterate a map
for (const [key, value] of count) { ... }
[...count.entries()].sort((a, b) => b[1] - a[1]); // sort by value desc
```

**Gotchas**

- `Map` keys compare by **reference** for arrays/objects: `map.set([1, 2], 'x'); map.get([1, 2])` is `undefined`. Build a string key instead: `arr.join(',')` or `` `${a}#${b}` ``.
- Plain object keys are always **strings**: `obj[1]` and `obj['1']` are the same key, and `Object.keys` gives you strings back. Prefer `Map` when keys are numbers you want to get back as numbers.
- `count.get(x) || 0` is fine because counts are never `0` while stored; for maps that store `0`/`''`/`false` use `?? 0` or `has()`.
- A 26-slot array is a fast, compact "map" for lowercase letters: `freq[ch.charCodeAt(0) - 97]++`. Join it into a string (`freq.join('#')`) to use as a key — the separator matters, otherwise counts like `1,11` and `11,1` could collide.
- Sorting a string: `s.split('').sort().join('')` — `O(k log k)` for length `k`.

## Template

**One pass with a "seen" map**

```js
function onePass(nums) {
  const seen = new Map(); // value -> whatever you need (index, count...)
  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    // 1. ask the map a question about x (e.g. has its complement / duplicate appeared?)
    // 2. record x for future elements
    seen.set(x, i);
  }
}
```

**Group by canonical key**

```js
function groupBy(items, keyOf) {
  const groups = new Map();
  for (const item of items) {
    const key = keyOf(item);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }
  return [...groups.values()];
}
```

**Bucket sort by frequency** (when counts are bounded by `n`)

```js
const buckets = Array.from({ length: n + 1 }, () => []); // buckets[c] = values seen c times
for (const [value, c] of count) buckets[c].push(value);
// walk buckets from high to low
```

## Worked example

**First Unique Character in a String:** return the index of the first character that appears exactly once in `s`, or `-1`.

`s = "loveleetcode"`

**Step 1 — count.** One pass building `char → count`:

| char | l | o | v | e | t | c | d |
|---|---|---|---|---|---|---|---|
| count | 2 | 2 | 1 | 4 | 1 | 1 | 1 |

**Step 2 — scan again in the original order**, returning the first index whose count is `1`:

- `i = 0` `'l'` → 2, skip
- `i = 1` `'o'` → 2, skip
- `i = 2` `'v'` → 1 ✔ return `2`

```js
function firstUniqChar(s) {
  const count = new Map();
  for (const ch of s) count.set(ch, (count.get(ch) || 0) + 1);
  for (let i = 0; i < s.length; i++) {
    if (count.get(s[i]) === 1) return i;
  }
  return -1;
}
```

Two passes of `O(n)` → `O(n)` time. The map holds at most 26 keys for lowercase letters → `O(1)` space. Notice the pattern: **count first, then query**.

## Complexity cheat sheet

| Technique | Time | Space |
|---|---|---|
| Brute force pair check | `O(n²)` | `O(1)` |
| Sort, then scan neighbors | `O(n log n)` | `O(1)`–`O(n)` |
| Set / Map one pass | `O(n)` | `O(n)` |
| Group by sorted-string key (n words, length k) | `O(n · k log k)` | `O(n · k)` |
| Group by 26-count key | `O(n · k)` | `O(n · k)` |
| Top k via sort by count | `O(n log n)` | `O(n)` |
| Top k via bucket sort | `O(n)` | `O(n)` |

## Common mistakes

- Using an array as a `Map` key and never getting a hit.
- Recording `x` in the map **before** checking it, so an element matches itself (e.g. `target = 2 * x`).
- Forgetting that `Object.keys(obj)` returns strings — `'3' !== 3`.
- `nums.sort()` without `(a, b) => a - b` when sorting numbers.
- Reaching for `indexOf` / `includes` inside a loop — that's the `O(n²)` you're trying to avoid.
- Building count keys like `freq.join('')` without a separator (ambiguous keys).

## Practice

- [Two Sum](#/practice/02-arrays-and-hashing/two-sum) — Easy
- [Contains Duplicate](#/practice/02-arrays-and-hashing/contains-duplicate) — Easy
- [Group Anagrams](#/practice/02-arrays-and-hashing/group-anagrams) — Medium
- [Top K Frequent Elements](#/practice/02-arrays-and-hashing/top-k-frequent-elements) — Medium

## Before moving on

- [ ] I can explain why a hash lookup turns an `O(n²)` scan into `O(n)`.
- [ ] I know when to use a `Set`, a count `Map`, and a value → index `Map`.
- [ ] I can design a canonical key so equivalent items collide (sorted string, count signature).
- [ ] I avoid using arrays/objects as `Map` keys directly.
- [ ] I can get the top k items from a count map, and I know the bucket-sort trick for `O(n)`.
