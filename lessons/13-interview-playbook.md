# Interview Playbook

You know the patterns. This lesson covers **performing** in the actual interview: what to say, when to say it, and how to recover when you get stuck.

## The big idea

Interviewers don't only grade whether your code works. They're asking: *would I enjoy solving problems with this person?* Clear communication, structured thinking and calm debugging often matter as much as the final code. A slightly suboptimal solution that you explain well beats a perfect one written in silence.

## The 6-step framework

Use the same steps on every problem, including practice problems here, until it's automatic.

1. **Understand (2–3 min).** Restate the problem in your own words and ask clarifying questions:
   - Input size? Can it be empty? Negative numbers? Duplicates?
   - Sorted? Can I modify the input?
   - What should I return if there's no answer?
2. **Examples (2 min).** Walk through the given example by hand. Make up one edge case (empty input, a single element, all duplicates).
3. **Brute force (1–2 min).** Say it out loud with its complexity: *"The naive way checks every pair, which is O(n²). Let me see if I can do better."* This shows you can always deliver something.
4. **Optimize (5–10 min).** Look for the pattern. Ask yourself the questions in the table below. State the approach and its complexity **before** coding, and get a nod from the interviewer.
5. **Code (15–20 min).** Write clean code with good names and narrate as you go. Use helper functions for sub-steps.
6. **Test (5 min).** Trace your code on the small example *line by line*, then the edge cases. Fix bugs calmly and out loud.

## Pattern-spotting questions

| If you notice… | Think… |
|---|---|
| "Have I seen this before?" / counting / pairs | Hash map / set |
| Sorted array, or pairs that sum to something | Two pointers |
| Contiguous subarray/substring, "longest/shortest with condition" | Sliding window |
| Sorted input, or "minimum X such that…" with a monotonic check | Binary search (on the answer) |
| Matching brackets, "next greater element", undo | Stack / monotonic stack |
| Top K, K-th largest, repeatedly take min/max | Heap |
| Tree or nested structure | DFS (recursion) or BFS (levels) |
| Grid, network, dependencies, "connected" | Graph BFS/DFS, topological sort |
| "All combinations / permutations / subsets" | Backtracking |
| "Number of ways", "min/max cost", overlapping subproblems | Dynamic programming |
| Intervals / scheduling | Sort by start, then sweep/greedy |

## What to say when you're stuck

Going silent is the real mistake, not being stuck. Try these:

- *"Let me go back to the brute force and see what work is repeated."*
- *"What if the input were sorted? Would that help?"*
- *"Let me try a smaller example by hand and look for a pattern."*
- *"Can I trade space for time here, maybe with a hash map?"*
- *"Could I think about this from the end instead of the start?"*

If the interviewer gives a hint, **take it gracefully**: *"Oh, that's a good point. So if I track X, then…"*

## JavaScript-specific tips

- Say which JS features you're using: *"I'll use a `Map` because keys can be numbers and lookups are O(1)."*
- Sort numbers with a comparator: `arr.sort((a, b) => a - b)`. Point this out, since it shows JS fluency.
- There's no built-in heap. Say *"I'll assume a MinHeap class with push and pop in O(log n)"* and offer to implement it if they want. Many interviewers accept that.
- `queue.shift()` is O(n). For BFS, use an index pointer, and mention why.
- Use `const`/`let`, arrow functions and destructuring. Modern, clean JS reads as confident.
- Integer division is `Math.floor(a / b)`. Watch out for `%` with negative numbers.

## Complexity you should be able to state instantly

| Operation | Cost |
|---|---|
| Array access, push, pop | O(1) |
| Array `shift`, `unshift`, `splice`, `includes`, `indexOf` | O(n) |
| `Map`/`Set` get, set, has, delete | O(1) average |
| Sorting | O(n log n) |
| Binary search | O(log n) |
| Heap push/pop | O(log n) |
| BFS/DFS on a graph | O(V + E) |
| Subsets / permutations | O(2ⁿ) / O(n!) |
| String concatenation in a loop | can be O(n²); collect in an array and `join` instead |

## Behavioral questions matter too

Prepare 5–6 stories using **STAR** (Situation, Task, Action, Result): a hard bug you fixed, a conflict, a time you learned something quickly, a failure, a project you're proud of. Practice them out loud the same way you practice code.

## Mock interview routine

1. Pick a problem you haven't seen (or ask Claude: *"Mock-interview me on a medium problem; act as the interviewer and don't reveal the solution"*).
2. Set a **45-minute timer**.
3. Talk out loud the whole time, even when you're alone. It feels silly at first and helps a lot.
4. Afterwards, write in Notes: what went well, where you froze, and what pattern you missed.

## Before moving on

- [ ] I can run the 6-step framework without looking at it
- [ ] I've done at least 3 timed mock interviews out loud
- [ ] I can state the complexity of every JS operation in the table above
- [ ] I have 5 STAR stories written down
- [ ] I've re-solved every 🔁 review problem from scratch
