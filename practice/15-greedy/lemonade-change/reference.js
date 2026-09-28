/**
 * Lemonade Change — simulate, and always hand out the least flexible bills first.
 * Time O(n), Space O(1)
 *
 * Only $5s and $10s matter for change. For a $20, prefer $10 + $5 over three
 * $5s: a $5 can pay change for a $10 *or* a $20, while a $10 only helps with a
 * $20, so keeping $5s never hurts.
 */
function lemonadeChange(bills) {
  let fives = 0;
  let tens = 0;
  for (const bill of bills) {
    if (bill === 5) {
      fives++;
    } else if (bill === 10) {
      if (fives === 0) return false;
      fives--;
      tens++;
    } else if (tens > 0 && fives > 0) {
      tens--;
      fives--;
    } else if (fives >= 3) {
      fives -= 3;
    } else {
      return false;
    }
  }
  return true;
}

module.exports = lemonadeChange;
