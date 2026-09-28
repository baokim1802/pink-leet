/**
 * Course Schedule — topological sort with Kahn's algorithm.
 * Time O(V + E), Space O(V + E)   (V = numCourses, E = prerequisites.length)
 *
 * Build edges prereq -> course and count each course's indegree. Repeatedly take
 * a course with indegree 0 and "unlock" its dependents. If we manage to take all
 * courses there's no cycle; otherwise some courses wait on each other forever.
 */
function canFinish(numCourses, prerequisites) {
  const graph = Array.from({ length: numCourses }, () => []);
  const indegree = new Array(numCourses).fill(0);
  for (const [course, pre] of prerequisites) {
    graph[pre].push(course);
    indegree[course]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) if (indegree[i] === 0) queue.push(i);

  let taken = 0;
  for (let head = 0; head < queue.length; head++) {
    taken++;
    for (const next of graph[queue[head]]) {
      if (--indegree[next] === 0) queue.push(next);
    }
  }
  return taken === numCourses;
}

module.exports = canFinish;
