# 🎀 Leet Study

A small study app for data structures, algorithms and LeetCode-style interview prep in JavaScript. It has lessons, practice problems with tests, goals and a progress tracker.

## Run it on GitHub (no local setup)

1. On the repo page, click **Code → Codespaces → Create codespace on main**.
2. Wait about a minute. The app starts by itself and opens in a new browser tab.
   If it doesn't, open the **Ports** tab at the bottom and click the 🌐 icon next to port 4321.
3. When you finish a session, click **☁️ Save to GitHub** in the sidebar (or run `npm run sync`).
   This commits your solutions, notes and progress so nothing is lost.

A codespace pauses by itself after 30 minutes idle and keeps your files. Next time, reopen it from
**Code → Codespaces** instead of creating a new one. Unused codespaces are deleted after 30 days
by default, which is why **Save to GitHub** matters.

## Run it locally

```bash
nvm use          # needs Node 18+ (.nvmrc pins 22)
npm start        # → http://localhost:4321   (npm start -- --open also opens the browser)
```

No dependencies to install.

## Layout

```
lessons/                         one markdown lesson per topic (00 → 13)
cheatsheets/                     quick-syntax notes shown in the 📝 drawer
practice/<topic>/<problem>/
  README.md                      statement + hints
  solution.js                    ✏️ your code
  tests.js                       test cases
  reference.js                   model solution (try first!)
  meta.json                      title, difficulty, LeetCode link
data/progress.json               your tracker: statuses, notes, goals, activity
app/  lib/  scripts/  server.js  the app itself
```

The folder names under `practice/` match the lesson filenames, so every lesson links to its problems.

## Cheat sheet

Open it from any page with the 📝 tab on the right, the sidebar link, or <kbd>Ctrl</kbd>+<kbd>/</kbd>.
To edit a sheet, click ✏️ next to its name. **+ New sheet** creates a new one. You can also edit
`cheatsheets/*.md` in any editor:

````md
# Set & Map                ← sheet title (once, at the top)

## Set                     ← each ## heading is one collapsible note
Unique values of any type.
```js
const mySet = new Set();
mySet.add(1);
```
````

The 🌙 button next to the logo switches between light and dark mode.

## Commands

| Command | What it does |
|---|---|
| `npm start` | Run the study GUI |
| `npm test` | List all problems |
| `npm test two-sum` | Test your solution (updates the tracker too) |
| `npm test two-sum -- --ref` | Test the reference solution |
| `npm run new -- 05-stack my-problem Medium` | Scaffold your own problem |
| `npm run sync` | Commit + push your solutions, notes and progress |
| `npm run check` | Check that every reference solution passes its tests |

Set `LEET_EDITOR` to choose the editor the ✏️ *Open in editor* button uses. It defaults to `cursor`, e.g. `LEET_EDITOR=code npm start`.
