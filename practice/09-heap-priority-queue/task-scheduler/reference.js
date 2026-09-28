/**
 * Task Scheduler — greedy simulation with a max-heap and a cooldown queue.
 * Time O(T log 26) = O(T) for T tasks, Space O(26)
 *
 * Each time unit we run the ready task with the most copies left (the most
 * frequent tasks are the ones that cause idling, so we start them early).
 * A task that still has copies goes into a FIFO cooldown queue tagged with
 * the time it's ready again. When the heap is empty but tasks are cooling,
 * we jump the clock straight to the next ready time instead of idling
 * step by step.
 *
 * (Formula alternative, O(T): max(T, (maxCount - 1) * (n + 1) + numMax).)
 */
class MaxHeap {
  constructor() {
    this.a = [];
  }
  size() {
    return this.a.length;
  }
  push(x) {
    const a = this.a;
    a.push(x);
    let i = a.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (a[p] >= a[i]) break;
      [a[p], a[i]] = [a[i], a[p]];
      i = p;
    }
  }
  pop() {
    const a = this.a;
    const top = a[0];
    const last = a.pop();
    if (a.length) {
      a[0] = last;
      let i = 0;
      while (true) {
        const l = 2 * i + 1;
        const r = l + 1;
        let m = i;
        if (l < a.length && a[l] > a[m]) m = l;
        if (r < a.length && a[r] > a[m]) m = r;
        if (m === i) break;
        [a[m], a[i]] = [a[i], a[m]];
        i = m;
      }
    }
    return top;
  }
}

function leastInterval(tasks, n) {
  const counts = new Map();
  for (const t of tasks) counts.set(t, (counts.get(t) || 0) + 1);

  const heap = new MaxHeap();
  for (const c of counts.values()) heap.push(c);

  const cooling = []; // [remainingCount, readyTime], in ready-time order
  let head = 0; // index of the queue front (avoids O(n) shift)
  let time = 0;
  while (heap.size() || head < cooling.length) {
    if (!heap.size()) time = Math.max(time, cooling[head][1]); // idle until something is ready
    while (head < cooling.length && cooling[head][1] <= time) heap.push(cooling[head++][0]);

    const left = heap.pop() - 1;
    time++;
    if (left > 0) cooling.push([left, time + n]);
  }
  return time;
}

module.exports = leastInterval;
