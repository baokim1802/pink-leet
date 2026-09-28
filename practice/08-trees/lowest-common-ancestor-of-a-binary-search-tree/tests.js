const { arrayToTree } = require('../../../lib/structures');

// Iterative search so large skewed trees don't blow the stack.
function findNode(root, val) {
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    if (!node) continue;
    if (node.val === val) return node;
    stack.push(node.left, node.right);
  }
  throw new Error(`test setup: value ${val} not found in tree`);
}

// Right-skewed BST 1 -> 2 -> ... -> 1000.
const N = 1000;
const chain = [1];
for (let v = 2; v <= N; v++) chain.push(null, v);

const bst = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5];

module.exports = {
  // args: [treeArray, pVal, qVal]; the solution receives real node references.
  run: (mod, [arr, pVal, qVal]) => {
    const fn = typeof mod === 'function' ? mod : mod.lowestCommonAncestor;
    const root = arrayToTree(arr);
    const res = fn(root, findNode(root, pVal), findNode(root, qVal));
    if (!res || typeof res !== 'object') throw new Error('Expected a TreeNode, got ' + res);
    return res.val;
  },
  cases: [
    { name: 'split at the root', args: [bst, 2, 8], expected: 6 },
    { name: 'p is an ancestor of q', args: [bst, 2, 4], expected: 2 },
    { name: 'two nodes', args: [[2, 1], 2, 1], expected: 2 },
    { name: 'siblings', args: [bst, 3, 5], expected: 4 },
    { args: [bst, 0, 5], expected: 2 },
    { args: [bst, 7, 9], expected: 8 },
    { name: 'deep nodes on opposite sides', args: [bst, 3, 7], expected: 6 },
    { name: 'negative values', args: [[0, -5, 5, -8, -3], -8, -3], expected: -5 },
    { name: 'bottom of a 1000-node chain', args: [chain, N - 1, N], expected: N - 1 },
  ],
};
