module.exports = {
  fn: 'isValid',
  cases: [
    { args: ['()'], expected: true },
    { args: ['()[]{}'], expected: true },
    { name: 'wrong type', args: ['(]'], expected: false },
    { name: 'nested', args: ['{[]}'], expected: true },
    { name: 'wrong order', args: ['([)]'], expected: false },
    { name: 'single opener', args: ['('], expected: false },
    { name: 'single closer', args: [')'], expected: false },
    { name: 'unclosed at the end', args: ['(('], expected: false },
    { name: 'closer before opener', args: ['(){}}{'], expected: false },
    { name: 'deep nesting', args: ['('.repeat(5000) + ')'.repeat(5000)], expected: true },
  ],
};
