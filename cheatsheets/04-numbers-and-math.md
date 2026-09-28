# Numbers & Math

## Rounding & integer division
```js
Math.floor(7 / 2);     // 3
Math.ceil(7 / 2);      // 4
Math.round(2.5);       // 3
Math.trunc(-7 / 2);    // -3   (toward zero)
Math.floor(-7 / 2);    // -4   (toward -∞)
(lo + hi) >> 1;        // floor average, only for values < 2^31
```

## Modulo
```js
7 % 3;                   // 1
-7 % 3;                  // -1  ⚠️ keeps the sign
((x % n) + n) % n;       // always 0..n-1 (e.g. wrap-around index)
n % 2 === 0;             // even?
```

## Common Math
```js
Math.max(a, b);  Math.min(a, b);
Math.abs(-5);            // 5
Math.pow(2, 10);  2 ** 10;   // 1024
Math.sqrt(16);           // 4
Math.hypot(3, 4);        // 5   (distance)
Math.log2(8);            // 3
Math.sign(-3);           // -1
```

## Limits
```js
Infinity;  -Infinity;             // start values for min/max tracking
let best = Infinity;  best = Math.min(best, x);
Number.MAX_SAFE_INTEGER;          // 2^53 - 1 ≈ 9e15
Number.MIN_SAFE_INTEGER;
2 ** 31 - 1;                      // INT_MAX in LeetCode problems
```

## Checks
```js
Number.isInteger(5.0);    // true
Number.isNaN(x);          // use this, not x === NaN (always false!)
Number.isFinite(x);
```

## Floats
```js
0.1 + 0.2 === 0.3;                     // false 😱
Math.abs(a - b) < 1e-9;                // compare floats like this
(3.14159).toFixed(2);                  // '3.14' (a string!)
```

## BigInt (huge integers)
```js
const big = 12345678901234567890n;     // n suffix
BigInt(10) * 3n;                       // 30n (can't mix with normal numbers)
Number(30n);                           // back to a number
```

## Random
```js
Math.random();                                   // 0 ≤ x < 1
Math.floor(Math.random() * n);                   // 0..n-1
Math.floor(Math.random() * (hi - lo + 1)) + lo;  // lo..hi inclusive
```
