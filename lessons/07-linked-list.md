# Linked List

## The big idea

A linked list is a chain of little boxes. Each box (a **node**) holds a value and a pointer to the next box. That's it — no indexes, no contiguous memory, just "here's my value, and here's who comes after me."

```
head
 │
 ▼
[1] ──► [2] ──► [3] ──► null
```

That shape gives linked lists a very different personality from arrays:

- **Inserting or deleting** next to a node you already hold is `O(1)` — you just rewire a pointer. No shifting elements.
- **Finding** the `i`-th element is `O(n)` — you have to walk from the head.
- You usually **don't know the length** until you've walked the whole thing.

Almost every linked list interview question is secretly a question about **pointer bookkeeping**: which node am I on, what do I need to remember before I overwrite a `.next`, and what do I return at the end? The good news: there are only a handful of tricks, and once you've practiced them they cover nearly everything.

## How to recognize it

- The input is literally a `ListNode head`. (Easy one!)
- "Do it in `O(1)` extra space" on a list → pointer manipulation, not copying to an array.
- "Find the middle", "detect a cycle", "find the k-th from the end" → **fast & slow pointers** or a **gap** between two pointers.
- "Reverse", "reorder", "rotate" → **reversing** (possibly just part of the list).
- "Merge", "remove", "partition", or anything where the head itself might change → **dummy head**.

## JavaScript toolkit

LeetCode (and this app's `lib/structures.js`) define nodes like this:

```js
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

const head = new ListNode(1, new ListNode(2, new ListNode(3))); // 1 -> 2 -> 3
```

Things worth knowing:

- **Compare nodes with `===`.** Two different nodes can hold the same `val`; identity is what matters for cycles and intersections.
- **`while (cur)`** is the standard walk. `while (cur.next)` stops one node early — handy when you need the node *before* something.
- **Optional chaining** (`fast?.next?.next`) can prevent `TypeError: Cannot read properties of null`, but be explicit in loops: `while (fast && fast.next)` is clearer.
- **A `Set` of nodes** works (objects are compared by reference), which gives you an easy `O(n)` space cycle detector.
- **Converting to an array** (`while (cur) { arr.push(cur.val); cur = cur.next; }`) is a legit first attempt when you're stuck, but interviewers usually want the `O(1)` space version.
- **Destructuring swaps** make reversal compact: `[cur.next, prev, cur] = [prev, cur, cur.next];` — the right side is evaluated first, so it's safe. The long form is easier to read while learning.

## Template

### 1. The dummy head trick

Whenever the head of the result might change (merging, deleting the first node, building a new list), put a fake node in front. You never have to special-case "is this the first node?", and you return `dummy.next`.

```js
const dummy = new ListNode(0, head);
let tail = dummy;           // where we attach the next node
// ... tail.next = someNode; tail = tail.next;
return dummy.next;
```

### 2. Fast & slow pointers

`slow` moves one step, `fast` moves two. When `fast` runs off the end, `slow` is at the middle. If there's a cycle, `fast` eventually lands on `slow`.

```js
let slow = head;
let fast = head;
while (fast && fast.next) {
  slow = slow.next;
  fast = fast.next.next;
  // if (slow === fast) -> there is a cycle
}
// no cycle: slow is the middle (second middle for even lengths)
```

A close cousin is the **gap** pattern: move one pointer `n` steps ahead first, then move both together. When the leader hits the end, the follower is `n` nodes behind it.

### 3. Reversing

The classic three-pointer dance. Save the next node *before* you break the link.

```js
let prev = null;
let cur = head;
while (cur) {
  const next = cur.next; // 1. remember the rest of the list
  cur.next = prev;       // 2. flip the arrow
  prev = cur;            // 3. step prev forward
  cur = next;            // 4. step cur forward
}
return prev;             // new head
```

### 4. Drawing pointers (seriously, do this)

Before you code, draw the list and the pointers on paper (or in a comment). After each line of your loop, redraw. Most linked list bugs are "I overwrote `.next` before saving it" or "I'm off by one node", and both jump off the page when you draw.

```
start:          prev=null   cur=[1] ─► [2] ─► [3] ─► null

after step 1:   null ◄─ [1]   cur=[2] ─► [3] ─► null
                        prev

after step 2:   null ◄─ [1] ◄─ [2]   cur=[3] ─► null
                               prev

after step 3:   null ◄─ [1] ◄─ [2] ◄─ [3]   cur=null
                                      prev  ← new head
```

## Worked example

**Middle of the Linked List** (LeetCode 876): return the middle node; for even lengths, return the second of the two middles.

Input `1 -> 2 -> 3 -> 4 -> 5`. Start `slow = fast = [1]`.

| Step | slow | fast | Loop check `fast && fast.next` |
| --- | --- | --- | --- |
| start | 1 | 1 | `1.next` is 2 → continue |
| 1 | 2 | 3 | `3.next` is 4 → continue |
| 2 | 3 | 5 | `5.next` is null → stop |

Answer: node `3`. Now `1 -> 2 -> 3 -> 4 -> 5 -> 6`:

| Step | slow | fast | Check |
| --- | --- | --- | --- |
| start | 1 | 1 | continue |
| 1 | 2 | 3 | continue |
| 2 | 3 | 5 | `5.next` is 6 → continue |
| 3 | 4 | null | `fast` is null → stop |

Answer: node `4`, the second middle. Why it works: `fast` covers twice the distance of `slow`, so when `fast` has walked the whole list, `slow` has walked half of it.

```js
function middleNode(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}
```

If you wanted the *first* middle instead, start `fast` at `head.next`. Small changes to the starting positions shift the result by one — trace a 2-node and a 3-node list whenever you're unsure.

## Complexity cheat sheet

| Operation | Singly linked list | Array |
| --- | --- | --- |
| Access `i`-th element | `O(n)` | `O(1)` |
| Insert/delete at head | `O(1)` | `O(n)` (`unshift`/`shift`) |
| Insert/delete after a known node | `O(1)` | `O(n)` |
| Insert at tail (with a tail pointer) | `O(1)` | `O(1)` amortized (`push`) |
| Search by value | `O(n)` | `O(n)` |
| Reverse in place | `O(n)` time, `O(1)` space | `O(n)` time, `O(1)` space |
| Find middle (fast/slow) | `O(n)` time, `O(1)` space | `O(1)` |

## Common mistakes

- **Losing the rest of the list.** Writing `cur.next = prev` before saving `cur.next` means the remaining nodes are gone forever.
- **Null pointer crashes.** Accessing `fast.next.next` when `fast.next` is `null`. Guard with `while (fast && fast.next)`.
- **Forgetting the empty list** (`head === null`) and the one-node list. Test both every time.
- **Returning the wrong head.** After reversing, the head is `prev`, not `head`. With a dummy, it's `dummy.next`, not `dummy`.
- **Comparing values instead of nodes** for cycle/intersection problems. Use `===` on nodes.
- **Accidentally creating a cycle** — e.g. moving a node to the tail without setting its `.next = null`. Your tests will hang or hit a length limit.
- **Off-by-one on "n-th from the end".** Draw a 2-node list and check `n = 1` and `n = 2` by hand.

## Practice

- [Reverse Linked List](#/practice/07-linked-list/reverse-linked-list) — Easy
- [Merge Two Sorted Lists](#/practice/07-linked-list/merge-two-sorted-lists) — Easy
- [Linked List Cycle](#/practice/07-linked-list/linked-list-cycle) — Easy
- [Palindrome Linked List](#/practice/07-linked-list/palindrome-linked-list) — Easy
- [Remove Nth Node From End of List](#/practice/07-linked-list/remove-nth-node-from-end-of-list) — Medium
- [Odd Even Linked List](#/practice/07-linked-list/odd-even-linked-list) — Medium
- [Reorder List](#/practice/07-linked-list/reorder-list) — Medium
- [Add Two Numbers](#/practice/07-linked-list/add-two-numbers) — Medium
- [Copy List with Random Pointer](#/practice/07-linked-list/copy-list-with-random-pointer) — Medium
- [LRU Cache](#/practice/07-linked-list/lru-cache) — Medium
- [Reverse Nodes in k-Group](#/practice/07-linked-list/reverse-nodes-in-k-group) — Hard

## Before moving on

- [ ] I can build a small list by hand with `new ListNode(...)` and walk it with `while (cur)`.
- [ ] I can reverse a linked list iteratively without looking, and explain each of the four lines.
- [ ] I know when to reach for a dummy head, and I remember to return `dummy.next`.
- [ ] I can use fast & slow pointers to find the middle and detect a cycle.
- [ ] I can use a gap between two pointers to reach the `n`-th node from the end in one pass.
- [ ] I always test the empty list, a single node, and two nodes.
