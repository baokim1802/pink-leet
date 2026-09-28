const { ListNode } = require('../../../lib/structures');

/**
 * Merge Two Sorted Lists — dummy head + tail pointer.
 * Time O(n + m), Space O(1)
 *
 * Repeatedly take the smaller front node and append it to `tail`.
 * The dummy node means we never special-case the first append.
 * When one list is exhausted, attach the rest of the other.
 */
function mergeTwoLists(list1, list2) {
  const dummy = new ListNode();
  let tail = dummy;
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }
    tail = tail.next;
  }
  tail.next = list1 || list2;
  return dummy.next;
}

module.exports = mergeTwoLists;
