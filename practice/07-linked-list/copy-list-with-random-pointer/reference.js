class Node {
  constructor(val = 0, next = null, random = null) {
    this.val = val;
    this.next = next;
    this.random = random;
  }
}

/**
 * Copy List with Random Pointer — two passes with an old -> new Map.
 * Time O(n), Space O(n)
 *
 * Pass 1 creates a copy of every node and remembers original -> copy.
 * Pass 2 wires each copy's next and random through that map, so every
 * pointer lands on a copy even if its target appears later in the list.
 * (There's also an O(1)-extra-space trick that interleaves copies into the
 * original list, but the map version is the one to reach for first.)
 */
function copyRandomList(head) {
  const copies = new Map([[null, null]]);
  for (let node = head; node; node = node.next) copies.set(node, new Node(node.val));
  for (let node = head; node; node = node.next) {
    const copy = copies.get(node);
    copy.next = copies.get(node.next);
    copy.random = copies.get(node.random);
  }
  return copies.get(head);
}

module.exports = copyRandomList;
