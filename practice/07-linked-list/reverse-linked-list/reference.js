/**
 * Reverse Linked List — iterative three-pointer walk.
 * Time O(n), Space O(1)
 *
 * Save the next node, point the current node back at `prev`,
 * then advance both pointers. When `cur` falls off the end,
 * `prev` is the old tail = the new head.
 */
function reverseList(head) {
  let prev = null;
  let cur = head;
  while (cur) {
    const next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return prev;
}

module.exports = reverseList;
