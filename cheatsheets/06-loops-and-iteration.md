# Loops & Iteration

## Which loop?
```js
for (let i = 0; i < a.length; i++) {}      // need the index
for (const x of a) {}                      // values: arrays, strings, Set, Map
for (const [i, x] of a.entries()) {}       // index + value
for (const key in obj) {}                  // object KEYS (avoid on arrays)
a.forEach((x, i) => {});                   // ⚠️ can't break or return early
```

## Backwards / step
```js
for (let i = a.length - 1; i >= 0; i--) {}
for (let i = 0; i < n; i += 2) {}
```

## while
```js
while (lo <= hi) {}
while (queue.length) {}
do { } while (cond);        // runs at least once
```

## break / continue
```js
for (const x of a) {
  if (x < 0) continue;      // skip this one
  if (x === 0) break;       // stop the loop
}
```

## Break out of nested loops
```js
outer: for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (grid[r][c] === target) break outer;
  }
}
```

## Pairs of elements
```js
for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {}   // each pair once, O(n²)
}
```

## Adjacent elements
```js
for (let i = 1; i < a.length; i++) {
  const prev = a[i - 1], cur = a[i];
}
```

## Repeat n times
```js
for (let k = 0; k < n; k++) {}
Array.from({ length: n }, (_, i) => i * i);   // build while looping
```
