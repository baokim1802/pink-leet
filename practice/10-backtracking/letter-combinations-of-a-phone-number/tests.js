// The list of strings can come back in any order, so compare it as a multiset
// ('unordered' sorts the outer array by JSON). The letters INSIDE each string
// must still follow the digit order, and that part is compared exactly.
module.exports = {
  fn: 'letterCombinations',
  compare: 'unordered',
  cases: [
    { args: ['23'], expected: ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'] },
    { name: 'single digit', args: ['2'], expected: ['a', 'b', 'c'] },
    { name: 'empty input', args: [''], expected: [] },
    { name: 'four-letter key', args: ['7'], expected: ['p', 'q', 'r', 's'] },
    { name: 'repeated digit', args: ['22'], expected: ['aa', 'ab', 'ac', 'ba', 'bb', 'bc', 'ca', 'cb', 'cc'] },
    {
      name: 'two four-letter keys',
      args: ['79'],
      expected: [
        'pw', 'px', 'py', 'pz', 'qw', 'qx', 'qy', 'qz',
        'rw', 'rx', 'ry', 'rz', 'sw', 'sx', 'sy', 'sz',
      ],
    },
    {
      name: 'order matters inside each string',
      args: ['32'],
      expected: ['da', 'db', 'dc', 'ea', 'eb', 'ec', 'fa', 'fb', 'fc'],
    },
    {
      name: 'three digits',
      args: ['468'],
      expected: [
        'gmt', 'gmu', 'gmv', 'gnt', 'gnu', 'gnv', 'got', 'gou', 'gov',
        'hmt', 'hmu', 'hmv', 'hnt', 'hnu', 'hnv', 'hot', 'hou', 'hov',
        'imt', 'imu', 'imv', 'int', 'inu', 'inv', 'iot', 'iou', 'iov',
      ],
    },
  ],
};
