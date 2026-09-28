const { ListNode } = require('../../../lib/structures');

/**
 * Reverse Nodes in k-Group — iterative group reversal with a dummy head.
 * Time O(n), Space O(1)
 *
 * `groupPrev` sits just before the next group. We find the group's k-th node
 * (stop if there aren't k nodes left), then reverse the group in place with
 * `prev` starting at the node after the group, so the reversed group is
 * already linked to the rest. Finally hook groupPrev to the new group head
 * and move groupPrev to the group's new tail (its old first node).
 */
function reverseKGroup(head, k) {
  const dummy = new ListNode(0, head);
  let groupPrev = dummy;

  while (true) {
    let kth = groupPrev;
    for (let i = 0; i < k && kth; i++) kth = kth.next;
    if (!kth) break;

    const groupNext = kth.next;
    const first = groupPrev.next;
    let prev = groupNext;
    let cur = first;
    while (cur !== groupNext) {
      const next = cur.next;
      cur.next = prev;
      prev = cur;
      cur = next;
    }

    groupPrev.next = kth;
    groupPrev = first;
  }

  return dummy.next;
}

module.exports = reverseKGroup;
