// [5,5,5,20] repeated: always exactly enough $5s
const repeatingFives = Array.from({ length: 2000 }, (_, i) => (i % 4 === 3 ? 20 : 5));

module.exports = {
  fn: 'lemonadeChange',
  cases: [
    { args: [[5, 5, 5, 10, 20]], expected: true },
    { args: [[5, 5, 10, 10, 20]], expected: false },
    { name: 'first customer pays $10', args: [[10]], expected: false },
    { name: 'single $5', args: [[5]], expected: true },
    { name: 'three $5s change a $20', args: [[5, 5, 5, 20]], expected: true },
    { name: '$5 then $20 is impossible', args: [[5, 20]], expected: false },
    { name: 'must use the $10 for the $20', args: [[5, 5, 5, 5, 10, 20, 10]], expected: true },
    { name: 'runs out of $5s later', args: [[5, 10, 5, 20, 10]], expected: false },
    { name: 'long line of 2000 customers', args: [repeatingFives], expected: true },
    { name: 'long line that fails at the very end', args: [[...repeatingFives, 10]], expected: false },
  ],
};
