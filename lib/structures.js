// Shared data structures used by LeetCode-style problems.
// Your solutions can `require('../../../lib/structures')` if they need ListNode / TreeNode.

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/** [1,2,3] -> 1 -> 2 -> 3 */
function arrayToList(arr) {
  const dummy = new ListNode();
  let cur = dummy;
  for (const v of arr) {
    cur.next = new ListNode(v);
    cur = cur.next;
  }
  return dummy.next;
}

/** 1 -> 2 -> 3 -> [1,2,3] (guards against cycles) */
function listToArray(head, limit = 10000) {
  const out = [];
  while (head && out.length < limit) {
    out.push(head.val);
    head = head.next;
  }
  return out;
}

/** Level-order array (LeetCode style, with nulls) -> tree. [1,null,2,3] */
function arrayToTree(arr) {
  if (!arr.length || arr[0] === null) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;
  while (i < arr.length) {
    const node = queue.shift();
    if (i < arr.length && arr[i] !== null) {
      node.left = new TreeNode(arr[i]);
      queue.push(node.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      node.right = new TreeNode(arr[i]);
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

/** Tree -> level-order array with trailing nulls trimmed. */
function treeToArray(root) {
  const out = [];
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    if (node) {
      out.push(node.val);
      queue.push(node.left, node.right);
    } else {
      out.push(null);
    }
  }
  while (out.length && out[out.length - 1] === null) out.pop();
  return out;
}

module.exports = { ListNode, TreeNode, arrayToList, listToArray, arrayToTree, treeToArray };
