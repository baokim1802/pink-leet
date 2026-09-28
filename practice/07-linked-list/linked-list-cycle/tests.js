const { arrayToList } = require('../../../lib/structures');

/** Build a list from values, then link the tail to the node at index `pos` (-1 = no cycle). */
function buildWithCycle(values, pos) {
  const head = arrayToList(values);
  if (pos < 0 || !head) return head;
  let tail = head;
  let target = null;
  let i = 0;
  for (let node = head; node; node = node.next, i++) {
    if (i === pos) target = node;
    tail = node;
  }
  tail.next = target;
  return head;
}

const big = Array.from({ length: 10000 }, (_, i) => i);

module.exports = {
  fn: 'hasCycle',
  prepare: ([values, pos]) => [buildWithCycle(values, pos)],
  cases: [
    { args: [[3, 2, 0, -4], 1], expected: true },
    { args: [[1, 2], 0], expected: true },
    { name: 'single node, no cycle', args: [[1], -1], expected: false },
    { name: 'empty list', args: [[], -1], expected: false },
    { name: 'single node pointing to itself', args: [[1], 0], expected: true },
    { name: 'straight list', args: [[1, 2, 3, 4, 5], -1], expected: false },
    { name: 'tail points to itself', args: [[1, 2, 3, 4, 5, 6], 5], expected: true },
    { name: 'duplicate values, no cycle', args: [[1, 1, 1, 1], -1], expected: false },
    { name: '10k nodes, no cycle', args: [big, -1], expected: false },
    { name: '10k nodes, cycle to head', args: [big, 0], expected: true },
  ],
};
