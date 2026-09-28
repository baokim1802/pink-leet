# Car Fleet

`n` cars are driving along a one-lane road toward a destination at mile `target`. Car `i` starts at mile `position[i]` and drives at a constant `speed[i]` miles per hour.

A car can never **pass** another car. If a faster car catches up to a slower one, it slows down and they drive on together, bumper to bumper. A group of cars driving together like this is a **car fleet** (a single car on its own is a fleet too). If a car catches up with a fleet exactly at the destination, it still counts as part of that fleet.

Return how many car fleets arrive at the destination.

## Examples

```
Input:  target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]
Output: 3
// Cars at 10 and 8 both reach mile 12 at hour 1 → one fleet.
// The car at 0 never catches anyone → its own fleet.
// Cars at 5 (arrives hour 7) and 3 (would arrive hour 3) meet → one fleet.
```

```
Input:  target = 10, position = [3], speed = [3]
Output: 1
```

```
Input:  target = 100, position = [0,2,4], speed = [4,2,1]
Output: 1          // everyone catches up with the car at 4
```

## Constraints

- `n === position.length === speed.length`
- `1 <= n <= 10^5`
- `0 < target <= 10^6`
- `0 <= position[i] < target`, and all positions are distinct
- `0 < speed[i] <= 10^6`

## Hints

<details><summary>Hint 1</summary>

For each car, work out the time it would take to reach the target on its own: `(target - position) / speed`.

</details>

<details><summary>Hint 2</summary>

Sort cars by position, **closest to the target first**. A car can only be slowed down by the cars ahead of it.

</details>

<details><summary>Hint 3</summary>

Walk from the front car backwards. If a car's solo arrival time is `<=` the time of the fleet ahead of it, it joins that fleet. Otherwise it's slower and starts a new fleet — which becomes the new "fleet ahead".

</details>
