# Task Scheduler

A CPU has to run a list of `tasks`, each labelled with an uppercase letter `'A'`–`'Z'`. Every task takes exactly one time unit. In each unit the CPU either runs one task or sits **idle**.

There's a cooling rule: two tasks with the **same** label must be at least `n` units apart (so there are at least `n` other units — other tasks or idle time — between them). Tasks can be run in any order.

Return the **minimum** number of time units needed to finish all the tasks.

## Examples

```
Input:  tasks = ["A","A","A","B","B","B"], n = 2
Output: 8          // A B idle A B idle A B
```

```
Input:  tasks = ["A","C","A","B","D","B"], n = 1
Output: 6          // A B C A D B — no idling needed
```

```
Input:  tasks = ["A","A","A","B","B","B"], n = 3
Output: 10         // A B idle idle A B idle idle A B
```

## Constraints

- `1 <= tasks.length <= 10^4`
- `tasks[i]` is an uppercase English letter.
- `0 <= n <= 100`

## Hints

<details><summary>Hint 1</summary>

Only the **counts** matter, not the order the tasks were given in. Greedy idea: at every step, run the available task with the most copies left — the most frequent tasks are the ones that force idle time.

</details>

<details><summary>Hint 2</summary>

Simulate with a **max-heap** of remaining counts and a queue of tasks that are cooling down, each tagged with the time it becomes available again. Each time unit: pop the biggest count (if any), decrement it, and park it in the queue until `time + n`.

</details>

<details><summary>Hint 3</summary>

There's also a neat formula. If the most frequent count is `maxCount` and `numMax` labels share it, the frame `(maxCount - 1) * (n + 1) + numMax` is a lower bound. The answer is the larger of that and `tasks.length`.

</details>
