/** Build a random-pointer list from LeetCode's [[val, randomIndex | null], ...] format. */
function build(pairs) {
  const nodes = pairs.map(([val]) => ({ val, next: null, random: null }));
  nodes.forEach((node, i) => {
    node.next = nodes[i + 1] || null;
    const r = pairs[i][1];
    node.random = r === null ? null : nodes[r];
  });
  return { head: nodes[0] || null, nodes };
}

/** Walk a list and turn it back into [[val, randomIndex | null], ...]. */
function serialize(head, limit) {
  const order = [];
  const index = new Map();
  for (let n = head; n; n = n.next) {
    if (index.has(n)) throw new Error('The copy has a cycle in its next pointers');
    if (order.length >= limit) throw new Error('The copy is longer than the original');
    index.set(n, order.length);
    order.push(n);
  }
  return order.map((n) => {
    if (n.random === null || n.random === undefined) return [n.val, null];
    if (!index.has(n.random)) throw new Error('A random pointer points outside the copied list (maybe at an original node?)');
    return [n.val, index.get(n.random)];
  });
}

// 1000 nodes: val = i - 500, random -> (i * 7) % 1000, except every 5th node is null
const big = Array.from({ length: 1000 }, (_, i) => [i - 500, i % 5 === 0 ? null : (i * 7) % 1000]);

module.exports = {
  run: (copyRandomList, [pairs]) => {
    const { head, nodes } = build(pairs);
    const originals = new Set(nodes);
    const copy = copyRandomList(head);
    for (let n = copy; n; n = n.next) {
      if (originals.has(n)) throw new Error('The copy reuses a node from the original list — make new nodes');
      if (n.random && originals.has(n.random)) throw new Error('A copied random pointer points at an original node');
    }
    const originalAfter = serialize(head, pairs.length);
    if (JSON.stringify(originalAfter) !== JSON.stringify(pairs)) throw new Error('The original list was modified');
    return serialize(copy ?? null, pairs.length);
  },
  cases: [
    { args: [[[7, null], [13, 0], [11, 4], [10, 2], [1, 0]]], expected: [[7, null], [13, 0], [11, 4], [10, 2], [1, 0]] },
    { args: [[[1, 1], [2, 1]]], expected: [[1, 1], [2, 1]] },
    { name: 'duplicate values', args: [[[3, null], [3, 0], [3, null]]], expected: [[3, null], [3, 0], [3, null]] },
    { name: 'empty list', args: [[]], expected: [] },
    { name: 'single node, no random', args: [[[1, null]]], expected: [[1, null]] },
    { name: 'single node, random to itself', args: [[[-4, 0]]], expected: [[-4, 0]] },
    { name: 'randoms point forward', args: [[[1, 3], [2, 3], [3, 3], [4, null]]], expected: [[1, 3], [2, 3], [3, 3], [4, null]] },
    { name: '1000 nodes', args: [big], expected: big },
  ],
};
