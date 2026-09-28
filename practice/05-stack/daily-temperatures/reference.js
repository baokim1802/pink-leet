/**
 * Daily Temperatures — monotonic decreasing stack of indices.
 * Time O(n), Space O(n)
 *
 * The stack holds indices of days still waiting for a warmer day; their
 * temperatures decrease from bottom to top. When today is warmer than the
 * top, that day's wait is over: pop it and record the distance. Each index
 * is pushed and popped at most once, so the total work is linear.
 */
function dailyTemperatures(temperatures) {
  const answer = new Array(temperatures.length).fill(0);
  const stack = []; // indices
  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length && temperatures[stack[stack.length - 1]] < temperatures[i]) {
      const j = stack.pop();
      answer[j] = i - j;
    }
    stack.push(i);
  }
  return answer;
}

module.exports = dailyTemperatures;
