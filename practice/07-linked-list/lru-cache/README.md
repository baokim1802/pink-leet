# LRU Cache

Design a cache with a fixed `capacity` that evicts the **least recently used** (LRU) entry when it gets full.

- `new LRUCache(capacity)` — creates an empty cache that holds at most `capacity` keys.
- `get(key)` — returns the value for `key`, or `-1` if it isn't in the cache. A successful `get` counts as a **use**.
- `put(key, value)` — inserts or updates `key`. This also counts as a use. If inserting a new key pushes the cache over `capacity`, first remove the key that was used least recently.

Both `get` and `put` must run in **`O(1)`** average time.

## Examples

```
Input:
  ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
  [[2], [1,1], [2,2], [1], [3,3], [2], [4,4], [1], [3], [4]]
Output:
  [null, null, null, 1, null, -1, null, -1, 3, 4]

  put(1,1), put(2,2)  -> cache {1, 2}           (least recent first)
  get(1) = 1          -> order is now 2, 1
  put(3,3)            -> full: evict 2          -> {1, 3}
  get(2) = -1
  put(4,4)            -> evict 1 (least recent) -> {3, 4}
  get(1) = -1, get(3) = 3, get(4) = 4
```

## Constraints

- `1 <= capacity <= 3000`
- `0 <= key <= 10^4`, `0 <= value <= 10^5`
- At most `2 * 10^5` calls to `get` and `put`.

## Hints

<details><summary>Hint 1</summary>

You need two things at once: fast lookup by key (a hash map) and a fast way to know, and update, the usage **order** (a list where you can move any item to the front in `O(1)`).

</details>

<details><summary>Hint 2</summary>

The classic answer: a `Map` from key to a node of a **doubly linked list**. Most recent at one end, least recent at the other. With `prev` and `next` pointers you can unlink any node in `O(1)`. Dummy head and tail nodes remove all the edge cases.

</details>

<details><summary>Hint 3</summary>

JavaScript shortcut worth knowing: a `Map` remembers **insertion order**. Deleting a key and setting it again moves it to the end, and `map.keys().next().value` is the oldest key. Try both versions — interviewers often want the linked-list one.

</details>
