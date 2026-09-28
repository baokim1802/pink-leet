// Reads/writes data/progress.json — your goals, tracker and notes live here.

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./catalog');

const FILE = path.join(ROOT, 'data', 'progress.json');

const DEFAULTS = {
  name: '',
  problems: {}, // id -> { status: 'todo'|'attempted'|'solved'|'review', attempts, solvedAt, lastRunAt, notes, starred }
  lessons: {}, // id -> { done, doneAt }
  activity: {}, // 'YYYY-MM-DD' -> { solved, runs, lessons }
  goals: {
    dailyProblems: 2,
    weeklyProblems: 10,
    targetDate: '',
    targetLabel: 'Interview ready 💼',
    custom: [], // { id, text, done }
  },
};

function today(d = new Date()) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// Lessons that were renumbered: old id -> new id (keeps your "done" checkmarks).
const LESSON_RENAMES = { '13-interview-playbook': '19-interview-playbook' };

function load() {
  let data = {};
  try {
    data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  } catch {
    // first run or unreadable file: start fresh
  }
  for (const [from, to] of Object.entries(LESSON_RENAMES)) {
    if (data.lessons?.[from] && !data.lessons[to]) data.lessons[to] = data.lessons[from];
    if (data.lessons) delete data.lessons[from];
  }
  return {
    ...structuredClone(DEFAULTS),
    ...data,
    goals: { ...DEFAULTS.goals, ...(data.goals || {}) },
  };
}

function save(data) {
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  const tmp = FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2) + '\n');
  fs.renameSync(tmp, FILE);
  return data;
}

function bump(data, key, n = 1) {
  const day = today();
  const a = (data.activity[day] ||= { solved: 0, runs: 0, lessons: 0 });
  a[key] = (a[key] || 0) + n;
}

/** Record a test run. Marks the problem solved (and counts it for today) the first time all tests pass. */
function recordRun(id, ok) {
  const data = load();
  const p = (data.problems[id] ||= { status: 'todo', attempts: 0, notes: '' });
  p.attempts = (p.attempts || 0) + 1;
  p.lastRunAt = new Date().toISOString();
  bump(data, 'runs');
  let newlySolved = false;
  if (ok && p.status !== 'solved') {
    newlySolved = !p.solvedAt;
    p.status = 'solved';
    p.solvedAt ||= today();
    if (newlySolved) bump(data, 'solved');
  } else if (!ok && (!p.status || p.status === 'todo')) {
    p.status = 'attempted';
  }
  save(data);
  return { problem: p, newlySolved };
}

module.exports = { FILE, load, save, recordRun, bump, today };
