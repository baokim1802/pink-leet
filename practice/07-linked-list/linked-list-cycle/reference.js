/**
 * Linked List Cycle — Floyd's tortoise and hare.
 * Time O(n), Space O(1)
 *
 * `slow` moves 1 step, `fast` moves 2. Without a cycle, `fast` reaches null.
 * With a cycle, `fast` gains one node per step inside the loop, so it must
 * eventually land exactly on `slow`.
 */
function hasCycle(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}

module.exports = hasCycle;
