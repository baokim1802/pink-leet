// Larger case: 5000 x 'A' plus 1000 each of 'B'..'F' (10,000 tasks), n = 2.
// 'A' dominates: 4999 gaps of (n + 1) = 3 slots, plus the final A -> 4999 * 3 + 1 = 14998.
const bigTasks = [...Array(5000).fill('A'), ...'BCDEF'.split('').flatMap((c) => Array(1000).fill(c))];
// Balanced larger case: every letter 'A'..'Z' 300 times (7800 tasks), n = 25 -> no idling needed.
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const balanced = Array.from({ length: 300 }, () => letters).flat();

module.exports = {
  fn: 'leastInterval',
  cases: [
    { args: [['A', 'A', 'A', 'B', 'B', 'B'], 2], expected: 8 },
    { args: [['A', 'C', 'A', 'B', 'D', 'B'], 1], expected: 6 },
    { args: [['A', 'A', 'A', 'B', 'B', 'B'], 3], expected: 10 },
    { name: 'single task', args: [['A'], 0], expected: 1 },
    { name: 'no cooldown', args: [['A', 'A', 'A'], 0], expected: 3 },
    { name: 'one label, must idle', args: [['A', 'A', 'A'], 2], expected: 7 },
    { name: 'one dominant label', args: [['A', 'A', 'A', 'A', 'A', 'A', 'B', 'C', 'D', 'E', 'F', 'G'], 2], expected: 16 },
    { name: 'all distinct', args: [['A', 'B', 'C', 'D', 'E', 'F'], 2], expected: 6 },
    { name: 'enough variety to never idle', args: [['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'], 1], expected: 8 },
    { name: '10k tasks, dominant A', args: [bigTasks, 2], expected: 14998 },
    { name: '7800 tasks, perfectly balanced', args: [balanced, 25], expected: 7800 },
  ],
};
