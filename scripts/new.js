// Scaffold your own practice problem.
//   npm run new -- <topic-folder> <slug> [Easy|Medium|Hard]
//   npm run new -- 02-arrays-hashing contains-duplicate-ii Easy
const fs = require('fs');
const path = require('path');
const { PRACTICE_DIR, listTopics, prettify } = require('../lib/catalog');

const [topicArg, slug, difficulty = 'Easy'] = process.argv.slice(2);
if (!topicArg || !slug) {
  console.log('Usage: npm run new -- <topic> <slug> [Easy|Medium|Hard]\n\nTopics:\n  ' + listTopics().join('\n  '));
  process.exit(1);
}
const topic = listTopics().find((t) => t === topicArg || t.replace(/^\d+-/, '') === topicArg) || topicArg;
const dir = path.join(PRACTICE_DIR, topic, slug);
if (fs.existsSync(dir)) {
  console.log(`Already exists: ${path.relative(process.cwd(), dir)}`);
  process.exit(1);
}
const fnName = slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
const title = prettify(slug);
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify({
  title, difficulty, leetcode: `https://leetcode.com/problems/${slug}/`, tags: [],
}, null, 2) + '\n');
fs.writeFileSync(path.join(dir, 'README.md'), `# ${title}\n\n> Paste the problem statement here.\n\n## Examples\n\n\`\`\`\nInput:\nOutput:\n\`\`\`\n`);
const starter = `/**\n * ${title}\n */\nfunction ${fnName}(input) {\n  // your code here 🎀\n}\n\nmodule.exports = ${fnName};\n`;
fs.writeFileSync(path.join(dir, 'solution.js'), starter);
fs.writeFileSync(path.join(dir, 'starter.js'), starter); // what ↺ Reset goes back to
fs.writeFileSync(path.join(dir, 'tests.js'), `module.exports = {\n  fn: '${fnName}',\n  cases: [\n    { args: [/* inputs */], expected: null },\n  ],\n};\n`);
console.log(`🌸 Created ${path.relative(process.cwd(), dir)}\n   Fill in README.md + tests.js, then write solution.js and run: npm test ${slug}`);
