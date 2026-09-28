# Arrays

## Create
```js
const a = [1, 2, 3];
const zeros = new Array(5).fill(0);            // [0,0,0,0,0]
const nums = Array.from({ length: 5 }, (_, i) => i);   // [0,1,2,3,4]
const copy = [...a];                           // shallow copy
```

## 2D array (grid)
```js
const grid = Array.from({ length: rows }, () => new Array(cols).fill(0));   // ✅
const bad = new Array(rows).fill(new Array(cols).fill(0));   // ❌ every row is the SAME array
grid.length;  grid[0].length;                 // rows, cols of an existing grid
const clone = grid.map((row) => [...row]);    // copy a grid
```

## Add / remove
```js
a.push(4);         // end, O(1) → returns new length
a.pop();           // end, O(1) → returns removed item
a.unshift(0);      // front, O(n)
a.shift();         // front, O(n) ⚠️ slow in loops (use an index pointer)
a.length = 0;      // clear
```

## splice (mutates) vs slice (copies)
```js
a.slice(1, 3);        // items at index 1..2 (end is exclusive), a unchanged
a.slice(-2);          // last two
a.splice(i, 1);       // remove 1 item at i
a.splice(i, 0, x);    // insert x at i
a.splice(i, 2, x, y); // replace 2 items at i with x, y
```

## Access
```js
a[0];            // first
a.at(-1);        // last (same as a[a.length - 1])
a.at(-2);        // second to last
const [first, second, ...rest] = a;
```

## Search
```js
a.includes(3);                   // true/false
a.indexOf(3);                    // index or -1
a.lastIndexOf(3);
a.find((x) => x > 1);            // first match or undefined
a.findIndex((x) => x > 1);       // index or -1
a.findLast((x) => x > 1);
a.some((x) => x > 2);            // any?  stops early
a.every((x) => x > 0);           // all?  stops early
```

## Transform (return new arrays)
```js
a.map((x, i) => x * 2);
a.filter((x) => x % 2 === 0);
a.reduce((sum, x) => sum + x, 0);    // always pass the initial value
a.flat();                            // [[1], [2, 3]] → [1, 2, 3]
a.flatMap((x) => [x, x]);
a.join(',');                         // → "1,2,3"
```

## Reverse / sort
```js
a.reverse();                      // mutates
a.toReversed();                   // new array (Node 20+)
a.sort((x, y) => x - y);          // ⚠️ mutates; see Sorting sheet
a.toSorted((x, y) => x - y);      // new array (Node 20+)
```

## Min / max / sum
```js
Math.max(...a);                   // ⚠️ can throw on huge arrays (~100k+)
a.reduce((m, x) => Math.max(m, x), -Infinity);   // safe version
a.reduce((s, x) => s + x, 0);     // sum
```

## Compare / check
```js
[1, 2] === [1, 2];                // false (compares references)
JSON.stringify(a) === JSON.stringify(b);   // quick value compare
Array.isArray(a);
a.length === 0;                   // empty?
```
