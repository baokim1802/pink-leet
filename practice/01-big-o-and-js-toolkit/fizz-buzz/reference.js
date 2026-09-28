/**
 * Fizz Buzz — build each entry by concatenating "Fizz" and/or "Buzz".
 * Time O(n), Space O(1) extra (the output array itself is O(n))
 *
 * If neither word applies, the string is empty and we fall back to the number.
 */
function fizzBuzz(n) {
  const answer = [];
  for (let i = 1; i <= n; i++) {
    let s = '';
    if (i % 3 === 0) s += 'Fizz';
    if (i % 5 === 0) s += 'Buzz';
    answer.push(s || String(i));
  }
  return answer;
}

module.exports = fizzBuzz;
