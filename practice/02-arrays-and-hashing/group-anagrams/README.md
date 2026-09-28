# Group Anagrams

You're given an array of strings `strs`. Put the words that are **anagrams** of each other (same letters, same counts, possibly rearranged) into the same group, and return the list of groups.

The groups can be returned in any order, and the words inside each group can be in any order too.

## Examples

```
Input:  strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
```

```
Input:  strs = [""]
Output: [[""]]
```

```
Input:  strs = ["a"]
Output: [["a"]]
```

## Constraints

- `1 <= strs.length <= 10^4`
- `0 <= strs[i].length <= 100`
- `strs[i]` contains only lowercase English letters.

## Hints

<details><summary>Hint 1</summary>

Two words are anagrams exactly when they look the same after you **sort their letters**. `"eat"`, `"tea"` and `"ate"` all become `"aet"`.

</details>

<details><summary>Hint 2</summary>

Use that sorted form as a key in a `Map` from key → list of words. Each word goes into its key's list.

</details>

<details><summary>Hint 3</summary>

Sorting each word costs `O(k log k)`. For `O(k)`, build the key from a 26-slot letter count instead — joined with a separator like `'#'` so it's unambiguous.

</details>
