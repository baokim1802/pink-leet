// Your study data in Supabase (tables: supabase/schema.sql, all named leet_*).
// The app works with one in-memory `store`, the same shape it keeps in localStorage:
//   { progress, code: { problemId: src }, cheats: { id: markdown }, newCheats: [{ id, markdown }] }
// This file turns that store into table rows and back. Used by static-api.js and scripts/cloud.js.

export const TABLES = ['leet_profiles', 'leet_problems', 'leet_solutions', 'leet_lessons', 'leet_activity', 'leet_cheatsheets'];
export const COUNTERS = ['solved', 'runs', 'lessons'];

// ---------- progress shape (mirrors lib/progress.js) ----------
const LESSON_RENAMES = { '13-interview-playbook': '19-interview-playbook' };
const DEFAULT_PROGRESS = {
  name: '',
  problems: {},
  lessons: {},
  activity: {},
  goals: { dailyProblems: 2, weeklyProblems: 10, targetDate: '', targetLabel: 'Interview ready 💼', custom: [] },
};

export function normalizeProgress(p = {}) {
  const out = { ...structuredClone(DEFAULT_PROGRESS), ...p, goals: { ...DEFAULT_PROGRESS.goals, ...(p.goals || {}) } };
  out.problems ||= {};
  out.lessons ||= {};
  out.activity ||= {};
  for (const [from, to] of Object.entries(LESSON_RENAMES)) {
    if (out.lessons[from] && !out.lessons[to]) out.lessons[to] = out.lessons[from];
    delete out.lessons[from];
  }
  return out;
}

const nullIfEmpty = (v) => v || null;
const dropNulls = (o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v != null));
const clamp = (v, max) => Math.max(0, Math.min(max, Math.round(Number(v) || 0)));

/** Read every table. Returns the store and how many rows there were (0 = a brand-new account). */
export async function loadStore(db) {
  const [profiles, problems, solutions, lessons, activity, cheats] = await Promise.all(TABLES.map((t) => db.select(t)));
  const rowCount = [profiles, problems, solutions, lessons, activity, cheats].reduce((n, r) => n + r.length, 0);

  const p = profiles[0];
  const progress = normalizeProgress(p ? {
    goals: {
      dailyProblems: p.daily_problems, weeklyProblems: p.weekly_problems,
      targetDate: p.target_date || '', targetLabel: p.target_label, custom: p.custom_goals || [],
    },
  } : {});
  progress.name = db.user?.firstName || ''; // the greeting's name lives on the account, shared with Systems Study
  for (const r of problems) {
    progress.problems[r.problem_id] = dropNulls({
      status: r.status, attempts: r.attempts, notes: r.notes, starred: r.starred || null, solvedAt: r.solved_at, lastRunAt: r.last_run_at,
    });
  }
  for (const r of lessons) progress.lessons[r.lesson_id] = dropNulls({ done: r.done, doneAt: r.done_at });
  for (const r of activity) progress.activity[r.day] = { solved: r.solved, runs: r.runs, lessons: r.lessons };

  const store = { progress: normalizeProgress(progress), code: {}, cheats: {}, newCheats: [] };
  for (const r of solutions) store.code[r.problem_id] = r.code;
  for (const r of cheats) {
    if (r.is_new) store.newCheats.push({ id: r.sheet_id, markdown: r.markdown });
    else store.cheats[r.sheet_id] = r.markdown;
  }
  return { store, rowCount };
}

// ---------- store -> rows ----------
// Each builder returns [table, rows] for db.upsert. `uid` is the signed-in user's id.

export function profileRows(uid, prog) {
  const g = prog.goals || {};
  return ['leet_profiles', [{
    user_id: uid,
    daily_problems: clamp(g.dailyProblems, 50),
    weekly_problems: clamp(g.weeklyProblems, 300),
    target_date: nullIfEmpty(g.targetDate),
    target_label: g.targetLabel || '',
    custom_goals: g.custom || [],
    updated_at: new Date().toISOString(),
  }]];
}

export function problemRows(uid, prog, ids = Object.keys(prog.problems)) {
  return ['leet_problems', ids.map((id) => {
    const p = prog.problems[id] || {};
    return {
      user_id: uid,
      problem_id: id,
      status: ['todo', 'attempted', 'solved', 'review'].includes(p.status) ? p.status : 'todo',
      attempts: p.attempts || 0,
      solved_at: nullIfEmpty(p.solvedAt),
      last_run_at: nullIfEmpty(p.lastRunAt),
      notes: p.notes || '',
      starred: !!p.starred,
    };
  })];
}

export function solutionRows(uid, code, ids = Object.keys(code)) {
  const now = new Date().toISOString();
  return ['leet_solutions', ids.map((id) => ({ user_id: uid, problem_id: id, code: code[id] ?? '', updated_at: now }))];
}

export function lessonRows(uid, prog, ids = Object.keys(prog.lessons)) {
  return ['leet_lessons', ids.map((id) => {
    const l = prog.lessons[id] || {};
    return { user_id: uid, lesson_id: id, done: !!l.done, done_at: nullIfEmpty(l.doneAt) };
  })];
}

/** Absolute counts. Day-to-day changes go through leet_bump_activity instead (see activityDelta). */
export function activityRows(uid, prog) {
  return ['leet_activity', Object.entries(prog.activity).map(([day, a]) => ({
    user_id: uid, day, solved: a.solved || 0, runs: a.runs || 0, lessons: a.lessons || 0,
  }))];
}

export function cheatRows(uid, id, markdown, isNew) {
  return ['leet_cheatsheets', [{ user_id: uid, sheet_id: id, markdown, is_new: !!isNew, updated_at: new Date().toISOString() }]];
}

/** Write rows grouped by table: [[table, rows], …]. */
export async function writeRows(db, groups) {
  const byTable = {};
  for (const [table, rows] of groups) (byTable[table] ||= []).push(...rows);
  await Promise.all(Object.entries(byTable).map(([table, rows]) => db.upsert(table, rows)));
}

/** Upload a whole store (first sign-in, restoring a backup, `npm run push`). Adds and overwrites; never deletes. */
export async function saveStore(db, uid, store, { cheats = true } = {}) {
  const prog = normalizeProgress(store.progress);
  const groups = [profileRows(uid, prog), problemRows(uid, prog), lessonRows(uid, prog), activityRows(uid, prog), solutionRows(uid, store.code || {})];
  if (cheats) {
    for (const [id, md] of Object.entries(store.cheats || {})) groups.push(cheatRows(uid, id, md, false));
    for (const c of store.newCheats || []) groups.push(cheatRows(uid, c.id, c.markdown, true));
  }
  await writeRows(db, groups);
}

/** How a day's counters changed between two snapshots, as leet_bump_activity arguments (null if nothing changed). */
export function activityDelta(day, before = {}, after = {}) {
  const args = { p_day: day };
  let changed = false;
  for (const k of COUNTERS) {
    args[`p_${k}`] = (after[k] || 0) - (before[k] || 0);
    if (args[`p_${k}`]) changed = true;
  }
  return changed ? args : null;
}
