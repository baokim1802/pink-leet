# Set & Map

## Set
Unique values of any type. `add` / `has` / `delete` are O(1).
```js
const mySet = new Set();          // or new Set([1, 2, 2]) → {1, 2}
mySet.add(1);                     // returns the set, so you can chain
mySet.has(1);                     // true
mySet.delete(1);                  // true if it was there
mySet.size;                       // property, not size()
mySet.clear();                    // → mySet.size === 0
for (const val of mySet) {}
```

## Set ↔ Array
```js
const unique = [...new Set(arr)];     // dedupe an array
const arr2 = Array.from(mySet);
new Set('hello').size;                // 4 (strings are iterable)
```

## Set math
```js
const union = new Set([...a, ...b]);
const inter = [...a].filter((x) => b.has(x));
const diff  = [...a].filter((x) => !b.has(x));
```

## Map
Key → value, keys of any type. Remembers insertion order.
```js
const map = new Map();            // or new Map([['a', 1], ['b', 2]])
map.set('a', 1);                  // chainable: map.set(k, v).set(k2, v2)
map.get('a');                     // 1   (undefined if missing)
map.has('a');                     // true
map.delete('a');
map.size;
map.clear();
```

## Map: iterate
```js
for (const [key, val] of map) {}
for (const key of map.keys()) {}
for (const val of map.values()) {}
map.forEach((val, key) => {});    // note: value first!
[...map];                         // [[k, v], [k, v]]
```

## Map: counting
```js
const count = new Map();
for (const x of arr) count.set(x, (count.get(x) ?? 0) + 1);

// sort entries by count, highest first
const sorted = [...count].sort((a, b) => b[1] - a[1]);
```

## Map: grouping
```js
const groups = new Map();
for (const w of words) {
  const key = [...w].sort().join('');
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(w);
}
[...groups.values()];             // array of groups
```

## Map with array/pair keys
Keys are compared **by reference**, so `[1, 2]` ≠ `[1, 2]`. Use a string key.
```js
map.set([1, 2], 'x'); map.get([1, 2]);   // undefined ❌
const key = `${r},${c}`;                 // ✅
seen.add(key);
const [r2, c2] = key.split(',').map(Number);
```

## Plain object as a map
Keys become **strings**. Fine for simple string counts.
```js
const obj = {};
obj[k] = (obj[k] || 0) + 1;
k in obj;                         // has
delete obj[k];
Object.keys(obj).length;          // size
for (const [k, v] of Object.entries(obj)) {}
const m = new Map(Object.entries(obj));   // object → Map
const o = Object.fromEntries(m);          // Map → object
```
