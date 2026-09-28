/**
 * Odd Even Linked List — weave two chains, then join them.
 * Time O(n), Space O(1)
 *
 * `odd` and `even` walk the list in a leapfrog: each one skips over the
 * other's next node. When the even chain runs out, the odd chain's tail is
 * pointed at the saved head of the even chain.
 */
function oddEvenList(head) {
  if (!head) return null;
  let odd = head;
  let even = head.next;
  const evenHead = even;
  while (even && even.next) {
    odd.next = even.next;
    odd = odd.next;
    even.next = odd.next;
    even = even.next;
  }
  odd.next = evenHead;
  return head;
}

module.exports = oddEvenList;
