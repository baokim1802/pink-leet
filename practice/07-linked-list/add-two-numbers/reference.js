const { ListNode } = require('../../../lib/structures');

/**
 * Add Two Numbers — grade-school addition with a carry and a dummy head.
 * Time O(max(m, n)), Space O(max(m, n)) for the output list.
 *
 * The digits arrive ones-first, which is exactly the order we add them in.
 * Missing digits count as 0, and we keep going while a carry is left over.
 */
function addTwoNumbers(l1, l2) {
  const dummy = new ListNode();
  let tail = dummy;
  let carry = 0;
  while (l1 || l2 || carry) {
    const sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry;
    tail.next = new ListNode(sum % 10);
    tail = tail.next;
    carry = Math.floor(sum / 10);
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }
  return dummy.next;
}

module.exports = addTwoNumbers;
