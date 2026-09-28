/**
 * Car Fleet — sort by position, then a monotonic stack of arrival times.
 * Time O(n log n), Space O(n)
 *
 * Process cars from closest-to-target to farthest. Each car's solo arrival
 * time is (target - position) / speed. If it would arrive no later than the
 * fleet directly ahead, it catches up and merges (so it adds nothing).
 * Otherwise it forms a new, slower fleet. The stack holds each fleet's
 * arrival time; its size is the answer.
 */
function carFleet(target, position, speed) {
  const cars = position.map((p, i) => [p, speed[i]]).sort((a, b) => b[0] - a[0]);
  const stack = []; // arrival times of fleets, increasing from bottom to top
  for (const [p, s] of cars) {
    const time = (target - p) / s;
    if (!stack.length || time > stack[stack.length - 1]) stack.push(time);
  }
  return stack.length;
}

module.exports = carFleet;
