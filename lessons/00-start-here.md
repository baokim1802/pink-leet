# Start Here

Welcome to your study space! 🎀 This page explains how everything fits together and gives you a plan, so each session you can just sit down and start.

## How this space works

| Where | What it's for |
|---|---|
| **📚 Lessons** | One lesson per pattern, in order. Each lesson covers the idea, how to spot it, a JavaScript template, and common mistakes. |
| **💻 Practice** | Real LeetCode problems grouped by topic. Each problem has a statement, hints, tests, and a reference solution you have to click through a warning to see. |
| **🎯 Goals & Tracker** | Your daily and weekly targets, a countdown to your big goal, your own milestones, and an activity heatmap. |
| **🏠 Home** | What to do next, your streak, and today's progress. |
| **📝 Cheat sheet** | Quick JS syntax (Set, Map, arrays, strings, sorting…) in a drawer you can open from any page with `Ctrl+/`. Click ✏️ to edit it or add your own notes. |

Everything is saved to plain files in this folder:

```
leet/
├── lessons/            ← one markdown file per topic
├── cheatsheets/        ← quick-syntax notes (the 📝 drawer)
├── practice/<topic>/<problem>/
│   ├── README.md       ← problem statement + hints
│   ├── solution.js     ← ✏️ YOUR code goes here
│   ├── tests.js        ← test cases
│   ├── reference.js    ← a model solution (try first!)
│   └── meta.json
├── data/progress.json  ← your tracker (streaks, notes, goals)
└── app/, lib/, scripts/ ← the study app itself
```

## The practice loop

1. **Read the lesson** for the topic, then mark it complete.
2. **Open a problem.** Read it, then work through one example by hand before writing any code.
3. **Say your plan out loud**, or write it in the 📝 Notes tab: the approach, the time and space complexity, and the edge cases.
4. **Write the code** in the built-in editor or in your own editor (✏️ *Open in editor*). Both edit the same `solution.js` file.
5. **Run the tests** with ▶ or `Ctrl+Enter`. `console.log` output shows up under the results.
6. Stuck for more than 20–30 minutes? Open **one hint** at a time. Only look at 💡 Solution once you've really tried.
7. After you solve it, write **the key insight** in Notes in one sentence. That's what you'll reread before interviews.
8. If a problem felt shaky, set its status to **🔁 Review again** and redo it from scratch in a few days.

> The goal isn't to memorize 500 problems. It's to recognize about 15 patterns fast and apply them calmly.

## Terminal shortcuts

You can do everything from the terminal too:

```
npm start                 # open the study app  → http://localhost:4321
npm test                  # list all problems
npm test two-sum          # run the tests for one problem (also updates your tracker)
npm test two-sum -- --ref # run the reference solution
npm run new -- 02-arrays-and-hashing contains-duplicate-ii Easy   # add your own problem
```

## A suggested plan

About 150 problems over roughly 20 weeks. Move on from a topic once you can solve a **new** Medium in it in about 25 minutes, explaining your approach out loud first.

| Weeks | Focus |
|---|---|
| 1 | Big-O & JS toolkit, Arrays & Hashing |
| 2 | Two Pointers, Sliding Window |
| 3 | Stack, Binary Search |
| 4–5 | Linked List, Heap / Priority Queue |
| 6–8 | Trees, Tries |
| 9–10 | Backtracking |
| 11–13 | Graphs, Advanced Graphs |
| 14–16 | Dynamic Programming, 2D Dynamic Programming |
| 17 | Intervals, Greedy, Math & Bit Manipulation |
| 18–20 | Interview Playbook: timed mock interviews, redo every 🔁 problem from scratch |

About **1–2 problems a day** plus a lesson every few days is a strong, sustainable pace. Consistency beats cramming. 🐢💕

## Studying with Claude

In this folder, ask Claude things like:

- "Give me a hint for `two-sum` without the solution."
- "Review my `practice/05-stack/daily-temperatures/solution.js`. What's the complexity, and what did I miss?"
- "Why does a monotonic stack work here?"
- "Mock-interview me on a medium graph problem. Don't reveal the answer unless I ask."
- "Add 3 more sliding window problems to my practice folder."

## Before moving on

- [ ] I started the app with `npm start` and found my way around
- [ ] I set my name, daily goal and target date in 🎯 Goals
- [ ] I opened a problem and ran its tests once, even with an empty solution
