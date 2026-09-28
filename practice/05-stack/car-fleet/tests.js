// large: car i starts at mile i and drives at speed 1 → nobody catches anybody
const N = 20000;
const bigPos = Array.from({ length: N }, (_, i) => i);
const bigSpeed = new Array(N).fill(1);

module.exports = {
  fn: 'carFleet',
  cases: [
    { args: [12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]], expected: 3 },
    { name: 'single car', args: [10, [3], [3]], expected: 1 },
    { args: [100, [0, 2, 4], [4, 2, 1]], expected: 1 },
    { name: 'unsorted input, nobody catches up', args: [10, [6, 2, 8], [3, 1, 2]], expected: 3 },
    // car at 0 (speed 2) and car at 5 (speed 1) both arrive at hour 5
    { name: 'meet exactly at the target', args: [10, [0, 5], [2, 1]], expected: 1 },
    { name: 'same speed never merge', args: [10, [1, 4, 7], [2, 2, 2]], expected: 3 },
    // times: 9 → 1 (fleet A), 5 → 5 (fleet B), 3 → 3.5 joins B, 0 → 10 (fleet C)
    { args: [10, [0, 3, 5, 9], [1, 2, 1, 1]], expected: 3 },
    // times: pos 6 → 2, pos 4 → 1.5 (joins), pos 2 → 4 (new), pos 0 → 2.5 (joins)
    { name: 'catching up to a fleet that already merged', args: [10, [2, 4, 6, 0], [2, 4, 2, 4]], expected: 2 },
    { name: 'large', args: [N, bigPos, bigSpeed], expected: N },
  ],
};
