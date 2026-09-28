# Word Ladder

A **word ladder** from `beginWord` to `endWord` is a sequence of words where each word differs from the previous one in **exactly one letter**, and every word after `beginWord` comes from `wordList`. (`beginWord` itself doesn't need to be in the list.)

Return the number of words in the **shortest** ladder from `beginWord` to `endWord`, counting both ends. If no ladder exists, return `0`.

## Examples

```
Input:  beginWord = "hit", endWord = "cog",
        wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
// "hit" -> "hot" -> "dot" -> "dog" -> "cog"
```

```
Input:  beginWord = "hit", endWord = "cog",
        wordList = ["hot","dot","dog","lot","log"]
Output: 0
// "cog" isn't in the list, so it can never be reached
```

## Constraints

- `1 <= beginWord.length <= 10`
- `endWord.length === beginWord.length`
- `1 <= wordList.length <= 5000`, every word has the same length as `beginWord`
- All words are lowercase English letters; `beginWord !== endWord`; the words in `wordList` are unique.

## Hints

<details><summary>Hint 1</summary>

Think of every word as a node, with an edge between two words that differ by one letter. "Shortest ladder" = shortest path in an unweighted graph = **BFS**.

</details>

<details><summary>Hint 2</summary>

Don't compare every pair of words to build edges. From a word, generate its neighbors directly: for each position, try all 26 letters and keep the candidates that are in a `Set` of the word list.

</details>

<details><summary>Hint 3</summary>

Process BFS level by level and count levels. Delete a word from the set as soon as you enqueue it — that's your visited mark, and it stops the same word being queued twice.

</details>
