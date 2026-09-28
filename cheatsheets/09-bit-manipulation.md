# Bit Manipulation

## Operators
```js
a & b;    // AND
a | b;    // OR
a ^ b;    // XOR (1 when bits differ)
~a;       // NOT (~a === -a - 1)
a << 1;   // × 2
a >> 1;   // ÷ 2, floor (keeps sign)
a >>> 0;  // treat as unsigned 32-bit
```
JS bitwise ops work on **32-bit signed ints**. `1 << 31` is negative.

## Single bits
```js
(n >> i) & 1;        // is bit i set?
n | (1 << i);        // set bit i
n & ~(1 << i);       // clear bit i
n ^ (1 << i);        // toggle bit i
```

## Classic tricks
```js
n & (n - 1);                  // drop the lowest set bit
n > 0 && (n & (n - 1)) === 0; // power of two?
n & -n;                       // lowest set bit alone
(x ^ x) === 0; (x ^ 0) === x; // XOR everything → the unpaired number
```

## Count set bits
```js
let count = 0;
while (n) { n &= n - 1; count++; }
n.toString(2).split('1').length - 1;   // quick version (n ≥ 0)
```

## Binary strings
```js
(5).toString(2);                 // '101'
parseInt('101', 2);              // 5
(5).toString(2).padStart(8, '0');   // '00000101'
```

## Subsets with a bitmask
```js
for (let mask = 0; mask < 1 << n; mask++) {
  const subset = [];
  for (let i = 0; i < n; i++) if (mask & (1 << i)) subset.push(nums[i]);
}
```
