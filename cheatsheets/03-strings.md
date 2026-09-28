# Strings

## Basics
Strings are **immutable**. `s[0] = 'x'` silently does nothing.
```js
s.length;
s[0];  s.at(-1);                 // first, last char
s + t;  `${a}-${b}`;             // concat, template literal
s === t;                         // compare by value ✅
```

## Slice & split
```js
s.slice(1, 4);           // index 1..3 (end exclusive)
s.slice(-3);             // last 3 chars
s.split('');             // "abc" → ['a','b','c']
[...s];                  // same, and emoji-safe
s.split(' ');            // words
s.split(/\s+/);          // words, any whitespace
arr.join('');            // back to a string
```

## Search
```js
s.includes('ab');
s.indexOf('b');          // -1 if missing
s.lastIndexOf('b');
s.startsWith('ab');
s.endsWith('yz');
```

## Change (returns new string)
```js
s.toLowerCase();  s.toUpperCase();
s.trim();                     // also trimStart / trimEnd
s.replace('a', 'b');          // first match only
s.replaceAll('a', 'b');
s.replace(/[^a-z0-9]/gi, ''); // keep only letters & digits
s.repeat(3);                  // "ab" → "ababab"
'5'.padStart(3, '0');         // "005"
[...s].reverse().join('');    // reverse a string
```

## Char codes
```js
'a'.charCodeAt(0);               // 97
String.fromCharCode(97);         // 'a'
c.charCodeAt(0) - 97;            // 'a'→0 … 'z'→25 (letter index)
const count = new Array(26).fill(0);
for (const c of s) count[c.charCodeAt(0) - 97]++;
```

## Character checks
```js
/[a-z]/i.test(c);                // letter?
/[0-9]/.test(c);                 // digit?  (or c >= '0' && c <= '9')
/[a-z0-9]/i.test(c);             // alphanumeric?
c === c.toUpperCase();           // uppercase? (true for digits too)
```

## String ↔ number
```js
Number('42');   +'42';           // 42
parseInt('42px', 10);            // 42 (stops at non-digit)
String(42);   42 + '';           // '42'
(5).toString(2);                 // '101'   (binary)
parseInt('101', 2);              // 5
'7' - '0';                       // 7 (digit char → number)
```

## Build strings fast
Adding to a string in a loop can be slow. Collect parts in an array.
```js
const parts = [];
for (const x of items) parts.push(x);
const result = parts.join('');
```

## Compare / sort strings
```js
'apple' < 'banana';              // true (by char code)
'B' < 'a';                       // true! uppercase codes come first
a.localeCompare(b);              // negative / 0 / positive
words.sort();                    // alphabetical is fine for strings
words.sort((a, b) => a.localeCompare(b));
```
