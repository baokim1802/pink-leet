// Discovers lessons and practice problems on disk.
//
//   lessons/02-arrays-hashing.md
//   practice/02-arrays-hashing/two-sum/{README.md, meta.json, solution.js, tests.js, reference.js}
//
// A practice topic folder has the same name as its lesson file, which is how they link up.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const LESSONS_DIR = path.join(ROOT, 'lessons');
const PRACTICE_DIR = path.join(ROOT, 'practice');
const CHEATSHEETS_DIR = path.join(ROOT, 'cheatsheets');
const DIFFICULTY_ORDER = { Easy: 0, Medium: 1, Hard: 2 };

function titleFromMarkdown(md, fallback) {
  const m = md.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : fallback;
}

function prettify(slug) {
  return slug.replace(/^\d+-/, '').split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
}

function listLessons() {
  if (!fs.existsSync(LESSONS_DIR)) return [];
  return fs
    .readdirSync(LESSONS_DIR)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => {
      const id = f.replace(/\.md$/, '');
      const md = fs.readFileSync(path.join(LESSONS_DIR, f), 'utf8');
      return { id, number: parseInt(id, 10) || 0, title: titleFromMarkdown(md, prettify(id)) };
    });
}

function readLesson(id) {
  const file = path.join(LESSONS_DIR, `${id}.md`);
  if (!isInside(LESSONS_DIR, file) || !fs.existsSync(file)) return null;
  return fs.readFileSync(file, 'utf8');
}

/** All cheat sheets with their markdown (they're small, so send everything at once). */
function listCheatsheets() {
  if (!fs.existsSync(CHEATSHEETS_DIR)) return [];
  return fs
    .readdirSync(CHEATSHEETS_DIR)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => {
      const id = f.replace(/\.md$/, '');
      const markdown = fs.readFileSync(path.join(CHEATSHEETS_DIR, f), 'utf8');
      return { id, title: titleFromMarkdown(markdown, prettify(id)), markdown };
    });
}

/** Overwrite one cheat sheet file. Returns false if the id isn't a safe, existing file name. */
function saveCheatsheet(id, markdown) {
  const file = path.join(CHEATSHEETS_DIR, `${id}.md`);
  if (!/^[\w-]+$/.test(id) || !fs.existsSync(file)) return false;
  fs.writeFileSync(file, markdown.endsWith('\n') ? markdown : markdown + '\n');
  return true;
}

/** Create a new cheat sheet file named NN-slug.md (numbered after the last one). */
function createCheatsheet(title) {
  fs.mkdirSync(CHEATSHEETS_DIR, { recursive: true });
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'notes';
  const nums = fs.readdirSync(CHEATSHEETS_DIR).map((f) => parseInt(f, 10)).filter((n) => !Number.isNaN(n));
  const id = `${String((nums.length ? Math.max(...nums) : 0) + 1).padStart(2, '0')}-${slug}`;
  fs.writeFileSync(
    path.join(CHEATSHEETS_DIR, `${id}.md`),
    `# ${title}\n\n## First note\nOne line about what it is.\n\`\`\`js\n// example code\n\`\`\`\n`,
  );
  return id;
}

function listTopics() {
  if (!fs.existsSync(PRACTICE_DIR)) return [];
  return fs
    .readdirSync(PRACTICE_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
}

function problemDir(id) {
  const dir = path.join(PRACTICE_DIR, id);
  return isInside(PRACTICE_DIR, dir) && fs.existsSync(path.join(dir, 'tests.js')) ? dir : null;
}

function readMeta(dir, slug) {
  try {
    return JSON.parse(fs.readFileSync(path.join(dir, 'meta.json'), 'utf8'));
  } catch {
    return { title: prettify(slug) };
  }
}

function listProblems() {
  const out = [];
  for (const topic of listTopics()) {
    const topicDir = path.join(PRACTICE_DIR, topic);
    for (const d of fs.readdirSync(topicDir, { withFileTypes: true })) {
      if (!d.isDirectory()) continue;
      const dir = path.join(topicDir, d.name);
      if (!fs.existsSync(path.join(dir, 'tests.js'))) continue;
      const meta = readMeta(dir, d.name);
      out.push({
        id: `${topic}/${d.name}`,
        topic,
        topicTitle: prettify(topic),
        slug: d.name,
        title: meta.title || prettify(d.name),
        difficulty: meta.difficulty || 'Easy',
        leetcode: meta.leetcode || null,
        tags: meta.tags || [],
        order: meta.order ?? 99,
        hasReference: fs.existsSync(path.join(dir, 'reference.js')),
      });
    }
  }
  return out.sort(
    (a, b) =>
      a.topic.localeCompare(b.topic) ||
      a.order - b.order ||
      (DIFFICULTY_ORDER[a.difficulty] ?? 9) - (DIFFICULTY_ORDER[b.difficulty] ?? 9) ||
      a.title.localeCompare(b.title),
  );
}

/** Find a problem by full id ("02-arrays-hashing/two-sum") or just its slug ("two-sum"). */
function findProblem(query) {
  const all = listProblems();
  return (
    all.find((p) => p.id === query) ||
    all.find((p) => p.slug === query) ||
    all.filter((p) => p.slug.includes(query))
  );
}

function isInside(parent, child) {
  const rel = path.relative(parent, child);
  return !!rel && !rel.startsWith('..') && !path.isAbsolute(rel);
}

module.exports = {
  ROOT, LESSONS_DIR, PRACTICE_DIR, CHEATSHEETS_DIR,
  listLessons, readLesson, listCheatsheets, saveCheatsheet, createCheatsheet, listTopics, listProblems, findProblem, problemDir, prettify,
};
