/**
 * Reorder List — middle, reverse, merge.
 * Time O(n), Space O(1)
 *
 * 1. Fast & slow pointers leave `slow` at the end of the first half.
 * 2. Detach the second half (slow.next = null) and reverse it.
 * 3. Weave: take one node from the front half, then one from the reversed
 *    back half, until the back half runs out. The front half is the same
 *    length or one longer, so its leftover node (if any) is already in place.
 */
function reorderList(head) {
  if (!head || !head.next) return;

  let slow = head;
  let fast = head.next;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  let second = slow.next;
  slow.next = null;
  let prev = null;
  while (second) {
    const next = second.next;
    second.next = prev;
    prev = second;
    second = next;
  }

  let first = head;
  second = prev;
  while (second) {
    const nextFirst = first.next;
    const nextSecond = second.next;
    first.next = second;
    second.next = nextFirst;
    first = nextFirst;
    second = nextSecond;
  }
}

module.exports = reorderList;
