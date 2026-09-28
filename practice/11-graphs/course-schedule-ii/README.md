# Course Schedule II

There are `numCourses` courses labeled `0` to `numCourses - 1`, and a list `prerequisites` where `prerequisites[i] = [a, b]` means **course `b` must be taken before course `a`**.

Return an order in which you can take **all** the courses. If several orders work, any of them is fine. If it's impossible to finish every course, return an empty array `[]`.

## Examples

```
Input:  numCourses = 2, prerequisites = [[1,0]]
Output: [0,1]
```

```
Input:  numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
Output: [0,1,2,3]
// [0,2,1,3] is also correct
```

```
Input:  numCourses = 1, prerequisites = []
Output: [0]
```

## Constraints

- `1 <= numCourses <= 2000`
- `0 <= prerequisites.length <= numCourses * (numCourses - 1)`
- `prerequisites[i].length === 2`, `0 <= a, b < numCourses`, `a !== b`
- All pairs are distinct.

## Hints

<details><summary>Hint 1</summary>

This is Course Schedule, except you have to produce the actual order — a **topological sort** of the graph with edges `b → a`.

</details>

<details><summary>Hint 2</summary>

Kahn's algorithm hands you the order for free: the sequence in which courses leave the queue (indegree 0) is a valid schedule.

</details>

<details><summary>Hint 3</summary>

If the order you build ends up shorter than `numCourses`, some courses are stuck in a cycle — return `[]`.

</details>
