# Stack

## The big idea

A stack is a pile of plates: you can only add to the top and take from the top. **Last In, First Out** (LIFO).

That sounds limiting, but it matches a very common shape of problem: *"the thing I need to deal with next is the most recent thing I haven't finished yet."*

- A closing bracket must match the **most recently opened** bracket.
- An "undo" button reverses the **most recent** action.
- A function returns to the **most recent** caller (that's literally the call stack).
- In "next greater element" problems, a new value resolves the **most recent** unresolved values first.

Whenever you catch yourself saying "the latest one that's still open", reach for a stack.

## How to recognize it

- **Matching / nesting**: brackets, tags, nested expressions, "decode `3[a2[c]]`".
- **Evaluate something in order with pending work**: Reverse Polish Notation, simple calculators.
- **Undo / backtrack to the previous state**: simplifying a path like `/a/./b/../c`, removing adjacent duplicates.
- **"Next greater / next smaller / how many days until…"**: that's the **monotonic stack** pattern.
- **Design problems** that need `O(1)` extra info about the stack (like its minimum).

## JavaScript toolkit

JavaScript has no `Stack` class — a plain array is the stack.

| Operation | Code | Cost |
| --- | --- | --- |
| push | `stack.push(x)` | `O(1)` amortized |
| pop | `stack.pop()` | `O(1)` — returns `undefined` if empty |
| peek | `stack[stack.length - 1]` or `stack.at(-1)` | `O(1)` |
| is empty? | `stack.length === 0` | `O(1)` |
| size | `stack.length` | `O(1)` |

Gotchas:

- **Use the end of the array.** `push`/`pop` are `O(1)`, but `unshift`/`shift` (the front) are `O(n)` because every element gets re-indexed.
- `stack.pop()` on an empty array returns `undefined` rather than throwing. That can hide bugs — or be handy, since `undefined !== ')'`.
- `stack.at(-1)` is neat but needs Node 16.6+. `stack[stack.length - 1]` works everywhere.
- When you need positions (distances, widths), **push indices, not values**. You can always look up the value with `arr[i]`.
- A lookup table as an object or `Map` keeps bracket-matching code short: `{ '(': ')', '[': ']', '{': '}' }`.

## Template

**Matching pairs:**

```js
function isBalanced(s) {
  const closerFor = { '(': ')', '[': ']', '{': '}' };
  const stack = [];
  for (const ch of s) {
    if (ch in closerFor) stack.push(closerFor[ch]);  // remember what we expect
    else if (stack.pop() !== ch) return false;      // wrong closer or nothing open
  }
  return stack.length === 0;                        // nothing left unclosed
}
```

**Monotonic stack** ("for each element, find the next element that is greater"):

```js
function nextGreater(nums) {
  const result = new Array(nums.length).fill(-1);
  const stack = []; // indices whose answer we don't know yet
  for (let i = 0; i < nums.length; i++) {
    // nums[i] resolves every waiting element smaller than it
    while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {
      const j = stack.pop();
      result[j] = nums[i];
    }
    stack.push(i);
  }
  return result; // anything still on the stack never found a greater value
}
```

The stack stays **decreasing** from bottom to top (that's the "monotonic" part). Each index is pushed once and popped at most once, so it's `O(n)` despite the nested loop.

Flip the comparison to get variants:

| You want the next… | Pop while top is… | Stack order (bottom → top) |
| --- | --- | --- |
| greater element | `<` current | decreasing |
| smaller element | `>` current | increasing |
| greater-or-equal | `<=` current | strictly decreasing |

## Worked example

**Problem:** evaluate an expression in Reverse Polish Notation, e.g. `["2","1","+","3","*"]` means `(2 + 1) * 3`. (LeetCode 150.)

Numbers wait on the stack until an operator arrives; the operator uses the **two most recent** numbers.

```js
function evalRPN(tokens) {
  const stack = [];
  const ops = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => Math.trunc(a / b), // truncate toward zero
  };
  for (const t of tokens) {
    if (t in ops) {
      const b = stack.pop(); // popped first = right operand!
      const a = stack.pop();
      stack.push(ops[t](a, b));
    } else {
      stack.push(Number(t));
    }
  }
  return stack.pop();
}
```

Trace `["4","13","5","/","+"]`:

| token | action | stack |
| --- | --- | --- |
| `4` | push | [4] |
| `13` | push | [4, 13] |
| `5` | push | [4, 13, 5] |
| `/` | pop 5, pop 13 → `trunc(13 / 5) = 2` | [4, 2] |
| `+` | pop 2, pop 4 → `6` | [6] |

Answer: `6`. Two lessons hiding here: the **order of pops** matters for `-` and `/`, and JS `/` is floating-point, so use `Math.trunc` (not `Math.floor`, which rounds negatives the wrong way).

## Complexity cheat sheet

| Pattern | Time | Space |
| --- | --- | --- |
| push / pop / peek on an array | `O(1)` | — |
| Bracket matching | `O(n)` | `O(n)` |
| Monotonic stack (next greater/smaller) | `O(n)` | `O(n)` |
| Stack with `O(1)` min (auxiliary stack) | `O(1)` per op | `O(n)` |
| `shift()` / `unshift()` (avoid!) | `O(n)` | — |

## Common mistakes

- **Popping from an empty stack** and not noticing (`undefined` silently flows on). Check `stack.length` when it matters.
- **Forgetting the final check.** In matching problems, leftover openers mean the input is invalid.
- **Pushing values when you need indices.** Distances like "how many days later" need the index.
- **Wrong comparison in a monotonic stack** — `<` vs `<=` decides how equal values are handled. Test with duplicates.
- **Operand order**: in `a - b`, `b` is the one you popped first.
- **Using `shift()`** and turning your stack into a slow queue.

## Practice

- [Valid Parentheses](#/practice/05-stack/valid-parentheses) — Easy
- [Min Stack](#/practice/05-stack/min-stack) — Medium
- [Daily Temperatures](#/practice/05-stack/daily-temperatures) — Medium

## Before moving on

- [ ] I can use a JS array as a stack and explain why `push`/`pop` beat `shift`/`unshift`.
- [ ] I can match brackets of several types and handle the empty-stack and leftover cases.
- [ ] I can write the monotonic stack template and say why it's `O(n)`.
- [ ] I know when to store indices instead of values on the stack.
- [ ] I can design a stack that answers an extra query (like the minimum) in `O(1)`.
