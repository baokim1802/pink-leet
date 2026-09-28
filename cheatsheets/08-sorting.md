# Sorting & Comparators

## ⚠️ The default sort is by string
```js
[10, 9, 1].sort();                  // [1, 10, 9] ❌
[10, 9, 1].sort((a, b) => a - b);   // [1, 9, 10] ✅
```

## Comparator rule
Return **negative** → a first, **positive** → b first, **0** → keep order.
```js
a.sort((x, y) => x - y);           // ascending
a.sort((x, y) => y - x);           // descending
```

## Sort objects / arrays by a field
```js
people.sort((a, b) => a.age - b.age);
intervals.sort((a, b) => a[0] - b[0]);            // by start
words.sort((a, b) => a.length - b.length);        // by length
names.sort((a, b) => a.localeCompare(b));         // strings A→Z
```

## Multi-key sort
```js
// by count desc, then word A→Z
items.sort((a, b) => b.count - a.count || a.word.localeCompare(b.word));
```

## Don't mutate the original
```js
const sorted = [...a].sort((x, y) => x - y);
const sorted2 = a.toSorted((x, y) => x - y);      // Node 20+
```

## Sort a string's letters
```js
[...s].sort().join('');            // "bca" → "abc"
```

## Sort Map entries
```js
[...map].sort((a, b) => b[1] - a[1]);     // by value, desc
[...map.keys()].sort((a, b) => a - b);    // numeric keys
```

## Facts to say in interviews
- `sort` is O(n log n) and **stable** (equal items keep their order).
- It sorts **in place** and also returns the same array.
