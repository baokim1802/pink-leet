const { ListNode } = require('../../../lib/structures');

/**
 * Remove Nth Node From End of List — dummy head + gap of n between two pointers.
 * Time O(sz), Space O(1)
 *
 * Move `fast` n+1 steps ahead of `slow` (both starting at dummy). Then advance
 * both until `fast` is null: `slow` now sits just before the node to remove.
 * The dummy node handles removing the original head with no special case.
 */
function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0, head);
  let fast = dummy;
  let slow = dummy;
  for (let i = 0; i <= n; i++) fast = fast.next;
  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return dummy.next;
}

module.exports = removeNthFromEnd;
