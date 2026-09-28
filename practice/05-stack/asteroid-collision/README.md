# Asteroid Collision

You're given an array `asteroids` of non-zero integers representing asteroids in a row. The absolute value is the asteroid's **size**; the sign is its **direction** (positive = moving right, negative = moving left). All asteroids move at the same speed.

When two asteroids meet, the smaller one explodes. If they're the same size, both explode. Asteroids moving in the same direction never meet.

Return the state of the row after **all** collisions have happened.

## Examples

```
Input:  asteroids = [5,10,-5]
Output: [5,10]     // 10 and -5 collide, 10 survives
```

```
Input:  asteroids = [8,-8]
Output: []         // same size, both explode
```

```
Input:  asteroids = [10,2,-5]
Output: [10]       // -5 destroys 2, then 10 destroys -5
```

```
Input:  asteroids = [-2,-1,1,2]
Output: [-2,-1,1,2]  // the left-movers are already flying away
```

## Constraints

- `2 <= asteroids.length <= 10^4`
- `-1000 <= asteroids[i] <= 1000`
- `asteroids[i] !== 0`

## Hints

<details><summary>Hint 1</summary>

A collision only happens when a **right-moving** asteroid is followed (somewhere later) by a **left-moving** one. A left-mover that comes before every right-mover escapes.

</details>

<details><summary>Hint 2</summary>

Process asteroids left to right and keep the survivors on a stack. A new left-mover can only hit the right-movers at the top of the stack.

</details>

<details><summary>Hint 3</summary>

While the top is a right-mover and the new asteroid is a left-mover: if the top is smaller, pop it and keep going; if equal, pop it and the new one dies too; if bigger, the new one dies. If it survives all that, push it.

</details>
