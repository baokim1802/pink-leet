# Time Based Key-Value Store

Build a key-value store that remembers **history**: the same key can hold different values at different moments, and you can ask what a key held at any point in time.

- `new TimeMap()` — creates an empty store.
- `set(key, value, timestamp)` — records that `key` had `value` at time `timestamp`.
- `get(key, timestamp)` — returns the value from the most recent `set` of `key` whose time is `<= timestamp`. If there is no such `set` (unknown key, or every `set` happened later), return the empty string `""`.

## Examples

```
Input:
  ["TimeMap", "set", "get", "get", "set", "get", "get"]
  [[], ["foo","bar",1], ["foo",1], ["foo",3], ["foo","bar2",4], ["foo",4], ["foo",5]]
Output:
  [null, null, "bar", "bar", null, "bar2", "bar2"]

  get("foo", 3) -> latest set at time <= 3 is time 1 -> "bar"
  get("foo", 5) -> latest set at time <= 5 is time 4 -> "bar2"
```

```
Input:
  ["TimeMap", "set", "set", "get", "get", "get"]
  [[], ["love","high",10], ["love","low",20], ["love",5], ["love",15], ["love",25]]
Output:
  [null, null, null, "", "high", "low"]      // nothing was set before time 5
```

## Constraints

- Keys and values are short lowercase strings (plus digits).
- `1 <= timestamp <= 10^7`
- The timestamps passed to `set` are **strictly increasing** across all calls.
- At most `2 * 10^5` calls to `set` and `get` in total.

## Hints

<details><summary>Hint 1</summary>

Store a `Map` from each key to a list of `[timestamp, value]` pairs. Because `set` timestamps only go up, pushing to the end keeps every list sorted by time — for free.

</details>

<details><summary>Hint 2</summary>

`get` then asks: in this sorted list, which is the **last** entry with time `<= timestamp`? Scanning backwards works, but binary search makes it `O(log n)`.

</details>

<details><summary>Hint 3</summary>

Search for the first entry with time `> timestamp` (an "upper bound"). The answer is the entry just before it — and if that index is `0`, return `""`.

</details>
