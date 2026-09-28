module.exports = {
  fn: 'fizzBuzz',
  cases: [
    { name: 'n = 1', args: [1], expected: ['1'] },
    { args: [3], expected: ['1', '2', 'Fizz'] },
    { args: [5], expected: ['1', '2', 'Fizz', '4', 'Buzz'] },
    { args: [6], expected: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz'] },
    {
      name: 'first FizzBuzz',
      args: [15],
      expected: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz'],
    },
    {
      name: 'past 30',
      args: [31],
      expected: [
        '1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz',
        '11', 'Fizz', '13', '14', 'FizzBuzz', '16', '17', 'Fizz', '19', 'Buzz',
        'Fizz', '22', '23', 'Fizz', 'Buzz', '26', 'Fizz', '28', '29', 'FizzBuzz', '31',
      ],
    },
  ],
};
