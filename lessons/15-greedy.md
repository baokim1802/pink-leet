# Greedy

## The big idea

A **greedy** algorithm builds the answer one step at a time, and at every step it takes the option that looks best **right now** — without ever going back to reconsider.

That sounds reckless, and often it is! Backtracking and dynamic programming exist precisely because "best right now" can be wrong later. But for a surprising number of problems there's a local choice that is **always safe**: making it never rules out an optimal answer. When you find that choice, you get a solution that's usually `O(n)` or `O(n log n)`, with a few lines of code.

So greedy problems are really about one question: **why is this choice safe?**

### What makes a greedy choice safe

Two properties, in plain words:

1. **Greedy choice property** — there's an optimal answer that *starts with* the greedy choice.
2. **Optimal substructure** — after making that choice, what's left is a smaller copy of the same problem.

If both hold, you can repeat "make the safe choice, shrink the problem" until nothing's left.

### Exchange-argument intuition

The standard way to convince yourself (or an interviewer) is an **exchange argument**:

> Take any optimal solution that *doesn't* make the greedy choice. Swap in the greedy choice. Show the result is still valid and no worse. Therefore some optimal solution does make the greedy choice.

Example — scheduling meetings in one room to fit as many as possible. Greedy: always pick the meeting that **ends earliest**. Suppose some optimal schedule starts with a meeting `X` that ends later than the earliest-ending meeting `E`. Replace `X` with `E`: `E` ends even sooner, so it can't collide with anything that followed `X`. Same count, still valid — so picking `E` first was safe.

You don't need a formal proof in an interview, but saying "if I swap my choice into any optimal answer, nothing breaks" out loud is a great signal.

### When greedy fails

Greedy is wrong whenever an early "best" choice can block a better overall result. The classic trap is **coin change with odd coin systems**:

```
coins = [1, 3, 4], amount = 6

greedy (largest coin first): 4 + 1 + 1   → 3 coins
optimal:                     3 + 3       → 2 coins
```

With US coins (`1, 5, 10, 25`) greedy happens to work, which is exactly why this bug hides so well. When you can't find an exchange argument — or you can build a small counterexample — reach for **dynamic programming** instead.

**Habit:** before coding a greedy idea, spend 30 seconds trying to break it with a tiny input.

## How to recognize it

- "**Maximum number** of …" / "**minimum number** of …" where items can be taken in some natural order (by size, deadline, end time).
- Pairing or matching problems: "assign cookies to children", "people to boats", "tasks to workers".
- "Can you reach the end?" / "fewest jumps" on an array of ranges → the **farthest reach** pattern.
- "Largest sum of a contiguous subarray" → **Kadane's algorithm**.
- A circular route with gains and costs → track a running balance, reset when it goes negative.
- Intervals: merging, scheduling, removing the fewest to avoid overlap → **sort first**, then sweep.
- The constraints are large (`10^5`) and the problem *feels* like DP, but the DP would be `O(n²)` — there might be a greedy shortcut.

## JavaScript toolkit

| Idiom | Use | Notes |
|---|---|---|
| `arr.sort((a, b) => a - b)` | sort numbers ascending | **Without** the comparator, JS sorts as strings: `[10, 9, 1].sort()` → `[1, 10, 9]`. |
| `pairs.sort((a, b) => a[1] - b[1])` | sort intervals by end time | Sorting is `O(n log n)` and **mutates** the array — copy with `[...arr]` if you need the original. |
| `Math.max(best, cur)` | running best | Cheaper and clearer than `if` chains. |
| `-Infinity` / `nums[0]` | starting value for a max | Starting from `0` breaks all-negative inputs. |
| `new Map()` + `(m.get(k) ?? 0) + 1` | counting cards/values | Needed when you consume values in sorted order (Hand of Straights style). |
| two indices `i`, `j` on sorted arrays | matching smallest with smallest / largest with smallest | No extra space. |

Most greedy solutions are a **sort** followed by **one pass**, so the total is `O(n log n)`; if the input is already in a usable order, it's `O(n)`.

## Template

### Sort first, then sweep

```js
function greedySweep(items) {
  items.sort((a, b) => a.key - b.key); // the order that makes the choice safe
  let answer = 0;
  let state = /* whatever you must remember, e.g. last end time */ -Infinity;
  for (const item of items) {
    if (/* taking item is compatible with state */ item.start >= state) {
      answer++;
      state = item.end;
    }
  }
  return answer;
}
```

### Kadane's algorithm (best contiguous sum)

"The best subarray ending here either extends the best one ending at the previous index, or starts fresh."

```js
function kadane(nums) {
  let current = nums[0]; // best sum of a subarray ending at i
  let best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]); // drop a negative prefix
    best = Math.max(best, current);
  }
  return best;
}
```

It's secretly a tiny DP where you only keep the previous state — which is why it's often filed under both topics.

### Farthest reach

When every position `i` lets you reach up to `i + nums[i]`, the reachable positions always form a prefix. Track its right edge.

```js
let farthest = 0;
for (let i = 0; i < nums.length; i++) {
  if (i > farthest) break;              // gap: position i is unreachable
  farthest = Math.max(farthest, i + nums[i]);
}
```

Add a second variable for the end of the *current* "level" and you can count the minimum number of jumps too — it's BFS without a queue.

## Worked example

**Boats to Save People** (LeetCode 881): `people[i]` is a person's weight. Each boat carries **at most two** people and at most `limit` total weight. Return the minimum number of boats. (Every person weighs at most `limit`.)

**Greedy idea:** sort, then always put the **heaviest** remaining person in a boat, and add the **lightest** remaining person if they fit.

**Why it's safe (exchange argument):** the heaviest person `H` needs a boat no matter what.

- If even the lightest person `L` can't ride with `H`, nobody can — `H` rides alone in *every* solution.
- If `L` can ride with `H`, take any optimal plan. Say `H` shares with `X` and `L` shares with `Y`. Swap `X` and `L`: `H + L <= H + X <= limit`, and `X + Y <= X + H <= limit` (because `Y <= H`). Still valid, same number of boats. (If `H` or `L` was alone, moving `L` in with `H` never adds a boat.)

So pairing the heaviest with the lightest is always safe, and what remains is the same problem on fewer people.

```js
function numRescueBoats(people, limit) {
  people.sort((a, b) => a - b);
  let light = 0;
  let heavy = people.length - 1;
  let boats = 0;
  while (light <= heavy) {
    if (people[light] + people[heavy] <= limit) light++; // lightest joins
    heavy--;                                             // heaviest always leaves
    boats++;
  }
  return boats;
}
```

Trace on `people = [3, 2, 2, 1]`, `limit = 3` → sorted `[1, 2, 2, 3]`:

| light | heavy | Pair checked | Fits? | Boat carries | boats |
|---|---|---|---|---|---|
| 0 | 3 | 1 + 3 | no (4 > 3) | 3 alone | 1 |
| 0 | 2 | 1 + 2 | yes | 1 and 2 | 2 |
| 1 | 1 | same person | — | 2 alone | 3 |

Answer **3**. Sort `O(n log n)` + one pass `O(n)`, `O(1)` extra space.

Notice the shape: **sort, then two pointers, one decision per step, never undo.** That's what most greedy code looks like.

## Complexity cheat sheet

| Pattern | Time | Space |
|---|---|---|
| Sort + one pass | O(n log n) | O(1)–O(n) (sort) |
| Kadane's algorithm | O(n) | O(1) |
| Farthest reach (Jump Game) | O(n) | O(1) |
| Min jumps with levels (Jump Game II) | O(n) | O(1) |
| Circular running balance (Gas Station) | O(n) | O(1) |
| Last-occurrence table + sweep (Partition Labels) | O(n) | O(alphabet) |
| Count map + sorted distinct values (Hand of Straights) | O(n log n) | O(n) |
| DP alternative when greedy fails | often O(n²) or O(n · target) | O(n) or more |

## Common mistakes

- **Trusting a greedy idea without trying to break it.** Test it on 3–4 tiny inputs, including awkward ones like coins `[1, 3, 4]`.
- **Sorting numbers without a comparator.** `sort()` compares strings.
- **Sorting by the wrong key.** Interval scheduling sorts by **end** time; sorting by start time looks fine and gives wrong answers.
- **Initializing a max with `0`.** Kadane's on `[-3, -1]` must return `-1`, not `0`.
- **Off-by-one on "reach the last index".** Jump Game II loops to `n - 2`: once you're standing on the last index you don't jump again.
- **Forgetting to check the global condition first.** Gas Station: if total gas < total cost, no start works; Hand of Straights: if `n % groupSize !== 0`, fail fast.
- **Mutating an input you still need.** `sort()` is in place.

## Practice

- [Assign Cookies](#/practice/15-greedy/assign-cookies) — Easy
- [Lemonade Change](#/practice/15-greedy/lemonade-change) — Easy
- [Maximum Subarray](#/practice/15-greedy/maximum-subarray) — Medium
- [Jump Game](#/practice/15-greedy/jump-game) — Medium
- [Jump Game II](#/practice/15-greedy/jump-game-ii) — Medium
- [Gas Station](#/practice/15-greedy/gas-station) — Medium
- [Partition Labels](#/practice/15-greedy/partition-labels) — Medium
- [Hand of Straights](#/practice/15-greedy/hand-of-straights) — Medium

## Before moving on

- [ ] I can explain in one or two sentences why a particular greedy choice is safe (exchange argument).
- [ ] I can produce a counterexample where greedy fails (coin change with `[1, 3, 4]`).
- [ ] I can write Kadane's algorithm from memory and handle all-negative arrays.
- [ ] I can use the "farthest reach" idea to decide reachability and count minimum jumps.
- [ ] I reach for "sort first" when items can be processed in a natural order.
- [ ] I know when to abandon greedy and switch to dynamic programming.
