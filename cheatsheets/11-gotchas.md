# JS Gotchas

## Equality
```js
1 == '1';              // true  (type coercion) 😬
1 === '1';             // false ✅ always use ===
NaN === NaN;           // false → use Number.isNaN(x)
[] === [];             // false (different references; same for objects)
null == undefined;     // true, but null === undefined is false
```

## typeof
```js
typeof null;           // 'object' (famous bug)
typeof [];             // 'object' → use Array.isArray(x)
typeof NaN;            // 'number'
typeof function() {};  // 'function'
```

## Falsy values
```js
false, 0, -0, 0n, '', null, undefined, NaN
if (count) {}          // ⚠️ skips count === 0
if (count !== undefined) {}
map.get(k) ?? 0;       // ?? only replaces null/undefined
```

## let / const / var
```js
const a = [1];  a.push(2);   // ✅ contents can change
a = [];                      // ❌ can't reassign a const
for (var i = 0; i < 3; i++) setTimeout(() => console.log(i));   // 3 3 3
for (let i = 0; i < 3; i++) setTimeout(() => console.log(i));   // 0 1 2
```

## Arrays
```js
new Array(3).fill([]);          // ❌ 3 refs to ONE array
Array.from({ length: 3 }, () => []);   // ✅
arr.sort();                     // ❌ sorts as strings
delete arr[1];                  // ❌ leaves a hole; use splice
arr.forEach((x) => {});         // can't break; use for...of
```

## Numbers
```js
0.1 + 0.2;             // 0.30000000000000004
-7 % 3;                // -1
parseInt('08');        // 8, but always pass the radix: parseInt(s, 10)
1 << 31;               // -2147483648 (32-bit overflow)
```

## Recursion depth
Very deep recursion (~10k frames) can throw `RangeError: Maximum call stack size exceeded`. Switch to an explicit stack for huge inputs.
