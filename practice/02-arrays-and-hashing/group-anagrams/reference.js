/**
 * Group Anagrams — hash map keyed by a letter-count signature.
 * Time O(n · k), Space O(n · k)   (n words, max length k)
 *
 * Anagrams have identical letter counts. We count the 26 lowercase letters of each word,
 * join the counts with '#' into a string key, and bucket words by that key.
 */
function groupAnagrams(strs) {
  const groups = new Map(); // signature -> words
  for (const word of strs) {
    const freq = new Array(26).fill(0);
    for (let i = 0; i < word.length; i++) freq[word.charCodeAt(i) - 97]++;
    const key = freq.join('#');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(word);
  }
  return [...groups.values()];
}

module.exports = groupAnagrams;
