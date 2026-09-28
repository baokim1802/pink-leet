/**
 * LRU Cache — hash map + doubly linked list with dummy ends.
 * Time O(1) per get/put, Space O(capacity)
 *
 * The list is ordered by recency: right after `head` is the most recently
 * used node, right before `tail` the least. The map jumps straight to a
 * key's node, so "use" = unlink it and re-insert it after `head`, and
 * eviction = remove the node before `tail`.
 */
class DNode {
  constructor(key = 0, val = 0) {
    this.key = key;
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map(); // key -> DNode
    this.head = new DNode(); // dummy: most recent side
    this.tail = new DNode(); // dummy: least recent side
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  _remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  _addFront(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }

  get(key) {
    const node = this.map.get(key);
    if (!node) return -1;
    this._remove(node);
    this._addFront(node);
    return node.val;
  }

  put(key, value) {
    let node = this.map.get(key);
    if (node) {
      node.val = value;
      this._remove(node);
    } else {
      node = new DNode(key, value);
      this.map.set(key, node);
      if (this.map.size > this.capacity) {
        const lru = this.tail.prev;
        this._remove(lru);
        this.map.delete(lru.key);
      }
    }
    this._addFront(node);
  }
}

module.exports = LRUCache;
