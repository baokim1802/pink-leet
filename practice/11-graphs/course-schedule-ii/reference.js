/**
 * Course Schedule II — topological sort with Kahn's algorithm.
 * Time O(V + E), Space O(V + E)   (V = numCourses, E = prerequisites.length)
 *
 * Edges go prereq -> course; indegree = number of unmet prerequisites. The
 * queue starts with every course that has none. Dequeuing a course appends it
 * to the order and unlocks its dependents. The queue array itself ends up being
 * the order; if it's shorter than numCourses, there's a cycle.
 */
function findOrder(numCourses, prerequisites) {
  const graph = Array.from({ length: numCourses }, () => []);
  const indegree = new Array(numCourses).fill(0);
  for (const [course, pre] of prerequisites) {
    graph[pre].push(course);
    indegree[course]++;
  }

  const order = [];
  for (let i = 0; i < numCourses; i++) if (indegree[i] === 0) order.push(i);
  for (let head = 0; head < order.length; head++) {
    for (const next of graph[order[head]]) {
      if (--indegree[next] === 0) order.push(next);
    }
  }
  return order.length === numCourses ? order : [];
}

module.exports = findOrder;
