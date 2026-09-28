/**
 * Asteroid Collision — stack of survivors.
 * Time O(n), Space O(n)
 *
 * Only a right-mover on the stack followed by an incoming left-mover can
 * collide. For each left-mover, keep popping smaller right-movers from the
 * top; stop when it dies (bigger or equal top) or no right-mover is left.
 * Each asteroid is pushed and popped at most once.
 */
function asteroidCollision(asteroids) {
  const stack = [];
  for (const a of asteroids) {
    let alive = true;
    while (alive && a < 0 && stack.length && stack[stack.length - 1] > 0) {
      const top = stack[stack.length - 1];
      if (top < -a) stack.pop(); // top explodes, keep checking
      else {
        if (top === -a) stack.pop(); // both explode
        alive = false;
      }
    }
    if (alive) stack.push(a);
  }
  return stack;
}

module.exports = asteroidCollision;
