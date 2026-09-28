# Course Schedule

There are `numCourses` courses labeled `0` to `numCourses - 1`. You're given `prerequisites`, where `prerequisites[i] = [a, b]` means **you must take course `b` before course `a`**.

Return `true` if it's possible to finish every course, otherwise `false`.

## Examples

```
Input:  numCourses = 2, prerequisites = [[1,0]]
Output: true
// take 0, then 1
```

```
Input:  numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
// 1 needs 0 and 0 needs 1 — impossible
```

## Constraints

- `1 <= numCourses <= 2000`
- `0 <= prerequisites.length <= 5000`
- `prerequisites[i].length === 2`
- `0 <= a, b < numCourses`
- All pairs are unique.

## Hints

<details><summary>Hint 1</summary>

Model it as a **directed** graph with an edge `b → a` for each pair. When is it impossible to finish? Think about what a loop of requirements means.

</details>

<details><summary>Hint 2</summary>

Kahn's algorithm: count each course's incoming edges (its number of unmet prerequisites). Start with every course that has zero, "take" it, and decrement its dependents. Can you take all `numCourses`?

</details>

<details><summary>Hint 3</summary>

If you'd rather DFS, a plain `visited` set isn't enough — you need three states: unvisited, *visiting* (on the current path), and *done*. Reaching a *visiting* node means a cycle.

</details>
