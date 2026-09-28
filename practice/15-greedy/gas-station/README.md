# Gas Station

There are `n` gas stations arranged in a **circle**. Station `i` gives you `gas[i]` units of fuel, and driving from station `i` to station `i + 1` (wrapping from `n - 1` back to `0`) burns `cost[i]` units.

Your car has an unlimited tank and starts **empty** at one of the stations. Return the index of the station where you can start and drive all the way around the circle once, clockwise. If it's impossible, return `-1`.

If a solution exists, it is **guaranteed to be unique**.

## Examples

```
Input:  gas = [1,2,3,4,5], cost = [3,4,5,1,2]
Output: 3
// start at 3 with 4 fuel: 4-1+5 = 8 at station 4, 8-2+1 = 7 at 0,
// 7-3+2 = 6 at 1, 6-4+3 = 5 at 2, 5-5 = 0 back at 3 ✔
```

```
Input:  gas = [2,3,4], cost = [3,4,3]
Output: -1
// the loop needs 10 fuel in total but only 9 exists
```

## Constraints

- `n === gas.length === cost.length`
- `1 <= n <= 10^5`
- `0 <= gas[i], cost[i] <= 10^4`

## Hints

<details><summary>Hint 1</summary>

If the total gas is less than the total cost, no starting point can work. Is the converse true — if there's enough gas overall, is some start always valid?

</details>

<details><summary>Hint 2</summary>

Suppose you start at `s` and first run dry trying to reach station `j`. Could any station strictly between `s` and `j` be a valid start?

</details>

<details><summary>Hint 3</summary>

No: you arrived at each of those stations with fuel `>= 0`, so starting there with 0 is no better. Jump the candidate start to `j + 1`, reset the tank, and keep going — one pass is enough.

</details>
