const { arrayToTree, treeToArray } = require('../../../lib/structures');

function allNodes(root) {
  const seen = new Set();
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    if (!node) continue;
    seen.add(node);
    stack.push(node.left, node.right);
  }
  return seen;
}

// Left chain of 1000 nodes: [1,2,null,3,null,...,1000]
const chain = [1];
for (let v = 2; v <= 1000; v++) chain.push(v, null);
chain.pop();

// Complete tree of 2000 nodes with values -1000..999.
const wide = Array.from({ length: 2000 }, (_, i) => i - 1000);

module.exports = {
  // args: [levelOrderArray]; expected: the same tree as a level-order array.
  run: (mod, [arr]) => {
    const Codec = typeof mod === 'function' ? mod : mod.Codec;
    const root = arrayToTree(arr);
    const data = new Codec().serialize(root);
    if (typeof data !== 'string') throw new Error(`serialize must return a string, got ${typeof data}`);
    const copy = new Codec().deserialize(data);
    const original = allNodes(root);
    for (const node of allNodes(copy)) {
      if (original.has(node)) throw new Error('deserialize returned nodes from the original tree — build new ones');
    }
    return treeToArray(copy);
  },
  cases: [
    { args: [[1, 2, 3, null, null, 4, 5]], expected: [1, 2, 3, null, null, 4, 5] },
    { name: 'empty tree', args: [[]], expected: [] },
    { name: 'single node', args: [[1]], expected: [1] },
    { name: 'left child only', args: [[1, 2]], expected: [1, 2] },
    { name: 'right child only', args: [[1, null, 2]], expected: [1, null, 2] },
    { name: 'negative and multi-digit values', args: [[-1000, 1000, -7, 0, null, 42]], expected: [-1000, 1000, -7, 0, null, 42] },
    { name: 'zeros', args: [[0, 0, 0, null, 0]], expected: [0, 0, 0, null, 0] },
    { args: [[5, 4, 7, 3, null, 2, null, -1, null, 9]], expected: [5, 4, 7, 3, null, 2, null, -1, null, 9] },
    { name: '1000-node chain', args: [chain], expected: chain },
    { name: '2000-node complete tree', args: [wide], expected: wide },
  ],
};
