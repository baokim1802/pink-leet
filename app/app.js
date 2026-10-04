import { renderMarkdown, highlightJs } from './md.js';
import { initCheatsheet, toggleCheatsheet } from './cheatsheet.js';
import { api, STATIC, staticBackend } from './api.js';

// ---------- state & helpers ----------
const state = { lessons: [], problems: [], progress: null };
const $main = document.getElementById('main');
const $side = document.getElementById('sidebar');

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

async function refresh() {
  Object.assign(state, await api('state'));
}

async function saveProgress(type, id, patch) {
  state.progress = await api('progress', { method: 'POST', body: { type, id, patch } });
  renderSidebar();
}

function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove('show'), 2200);
}

function celebrate() {
  const emojis = ['💖', '🌸', '🎀', '✨', '💕', '🍓', '🌷'];
  for (let i = 0; i < 36; i++) {
    const el = document.createElement('div');
    el.className = 'heart';
    el.textContent = emojis[i % emojis.length];
    el.style.left = `${window.innerWidth / 2}px`;
    el.style.top = `${window.innerHeight / 2}px`;
    const angle = Math.random() * Math.PI * 2;
    const dist = 140 + Math.random() * 260;
    el.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
    el.style.setProperty('--dy', `${Math.sin(angle) * dist - 60}px`);
    el.style.setProperty('--rot', `${Math.random() * 120 - 60}deg`);
    el.style.animationDelay = `${Math.random() * 0.15}s`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1900);
  }
}

const dayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };

const QUOTES = [
  'Every expert was once a beginner. 🌱',
  'Progress, not perfection. 💗',
  'One problem a day keeps the interview nerves away. 🍓',
  "You don't have to be fast. You just have to keep going. 🐢✨",
  "Stuck is just the step before 'aha!' 💡",
  'Small steps every day add up to big wins. 🌸',
  "Be proud of how far you've come. 🎀",
  'Bugs are just puzzles in disguise. 🐞💕',
  'Future you is already grateful. 💌',
  'Soft heart, sharp algorithms. 🌷',
];
const quoteOfTheDay = () => QUOTES[Math.floor(Date.now() / 864e5) % QUOTES.length];

const STATUS = {
  todo: { icon: '○', label: 'To do' },
  attempted: { icon: '🌱', label: 'Attempted' },
  solved: { icon: '💖', label: 'Solved' },
  review: { icon: '🔁', label: 'Review again' },
};
const probProgress = (id) => state.progress.problems[id] || { status: 'todo', attempts: 0, notes: '' };
const statusOf = (id) => probProgress(id).status || 'todo';
const lessonDone = (id) => !!state.progress.lessons[id]?.done;

function topicTitle(topic) {
  const lesson = state.lessons.find((l) => l.id === topic);
  return lesson ? lesson.title : topic.replace(/^\d+-/, '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function topics() {
  const ids = new Set([...state.lessons.map((l) => l.id), ...state.problems.map((p) => p.topic)]);
  return [...ids].sort();
}

function topicStats(topic) {
  const ps = state.problems.filter((p) => p.topic === topic);
  return { total: ps.length, solved: ps.filter((p) => statusOf(p.id) === 'solved').length };
}

function stats() {
  const act = state.progress.activity;
  const solved = state.problems.filter((p) => statusOf(p.id) === 'solved').length;
  const active = (k) => { const a = act[k]; return a && (a.solved || a.runs || a.lessons); };
  let streak = 0;
  let d = new Date();
  if (!active(dayKey(d))) d = addDays(d, -1);
  while (active(dayKey(d))) { streak++; d = addDays(d, -1); }
  const todaySolved = act[dayKey()]?.solved || 0;
  let weekSolved = 0;
  const monday = addDays(new Date(), -((new Date().getDay() + 6) % 7));
  for (let i = 0; i < 7; i++) weekSolved += act[dayKey(addDays(monday, i))]?.solved || 0;
  return {
    solved, total: state.problems.length, streak, todaySolved, weekSolved, monday,
    lessonsDone: state.lessons.filter((l) => lessonDone(l.id)).length,
  };
}

// ---------- theme ----------
const theme = () => document.documentElement.dataset.theme || 'light';
function toggleTheme() {
  const next = theme() === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('leet:theme', next); } catch {}
  renderSidebar();
}

// ---------- sidebar ----------
const sideToggle = document.getElementById('side-toggle');
function setSideCollapsed(collapsed) {
  if (collapsed) document.documentElement.dataset.side = 'collapsed';
  else delete document.documentElement.dataset.side;
  const label = collapsed ? 'Expand sidebar' : 'Collapse sidebar';
  sideToggle.title = label;
  sideToggle.setAttribute('aria-label', label);
  try { localStorage.setItem('leet:side', collapsed ? 'collapsed' : 'open'); } catch {}
}
setSideCollapsed(document.documentElement.dataset.side === 'collapsed');
sideToggle.addEventListener('click', () => setSideCollapsed(document.documentElement.dataset.side !== 'collapsed'));

function renderSidebar() {
  const route = location.hash || '#/';
  const prevScroll = $side.querySelector('.roadmap')?.scrollTop || 0;
  const s = stats();
  const nav = [
    ['#/', '🏠', 'Home', `🔥 ${s.streak}`],
    ['#/lessons', '📚', 'Lessons', `${s.lessonsDone}/${state.lessons.length}`],
    ['#/practice', '💻', 'Practice', `${s.solved}/${s.total}`],
    ['#/goals', '🎯', 'Goals & Tracker', ''],
  ];
  const isActive = (href) => (href === '#/' ? route === '#/' || route === '#' : route.startsWith(href));
  $side.innerHTML = `
    <div class="row brand-row">
      <a class="brand" href="#/" title="Home"><span class="bow">🎀</span><span><b>Leet Study</b><small>DSA in JavaScript</small></span></a>
      <button class="theme-toggle" id="theme" title="Switch to ${theme() === 'dark' ? 'light' : 'dark'} mode">${theme() === 'dark' ? '☀️' : '🌙'}</button>
    </div>
    <nav class="nav">
      ${nav.map(([href, ico, label, count]) => `<a href="${href}" class="${isActive(href) ? 'active' : ''}" title="${label}"><span>${ico}</span><span class="label">${label}</span><span class="count">${count}</span></a>`).join('')}
      <a href="#" id="nav-cs" title="Cheat sheet (Ctrl+/)"><span>📝</span><span class="label">Cheat sheet</span><span class="count"><kbd>Ctrl</kbd>+<kbd>/</kbd></span></a>
    </nav>
    <div class="roadmap-wrap">
      <div class="side-title">Roadmap</div>
      <div class="roadmap">
        ${state.lessons.map((l) => {
          const t = topicStats(l.id);
          const active = route === `#/lessons/${l.id}` || route.startsWith(`#/practice/${l.id}/`);
          return `<a href="#/lessons/${l.id}" class="${active ? 'active' : ''}">
            <span class="dot">${lessonDone(l.id) ? '💗' : String(l.number).padStart(2, '0')}</span>
            <span title="${esc(l.title)}">${esc(l.title)}</span>
            ${t.total ? `<span class="mini">${t.solved}/${t.total}</span>` : ''}
          </a>`;
        }).join('')}
      </div>
    </div>
    ${STATIC
      ? `<div class="row sync-btn backup-row">
          <button class="btn small" id="backup" title="Download your code, notes and progress as a file">⬇️<span class="label"> Backup</span></button>
          <button class="btn small" id="restore" title="Load a backup file (or data/progress.json from the repo)">⬆️<span class="label"> Restore</span></button>
          <input type="file" id="restore-file" accept=".json,application/json" hidden>
        </div>`
      : '<button class="btn sync-btn" id="sync" title="Commit & push your solutions, notes and progress">☁️<span class="label"> Save to GitHub</span></button>'}
`;
  // keep the roadmap where it was, but make sure the current lesson is visible
  const roadmap = $side.querySelector('.roadmap');
  roadmap.scrollTop = prevScroll;
  const active = roadmap.querySelector('a.active');
  if (active) {
    const top = active.offsetTop, bottom = top + active.offsetHeight;
    if (top < roadmap.scrollTop) roadmap.scrollTop = top - 8;
    else if (bottom > roadmap.scrollTop + roadmap.clientHeight) roadmap.scrollTop = bottom - roadmap.clientHeight + 24;
  }
  if (STATIC) wireBackup();
  else document.getElementById('sync').addEventListener('click', syncToGitHub);
  document.getElementById('theme').addEventListener('click', toggleTheme);
  document.getElementById('nav-cs').addEventListener('click', (e) => { e.preventDefault(); toggleCheatsheet(); });
}

function wireBackup() {
  document.getElementById('backup').addEventListener('click', async () => {
    if (current?.dirty && current.save) await current.save();
    (await staticBackend()).exportBackup();
    toast('Backup downloaded 💾');
  });
  const file = document.getElementById('restore-file');
  document.getElementById('restore').addEventListener('click', () => file.click());
  file.addEventListener('change', async () => {
    const f = file.files[0];
    if (!f) return;
    if (!confirm(`Replace the work saved in this browser with "${f.name}"?`)) { file.value = ''; return; }
    try {
      await (await staticBackend()).importBackup(await f.text());
      current = null; // don't let the unsaved-code guard block the reload
      toast('Restored 🌸');
      setTimeout(() => location.reload(), 600);
    } catch (err) {
      toast('🥺 ' + err.message);
    }
    file.value = '';
  });
}

async function syncToGitHub(e) {
  const btn = e.currentTarget;
  if (current?.dirty && current.save) await current.save();
  btn.disabled = true;
  btn.textContent = '⏳ Saving…';
  try {
    const r = await api('sync', { method: 'POST' });
    toast(r.message);
    if (!r.ok) console.warn(r.message);
  } catch (err) {
    toast('Error: ' + err.message);
  } finally {
    btn.disabled = false;
    btn.textContent = '☁️ Save to GitHub';
  }
}

// ---------- shared widgets ----------
function ring(value, max, label) {
  const r = 50;
  const c = 2 * Math.PI * r;
  const pct = max ? Math.min(value / max, 1) : 0;
  return `<div class="ring">
    <svg width="120" height="120" viewBox="0 0 120 120">
      <defs><linearGradient id="rg" x1="0" x2="1"><stop offset="0" style="stop-color:var(--pink-300)"/><stop offset="1" style="stop-color:var(--pink-500)"/></linearGradient></defs>
      <circle cx="60" cy="60" r="${r}" fill="none" style="stroke:var(--pink-100)" stroke-width="12"/>
      <circle cx="60" cy="60" r="${r}" fill="none" stroke="url(#rg)" stroke-width="12" stroke-linecap="round"
        stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - pct)}" style="transition: stroke-dashoffset .8s"/>
    </svg>
    <div class="center"><div><b>${value}/${max}</b><small>${label}</small></div></div>
  </div>`;
}

function heatmap(weeks = 20) {
  weeks -= 1;
  const act = state.progress.activity;
  const today = new Date();
  const start = addDays(today, -(weeks * 7 - 1) - today.getDay()); // align to Sunday
  let html = '<div class="heatmap">';
  for (let w = 0; w <= weeks; w++) {
    html += '<div class="col">';
    for (let d = 0; d < 7; d++) {
      const date = addDays(start, w * 7 + d);
      const k = dayKey(date);
      if (date > today) { html += '<div class="cell future"></div>'; continue; }
      const a = act[k] || {};
      const score = (a.solved || 0) * 2 + (a.lessons || 0) * 2 + (a.runs ? 1 : 0);
      const lvl = score === 0 ? 0 : score <= 1 ? 1 : score <= 3 ? 2 : score <= 6 ? 3 : 4;
      const tip = `${k}: ${a.solved || 0} solved, ${a.lessons || 0} lessons, ${a.runs || 0} test runs`;
      html += `<div class="cell l${lvl} ${k === dayKey() ? 'today' : ''}" title="${tip}"></div>`;
    }
    html += '</div>';
  }
  html += '</div><div class="legend">less <span class="cell"></span><span class="cell l1"></span><span class="cell l2"></span><span class="cell l3"></span><span class="cell l4"></span> more</div>';
  return html;
}

function weekBars(s) {
  const act = state.progress.activity;
  const goal = Number(state.progress.goals.dailyProblems) || 1;
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const vals = days.map((_, i) => act[dayKey(addDays(s.monday, i))]?.solved || 0);
  const max = Math.max(goal, ...vals);
  return `<div class="week">${days.map((name, i) => {
    const k = dayKey(addDays(s.monday, i));
    return `<div class="bar ${vals[i] >= goal ? 'hit' : ''} ${k === dayKey() ? 'is-today' : ''}" title="${vals[i]} solved">
      <b>${vals[i] || ''}</b><span style="height:${(vals[i] / max) * 80}%"></span>${name}</div>`;
  }).join('')}</div>`;
}

function problemRow(p) {
  const pr = probProgress(p.id);
  const st = pr.status || 'todo';
  return `<a class="prow" href="#/practice/${p.id}">
    <span class="ic" title="${STATUS[st].label}">${STATUS[st].icon}</span>
    <span class="title">${pr.starred ? '⭐ ' : ''}${esc(p.title)}</span>
    <span class="pill ${p.difficulty}">${p.difficulty}</span>
    <span class="st status ${st}">${STATUS[st].label}</span>
    <span class="att">${pr.attempts ? `${pr.attempts} run${pr.attempts > 1 ? 's' : ''}` : ''}</span>
  </a>`;
}

// ---------- views ----------
function viewHome() {
  const s = stats();
  const g = state.progress.goals;
  const name = state.progress.name;
  const hour = new Date().getHours();
  const hello = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const nextLesson = state.lessons.find((l) => !lessonDone(l.id));
  const nextProblems = state.problems.filter((p) => statusOf(p.id) !== 'solved').slice(0, 3);
  const review = state.problems.filter((p) => statusOf(p.id) === 'review').slice(0, 3);
  const daysLeft = g.targetDate ? Math.ceil((new Date(g.targetDate + 'T00:00') - new Date(dayKey() + 'T00:00')) / 864e5) : null;
  const dailyGoal = Number(g.dailyProblems) || 0;

  let cheer = "Let's learn something lovely today.";
  if (dailyGoal && s.todaySolved >= dailyGoal) cheer = "Daily goal complete! You're amazing 💖";
  else if (s.todaySolved > 0) cheer = `${dailyGoal - s.todaySolved} more to hit today's goal — you've got this!`;
  else if (s.streak > 0) cheer = `You're on a ${s.streak}-day streak. Keep it glowing ✨`;

  return `
    <section class="hero">
      <span class="floaty" style="right:40px;top:18px">🌸</span>
      <span class="floaty" style="right:110px;top:70px;animation-delay:1.5s;font-size:22px">💗</span>
      <span class="floaty" style="right:30px;bottom:14px;animation-delay:3s;font-size:24px">🎀</span>
      <h1>${hello}${name ? `, ${esc(name)}` : ''}! 🌷</h1>
      <p>${cheer}</p>
      <div class="quote">“${esc(quoteOfTheDay())}”</div>
    </section>

    <div class="grid stats">
      <div class="card stat"><div class="ico">🔥</div><div><div class="num">${s.streak}</div><div class="lbl">day streak</div></div></div>
      <div class="card stat"><div class="ico">💖</div><div><div class="num">${s.solved}<span class="faint" style="font-size:16px">/${s.total}</span></div><div class="lbl">problems solved</div></div></div>
      <div class="card stat"><div class="ico">📚</div><div><div class="num">${s.lessonsDone}<span class="faint" style="font-size:16px">/${state.lessons.length}</span></div><div class="lbl">lessons done</div></div></div>
      <div class="card stat"><div class="ico">🗓️</div><div><div class="num">${daysLeft == null ? '—' : daysLeft}</div><div class="lbl">${daysLeft == null ? '<a href="#/goals">set a target date</a>' : `days to ${esc(g.targetLabel || 'goal')}`}</div></div></div>
    </div>

    <div class="grid home-grid">
      <div class="grid">
        <div class="card">
          <h3>✨ Up next</h3>
          <div class="up-next">
            ${nextLesson ? `<a class="next-item" href="#/lessons/${nextLesson.id}"><span class="emoji">📖</span><span><b>${esc(nextLesson.title)}</b><small>Lesson ${nextLesson.number}</small></span><span class="go">→</span></a>` : ''}
            ${nextProblems.map((p) => `<a class="next-item" href="#/practice/${p.id}"><span class="emoji">${STATUS[statusOf(p.id)].icon === '○' ? '💻' : STATUS[statusOf(p.id)].icon}</span><span><b>${esc(p.title)}</b><small>${esc(topicTitle(p.topic))} · ${p.difficulty}</small></span><span class="go">→</span></a>`).join('')}
            ${!nextLesson && !nextProblems.length ? '<div class="empty"><div class="big">🏆</div>Everything done! Add your own problems with <code>npm run new</code>.</div>' : ''}
          </div>
        </div>
        ${review.length ? `<div class="card"><h3>🔁 Marked for review</h3><div class="up-next">${review.map((p) => `<a class="next-item" href="#/practice/${p.id}"><span class="emoji">🔁</span><span><b>${esc(p.title)}</b><small>${esc(topicTitle(p.topic))}</small></span><span class="go">→</span></a>`).join('')}</div></div>` : ''}
        <div class="card">
          <h3>🌸 Activity</h3>
          ${heatmap()}
        </div>
      </div>
      <div class="grid">
        <div class="card">
          <h3>🎯 Today</h3>
          <div class="row" style="gap:20px">
            ${ring(s.todaySolved, dailyGoal || 1, 'solved today')}
            <div>
              <div class="muted" style="font-size:14px">This week</div>
              <div style="font-family:var(--font-head);font-size:22px;font-weight:700">${s.weekSolved} / ${g.weeklyProblems || 0}</div>
              <div class="progress" style="width:140px;margin-top:6px"><span style="width:${Math.min(100, (s.weekSolved / (g.weeklyProblems || 1)) * 100)}%"></span></div>
              <a class="btn small" style="margin-top:12px" href="#/goals">Edit goals</a>
            </div>
          </div>
          ${weekBars(s)}
        </div>
        <div class="card">
          <h3>🗺️ Topics</h3>
          <div class="topic-bars">
            ${topics().filter((t) => topicStats(t).total).map((t) => {
              const ts = topicStats(t);
              return `<a class="topic-bar" href="#/lessons/${t}"><span class="t">${lessonDone(t) ? '💗 ' : ''}${esc(topicTitle(t))}</span><span class="n">${ts.solved}/${ts.total}</span><div class="progress"><span style="width:${ts.total ? (ts.solved / ts.total) * 100 : 0}%"></span></div></a>`;
            }).join('')}
          </div>
        </div>
      </div>
    </div>`;
}

function viewLessons() {
  return `
    <div class="page-head"><div><h1>📚 Lessons</h1><p>Work through them in order — each one builds on the last. Then practice that topic.</p></div></div>
    <div class="grid lesson-grid">
      ${state.lessons.map((l) => {
        const t = topicStats(l.id);
        const done = lessonDone(l.id);
        return `<a class="card lesson-card ${done ? 'done' : ''}" href="#/lessons/${l.id}">
          ${done ? '<span class="done-badge">💗</span>' : ''}
          <span class="num">LESSON ${String(l.number).padStart(2, '0')}</span>
          <h3>${esc(l.title)}</h3>
          ${t.total ? `<div class="row muted" style="font-size:13px"><span>${t.solved}/${t.total} practice solved</span></div><div class="progress"><span style="width:${(t.solved / t.total) * 100}%"></span></div>` : '<div class="muted" style="font-size:13px">Reading lesson</div>'}
        </a>`;
      }).join('')}
    </div>`;
}

async function viewLesson(id) {
  const { markdown } = await api(`lessons/${encodeURIComponent(id)}`);
  const idx = state.lessons.findIndex((l) => l.id === id);
  const lesson = state.lessons[idx];
  const prev = state.lessons[idx - 1];
  const next = state.lessons[idx + 1];
  const probs = state.problems.filter((p) => p.topic === id);
  const done = lessonDone(id);
  const html = renderMarkdown(markdown);
  const toc = [...markdown.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1]);
  const slug = (s) => s.toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, '');

  setTimeout(() => {
    // persist "Before moving on" checkboxes per lesson in this browser
    document.querySelectorAll('.md li.task input').forEach((cb, i) => {
      const key = `leet:lesson:${id}:${i}`;
      try { if (localStorage.getItem(key) === '1') cb.checked = true; } catch {}
      cb.addEventListener('change', () => { try { localStorage.setItem(key, cb.checked ? '1' : '0'); } catch {} });
    });
    document.getElementById('lesson-done')?.addEventListener('click', async () => {
      const nowDone = !lessonDone(id);
      await saveProgress('lesson', id, { done: nowDone });
      if (nowDone) { celebrate(); toast('Lesson complete! 💗'); }
      route();
    });
    document.querySelectorAll('.toc a').forEach((a) => a.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById(a.dataset.target)?.scrollIntoView({ behavior: 'smooth' });
    }));
  });

  return `
    <div class="lesson-layout">
      <article>
        <div class="row" style="margin-bottom:14px">
          <a class="btn ghost small" href="#/lessons">← All lessons</a>
          <span class="faint">Lesson ${lesson?.number ?? ''} of ${state.lessons.length}</span>
        </div>
        <div class="card md">${html}</div>
        <div class="pager">
          ${prev ? `<a class="btn" href="#/lessons/${prev.id}">← ${esc(prev.title)}</a>` : '<span></span>'}
          ${next ? `<a class="btn" href="#/lessons/${next.id}">${esc(next.title)} →</a>` : '<span></span>'}
        </div>
      </article>
      <aside class="lesson-aside">
        <button id="lesson-done" class="btn ${done ? '' : 'primary'}" style="justify-content:center">${done ? '💗 Completed — undo?' : '✓ Mark lesson complete'}</button>
        ${probs.length ? `<div class="card"><h3>💻 Practice</h3><div class="mini-list">${probs.map((p) => `<a href="#/practice/${p.id}"><span>${STATUS[statusOf(p.id)].icon}</span>${esc(p.title)}<span class="pill ${p.difficulty}">${p.difficulty[0]}</span></a>`).join('')}</div></div>` : ''}
        ${toc.length ? `<div class="card toc"><h3>🌷 On this page</h3>${toc.map((t) => `<a href="#" data-target="${slug(t)}">${esc(t.replace(/[`*]/g, ''))}</a>`).join('')}</div>` : ''}
      </aside>
    </div>`;
}

const practiceFilters = { q: '', difficulty: '', status: '', topic: '' };

function viewPractice() {
  const f = practiceFilters;
  const match = (p) =>
    (!f.q || `${p.title} ${p.tags.join(' ')}`.toLowerCase().includes(f.q.toLowerCase())) &&
    (!f.difficulty || p.difficulty === f.difficulty) &&
    (!f.status || (f.status === 'starred' ? probProgress(p.id).starred : statusOf(p.id) === f.status)) &&
    (!f.topic || p.topic === f.topic);
  const list = state.problems.filter(match);
  const s = stats();

  setTimeout(() => {
    const search = document.getElementById('q');
    search.addEventListener('input', () => { f.q = search.value; rerenderList(); });
    document.getElementById('topic').addEventListener('change', (e) => { f.topic = e.target.value; rerenderList(); });
    document.querySelectorAll('[data-filter]').forEach((chip) => chip.addEventListener('click', () => {
      const key = chip.dataset.filter;
      f[key] = f[key] === chip.dataset.value ? '' : chip.dataset.value;
      route();
    }));
  });

  const chip = (key, value, label) => `<button class="chip ${practiceFilters[key] === value ? 'on' : ''}" data-filter="${key}" data-value="${value}">${label}</button>`;
  return `
    <div class="page-head">
      <div><h1>💻 Practice</h1><p>${s.solved} of ${s.total} solved. Open a problem, write your solution, run the tests. 🌸</p></div>
    </div>
    <div class="filters">
      <input type="search" id="q" placeholder="🔍 Search problems or tags…" value="${esc(f.q)}">
      <select id="topic"><option value="">All topics</option>${topics().filter((t) => topicStats(t).total).map((t) => `<option value="${t}" ${f.topic === t ? 'selected' : ''}>${esc(topicTitle(t))}</option>`).join('')}</select>
      <div class="chips">${chip('difficulty', 'Easy', 'Easy')}${chip('difficulty', 'Medium', 'Medium')}${chip('difficulty', 'Hard', 'Hard')}</div>
      <div class="chips">${chip('status', 'todo', '○ To do')}${chip('status', 'attempted', '🌱 Attempted')}${chip('status', 'solved', '💖 Solved')}${chip('status', 'review', '🔁 Review')}${chip('status', 'starred', '⭐ Starred')}</div>
    </div>
    <div id="plist">${practiceList(list)}</div>`;

  function rerenderList() {
    document.getElementById('plist').innerHTML = practiceList(state.problems.filter(match));
  }
}

function practiceList(list) {
  if (!list.length) return '<div class="empty"><div class="big">🔍</div>No problems match those filters.</div>';
  const groups = {};
  for (const p of list) (groups[p.topic] ||= []).push(p);
  return Object.entries(groups).map(([topic, ps]) => {
    const ts = topicStats(topic);
    return `<div class="topic-group">
      <h2><a href="#/lessons/${topic}">${esc(topicTitle(topic))}</a><span class="n">${ts.solved}/${ts.total}</span></h2>
      <div class="plist">${ps.map(problemRow).join('')}</div>
    </div>`;
  }).join('');
}

// problem page keeps some module-level state so "save / run" and focus-reload can find it
let current = null;

async function viewProblem(id) {
  const p = await api(`problems/${id}`);
  const pr = probProgress(id);
  current = { id, dirty: false, savedCode: p.code, tab: 'problem' };
  const idx = state.problems.findIndex((x) => x.id === id);
  const next = state.problems[idx + 1];
  const st = pr.status || 'todo';

  setTimeout(() => wireProblem(p), 0);

  return `
    <div class="problem-head">
      <a class="btn ghost small" href="#/practice">←</a>
      <h1>${esc(p.title)}</h1>
      <span class="pill ${p.difficulty}">${p.difficulty}</span>
      ${p.tags.map((t) => `<span class="pill tag">${esc(t)}</span>`).join('')}
      <button class="star ${pr.starred ? 'on' : ''}" id="star" title="Star this problem">⭐</button>
      <span class="spacer"></span>
      <select id="status" title="Status">${Object.entries(STATUS).map(([k, v]) => `<option value="${k}" ${k === st ? 'selected' : ''}>${v.icon} ${v.label}</option>`).join('')}</select>
      <a class="btn small" href="#/lessons/${p.topic}">📖 Lesson</a>
      ${p.leetcode ? `<a class="btn small" href="${esc(p.leetcode)}" target="_blank" rel="noopener">LeetCode ↗</a>` : ''}
      ${next ? `<a class="btn small" href="#/practice/${next.id}" title="${esc(next.title)}">Next →</a>` : ''}
    </div>
    <div class="split">
      <div class="panel">
        <div class="tabs">
          <button data-tab="problem" class="on">📖 Problem</button>
          <button data-tab="notes">📝 Notes</button>
          <button data-tab="solution">💡 Solution</button>
        </div>
        <div class="panel-body" id="tab-body"></div>
      </div>
      <div class="panel" id="editor-panel">
        <div class="editor-bar">
          <button class="btn primary small" id="run">▶ Run tests</button>
          <button class="btn small" id="save">💾 Save <span class="dirty-dot"></span></button>
          ${STATIC ? '' : `<button class="btn small" id="open" title="Open solution.js in your editor">✏️ Open in editor</button>
          <button class="btn ghost small" id="reload" title="Reload from disk">↻</button>`}
          <span class="path" title="${esc(p.file)}">${esc(p.slug)}/solution.js</span>
        </div>
        <div class="editor">
          <pre class="gutter" id="gutter">1</pre>
          <textarea id="code" spellcheck="false" autocapitalize="off" autocomplete="off"></textarea>
        </div>
        <div class="kbd-hint"><kbd>Ctrl</kbd>+<kbd>Enter</kbd> run · <kbd>Ctrl</kbd>+<kbd>S</kbd> save · ${STATIC ? 'your code is saved in this browser (use ⬇️ Backup to keep a copy)' : 'edits here and in your editor both work (it reloads when you come back)'}</div>
        <div id="results"></div>
      </div>
    </div>`;
}

function wireProblem(p) {
  const id = p.id;
  const code = document.getElementById('code');
  const gutter = document.getElementById('gutter');
  const panel = document.getElementById('editor-panel');
  const tabBody = document.getElementById('tab-body');
  code.value = p.code;

  const updateGutter = () => {
    const n = code.value.split('\n').length;
    gutter.textContent = Array.from({ length: n }, (_, i) => i + 1).join('\n');
    gutter.scrollTop = code.scrollTop;
  };
  const setDirty = (d) => { current.dirty = d; panel.classList.toggle('dirty', d); };
  updateGutter();

  code.addEventListener('input', () => { updateGutter(); setDirty(code.value !== current.savedCode); });
  code.addEventListener('scroll', () => { gutter.scrollTop = code.scrollTop; });
  code.addEventListener('keydown', (e) => {
    const { selectionStart: s, selectionEnd: end, value } = code;
    if (e.key === 'Tab') {
      e.preventDefault();
      if (e.shiftKey) {
        const lineStart = value.lastIndexOf('\n', s - 1) + 1;
        if (value.slice(lineStart, lineStart + 2) === '  ') {
          code.setRangeText('', lineStart, lineStart + 2, 'preserve');
        }
      } else {
        code.setRangeText('  ', s, end, 'end');
      }
      code.dispatchEvent(new Event('input'));
    } else if (e.key === 'Enter' && !e.ctrlKey && !e.metaKey) {
      // keep indentation (+2 after an opening brace)
      e.preventDefault();
      const lineStart = value.lastIndexOf('\n', s - 1) + 1;
      const indent = value.slice(lineStart).match(/^\s*/)[0];
      const extra = /[{[(]\s*$/.test(value.slice(lineStart, s)) ? '  ' : '';
      code.setRangeText('\n' + indent + extra, s, end, 'end');
      code.dispatchEvent(new Event('input'));
    }
  });

  async function save() {
    await api(`problems/${id}/code`, { method: 'PUT', body: { code: code.value } });
    current.savedCode = code.value;
    setDirty(false);
  }

  async function run() {
    const btn = document.getElementById('run');
    btn.disabled = true;
    btn.textContent = '⏳ Running…';
    try {
      if (current.dirty) await save();
      const r = await api(`problems/${id}/run`, { method: 'POST' });
      state.progress.problems[id] = r.problem;
      await refresh();
      renderSidebar();
      document.getElementById('status').value = r.problem.status;
      renderResults(r);
      if (r.newlySolved) { celebrate(); toast('Solved! So proud of you 💖'); }
      else if (r.ok) toast('All tests pass ✨');
    } catch (err) {
      toast('Error: ' + err.message);
    } finally {
      btn.disabled = false;
      btn.textContent = '▶ Run tests';
    }
  }

  async function reload(quiet) {
    const fresh = await api(`problems/${id}`);
    if (fresh.code !== code.value) {
      code.value = fresh.code;
      current.savedCode = fresh.code;
      setDirty(false);
      updateGutter();
      if (!quiet) toast('Reloaded from disk');
    } else if (!quiet) toast('Already up to date');
  }
  current.reload = reload;
  current.save = save;

  document.getElementById('run').addEventListener('click', run);
  document.getElementById('save').addEventListener('click', async () => { await save(); toast('Saved 💾'); });
  if (!STATIC) {
    document.getElementById('reload').addEventListener('click', () => reload(false));
    document.getElementById('open').addEventListener('click', async () => {
      const r = await api(`problems/${id}/open`, { method: 'POST' });
      toast(`Opening in ${r.opened}…`);
    });
  }
  code.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); run(); }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') { e.preventDefault(); save().then(() => toast('Saved 💾')); }
  });

  document.getElementById('status').addEventListener('change', async (e) => {
    await saveProgress('problem', id, { status: e.target.value });
    if (e.target.value === 'solved') celebrate();
  });
  document.getElementById('star').addEventListener('click', async (e) => {
    const on = !probProgress(id).starred;
    await saveProgress('problem', id, { starred: on });
    e.currentTarget.classList.toggle('on', on);
  });

  // tabs
  let referenceShown = false;
  const showTab = async (tab) => {
    current.tab = tab;
    document.querySelectorAll('.tabs button').forEach((b) => b.classList.toggle('on', b.dataset.tab === tab));
    if (tab === 'problem') {
      tabBody.innerHTML = `<div class="md">${renderMarkdown(p.readme)}</div>`;
      wireCopyButtons(tabBody);
    } else if (tab === 'notes') {
      tabBody.innerHTML = `<p class="muted" style="margin-top:0">Your notes for this problem — the key insight, mistakes you made, the pattern. Saved automatically. 💌</p>
        <textarea class="notes" id="notes" placeholder="e.g. Hash map of value → index. Check for the complement BEFORE inserting.">${esc(probProgress(id).notes || '')}</textarea>`;
      const notes = document.getElementById('notes');
      let t;
      notes.addEventListener('input', () => {
        clearTimeout(t);
        t = setTimeout(() => saveProgress('problem', id, { notes: notes.value }).then(() => toast('Notes saved 📝')), 700);
      });
    } else if (tab === 'solution') {
      if (!p.hasReference) {
        tabBody.innerHTML = '<div class="reveal"><div class="big">🤷</div><p>No reference solution for this one.</p></div>';
      } else if (!referenceShown && statusOf(id) !== 'solved') {
        tabBody.innerHTML = `<div class="reveal"><div class="big">🙈</div>
          <h3>Try it yourself first!</h3>
          <p class="muted">Struggling is where the learning happens. Did you check the hints in the problem tab?</p>
          <button class="btn" id="peek">I've really tried — show me 💡</button></div>`;
        document.getElementById('peek').addEventListener('click', () => { referenceShown = true; showTab('solution'); });
      } else {
        const { code: ref } = await api(`problems/${id}/reference`);
        tabBody.innerHTML = `<div class="codeblock"><button class="copy">copy</button><pre class="code-view"><code>${highlightJs(ref)}</code></pre></div>`;
        wireCopyButtons(tabBody);
      }
    }
  };
  document.querySelectorAll('.tabs button').forEach((b) => b.addEventListener('click', () => showTab(b.dataset.tab)));
  showTab('problem');
}

function renderResults(r) {
  const el = document.getElementById('results');
  if (!el) return;
  const pass = r.ok;
  const failedFirst = [...r.results].sort((a, b) => a.pass - b.pass);
  el.innerHTML = `<div class="results">
    <div class="results-head ${pass ? 'pass' : 'fail'}">${pass ? '💖 All tests passed!' : '🥺 Not quite yet'}<span class="spacer"></span>${r.passed ?? 0}/${r.total ?? 0}</div>
    ${r.loadError ? `<div class="load-error">${esc(r.loadError)}</div>` : ''}
    <div class="results-list">
      ${failedFirst.map((c) => `<details class="case" ${!c.pass && c === failedFirst[0] ? 'open' : ''}>
        <summary>${c.pass ? '✅' : '❌'} ${esc(c.name)}<span class="ms">${c.ms != null ? c.ms + ' ms' : ''}</span></summary>
        <dl><dt>input</dt><dd>${esc(c.input)}</dd><dt>expected</dt><dd>${esc(c.expected)}</dd>
        ${c.error ? `<dt>error</dt><dd class="err">${esc(c.error)}</dd>` : `<dt>got</dt><dd>${esc(c.actual)}</dd>`}</dl>
      </details>`).join('')}
    </div>
    ${r.logs && r.logs.length ? `<pre class="logs"><b>console.log output</b>\n${esc(r.logs.join('\n'))}</pre>` : ''}
  </div>`;
}

function wireCopyButtons(root = document) {
  root.querySelectorAll('.codeblock .copy').forEach((btn) => {
    btn.onclick = () => {
      navigator.clipboard.writeText(btn.parentElement.querySelector('code').textContent);
      btn.textContent = 'copied!';
      setTimeout(() => (btn.textContent = 'copy'), 1200);
    };
  });
}

function viewGoals() {
  const g = state.progress.goals;
  const s = stats();
  const daysLeft = g.targetDate ? Math.ceil((new Date(g.targetDate + 'T00:00') - new Date(dayKey() + 'T00:00')) / 864e5) : null;
  const remaining = s.total - s.solved;
  const perDay = daysLeft > 0 ? (remaining / daysLeft).toFixed(1) : null;
  const act = state.progress.activity;
  const activeDays = Object.values(act).filter((a) => a.solved || a.runs || a.lessons).length;
  const totalRuns = Object.values(act).reduce((n, a) => n + (a.runs || 0), 0);
  const byDiff = ['Easy', 'Medium', 'Hard'].map((d) => {
    const ps = state.problems.filter((p) => p.difficulty === d);
    return { d, total: ps.length, solved: ps.filter((p) => statusOf(p.id) === 'solved').length };
  });

  setTimeout(() => {
    const bind = (idAttr, key, transform = (v) => v) => {
      document.getElementById(idAttr).addEventListener('change', async (e) => {
        await saveProgress('goals', null, { [key]: transform(e.target.value) });
        toast('Saved 🎯');
        route();
      });
    };
    bind('g-daily', 'dailyProblems', Number);
    bind('g-weekly', 'weeklyProblems', Number);
    bind('g-date', 'targetDate');
    bind('g-label', 'targetLabel');
    document.getElementById('g-name').addEventListener('change', async (e) => {
      await saveProgress('profile', null, { name: e.target.value.trim() });
      toast(`Hi ${e.target.value.trim() || 'there'}! 🌸`);
    });
    const customs = () => state.progress.goals.custom || [];
    document.getElementById('goal-add').addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = e.target.querySelector('input');
      if (!input.value.trim()) return;
      await saveProgress('goals', null, { custom: [...customs(), { id: Date.now().toString(36), text: input.value.trim(), done: false }] });
      route();
    });
    document.querySelectorAll('.goal-item').forEach((item) => {
      const gid = item.dataset.id;
      item.querySelector('input').addEventListener('change', async (e) => {
        await saveProgress('goals', null, { custom: customs().map((c) => (c.id === gid ? { ...c, done: e.target.checked } : c)) });
        if (e.target.checked) { celebrate(); toast('Goal achieved! 🏆'); }
        route();
      });
      item.querySelector('.x').addEventListener('click', async () => {
        await saveProgress('goals', null, { custom: customs().filter((c) => c.id !== gid) });
        route();
      });
    });
  });

  return `
    <div class="page-head"><div><h1>🎯 Goals & Tracker</h1><p>Set gentle, consistent goals. Consistency beats intensity. 🐢💕</p></div></div>
    <div class="grid goals-grid">
      <div class="card">
        <h3>🌷 Your targets</h3>
        <div class="field"><label>Your name (for the greeting)</label><input type="text" id="g-name" value="${esc(state.progress.name)}" placeholder="e.g. Kim"></div>
        <div class="row" style="gap:14px;align-items:flex-start">
          <div class="field" style="flex:1"><label>Problems per day</label><input type="number" min="0" max="50" id="g-daily" value="${esc(g.dailyProblems)}"></div>
          <div class="field" style="flex:1"><label>Problems per week</label><input type="number" min="0" max="200" id="g-weekly" value="${esc(g.weeklyProblems)}"></div>
        </div>
        <div class="field"><label>Big goal</label><input type="text" id="g-label" value="${esc(g.targetLabel)}" placeholder="e.g. Google onsite 💼"></div>
        <div class="field"><label>Target date</label><input type="date" id="g-date" value="${esc(g.targetDate)}"></div>
      </div>

      <div class="card">
        <h3>⏳ Countdown</h3>
        ${daysLeft == null
          ? '<p class="muted">Pick a target date and I’ll count down with you. 🗓️</p>'
          : `<div class="countdown">${daysLeft}</div><p class="muted" style="margin-top:6px">day${daysLeft === 1 ? '' : 's'} until <b>${esc(g.targetLabel)}</b>${daysLeft < 0 ? ' (passed — set a new one?)' : ''}</p>
             ${perDay ? `<p>${remaining} problems left → about <b>${perDay}/day</b> to finish everything. ${Number(perDay) <= (g.dailyProblems || 0) ? 'Your daily goal covers it! 💪' : 'Maybe bump your daily goal a little? 🌱'}</p>` : ''}`}
        <h3 style="margin-top:18px">📊 Stats</h3>
        <div class="topic-bars">
          ${byDiff.map((x) => `<div class="topic-bar"><span class="t"><span class="pill ${x.d}">${x.d}</span></span><span class="n">${x.solved}/${x.total}</span><div class="progress"><span style="width:${x.total ? (x.solved / x.total) * 100 : 0}%"></span></div></div>`).join('')}
        </div>
        <p class="muted" style="font-size:14px;margin-bottom:0">🔥 ${s.streak}-day streak · 🗓️ ${activeDays} active day${activeDays === 1 ? '' : 's'} · ▶ ${totalRuns} test runs · 📚 ${s.lessonsDone} lessons</p>
      </div>

      <div class="card">
        <h3>✅ My goals</h3>
        <div class="goal-list">
          ${(g.custom || []).map((c) => `<label class="goal-item ${c.done ? 'done' : ''}" data-id="${c.id}"><input type="checkbox" ${c.done ? 'checked' : ''}><span>${esc(c.text)}</span><button class="x" title="Remove">×</button></label>`).join('') || '<p class="muted" style="margin:0">Add milestones like “Finish all Easy problems” or “Do 3 mock interviews”. 🎀</p>'}
        </div>
        <form id="goal-add" class="row"><input type="text" placeholder="New goal…" style="flex:1"><button class="btn primary small">Add</button></form>
      </div>

      <div class="card" style="grid-column:1/-1">
        <h3>🌸 Activity (last 40 weeks)</h3>
        ${heatmap(40)}
      </div>
    </div>`;
}

// ---------- router ----------
async function route() {
  const hash = location.hash || '#/';
  const parts = hash.slice(2).split('/').filter(Boolean).map(decodeURIComponent);
  if (!parts.length || parts[0] !== 'practice' || parts.length < 3) current = null;
  renderSidebar();
  try {
    let html;
    if (!parts.length) html = viewHome();
    else if (parts[0] === 'lessons' && parts[1]) html = await viewLesson(parts[1]);
    else if (parts[0] === 'lessons') html = viewLessons();
    else if (parts[0] === 'practice' && parts.length >= 3) html = await viewProblem(`${parts[1]}/${parts[2]}`);
    else if (parts[0] === 'practice') html = viewPractice();
    else if (parts[0] === 'goals') html = viewGoals();
    else html = '<div class="empty"><div class="big">🌸</div>Page not found. <a href="#/">Go home</a></div>';
    $main.innerHTML = html;
    wireCopyButtons($main);
  } catch (err) {
    $main.innerHTML = `<div class="empty"><div class="big">🥺</div>${esc(err.message)}<br><a href="#/">Go home</a></div>`;
  }
}

let lastHash = location.hash;
window.addEventListener('hashchange', () => {
  if (current?.dirty && !confirm('You have unsaved code. Leave anyway?')) {
    history.replaceState(null, '', lastHash);
    return;
  }
  lastHash = location.hash;
  window.scrollTo(0, 0);
  route();
});
window.addEventListener('beforeunload', (e) => { if (current?.dirty) e.preventDefault(); });
window.addEventListener('focus', async () => {
  // pick up changes made in your editor / terminal (npm test) while you were away
  await refresh();
  renderSidebar();
  if (current && !current.dirty) current.reload?.(true);
});

initCheatsheet();
refresh().then(route).catch((err) => {
  $main.innerHTML = STATIC
    ? `<div class="empty"><div class="big">🥺</div>Couldn't load the study content.<br><small>${esc(err.message)}</small></div>`
    : `<div class="empty"><div class="big">🥺</div>Couldn't reach the study server.<br>Is <code>npm start</code> running?<br><small>${esc(err.message)}</small></div>`;
});
