/**
 * Palindrome Linked List — find the middle, reverse the second half, compare.
 * Time O(n), Space O(1)
 *
 * Fast & slow pointers stop `slow` at the start of the second half. We
 * reverse that half in place and walk both halves together comparing
 * values. Finally we reverse the second half back so the input is restored.
 */
function reverse(head) {
  let prev = null;
  while (head) {
    const next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
}

function isPalindrome(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  const secondHalf = reverse(slow);
  let ok = true;
  for (let a = head, b = secondHalf; b; a = a.next, b = b.next) {
    if (a.val !== b.val) {
      ok = false;
      break;
    }
  }
  reverse(secondHalf); // restore the original list
  return ok;
}

module.exports = isPalindrome;
