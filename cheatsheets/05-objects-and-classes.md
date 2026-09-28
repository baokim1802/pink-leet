# Objects & Classes

## Object basics
```js
const p = { name: 'Kim', age: 25 };
p.name;  p['name'];              // dot or bracket
p.city = 'LA';                   // add
delete p.city;                   // remove
'name' in p;                     // has key?
Object.hasOwn(p, 'name');        // own key (not inherited)
```

## Keys, values, entries
```js
Object.keys(p);                  // ['name', 'age']
Object.values(p);                // ['Kim', 25]
Object.entries(p);               // [['name','Kim'], ['age',25]]
Object.fromEntries([['a', 1]]);  // { a: 1 }
for (const [k, v] of Object.entries(p)) {}
```

## Destructuring
```js
const { name, age = 0 } = p;           // with default
const { name: n } = p;                 // rename
const [a, b] = [1, 2];
[a, b] = [b, a];                       // swap
function f({ x, y }) {}                // in parameters
```

## Spread & copy
```js
const copy = { ...p };                 // shallow copy
const merged = { ...defaults, ...opts };   // later keys win
const deep = structuredClone(obj);     // deep copy (Node 17+)
```

## Optional chaining & defaults
```js
node?.left?.val;                 // undefined instead of crashing
fn?.();                          // call only if it exists
x ?? 0;                          // 0 only if x is null/undefined
x || 0;                          // 0 if x is ANY falsy (0, '', false…)
obj.list ??= [];                 // assign if missing
```

## Class
```js
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}
const node = new ListNode(1);
```

## Class: methods, getters, static
```js
class Stack {
  #items = [];                       // private field
  push(x) { this.#items.push(x); }
  pop() { return this.#items.pop(); }
  get size() { return this.#items.length; }  // s.size (no parens)
  static from(arr) {                          // Stack.from([1, 2])
    const s = new Stack();
    arr.forEach((x) => s.push(x));
    return s;
  }
}
```

## Class: inheritance
```js
class Animal {
  constructor(name) { this.name = name; }
  speak() { return `${this.name} makes a sound`; }
}
class Cat extends Animal {
  speak() { return `${super.speak()}: meow`; }
}
```
