/**
 * Fibonacci Number — bottom-up DP with two rolling variables.
 * Time O(n), Space O(1)
 *
 * Keep F(i - 1) and F(i) and slide them forward n times. Starting from
 * (F(0), F(1)) = (0, 1), after n steps `prev` holds F(n) — which also
 * handles n = 0 and n = 1 without special cases.
 */
function fib(n) {
  let prev = 0; // F(i)
  let cur = 1;  // F(i + 1)
  for (let i = 0; i < n; i++) {
    [prev, cur] = [cur, prev + cur];
  }
  return prev;
}

module.exports = fib;
