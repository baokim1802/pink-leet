/**
 * Min Stack — a second stack that remembers the minimum at every height.
 * Time O(1) per operation, Space O(n)
 *
 * mins[i] is the minimum of stack[0..i]. Pushing computes the new min from
 * the previous one; popping both stacks restores the previous minimum for free.
 */
class MinStack {
  constructor() {
    this.stack = [];
    this.mins = [];
  }

  push(val) {
    this.stack.push(val);
    const prevMin = this.mins.length ? this.mins[this.mins.length - 1] : Infinity;
    this.mins.push(Math.min(val, prevMin));
  }

  pop() {
    this.stack.pop();
    this.mins.pop();
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    return this.mins[this.mins.length - 1];
  }
}

module.exports = MinStack;
