# Serialize and Deserialize Binary Tree

Design a `Codec` class with two methods:

- `serialize(root)` — turn a binary tree into a **string**,
- `deserialize(data)` — turn that string back into a tree with exactly the same shape and values.

The format is completely up to you. The only rule is the round trip: `deserialize(serialize(root))` must rebuild the original tree. (Don't cheat by stashing the tree somewhere — the tests use two separate `Codec` instances, and the rebuilt tree must be made of brand-new nodes.)

## Examples

```
Input:  root = [1,2,3,null,null,4,5]
Output: [1,2,3,null,null,4,5]
```

```
Input:  root = []
Output: []
```

(The tests serialize with one `Codec`, deserialize with another, and print the rebuilt tree as a level-order array. They also check that `serialize` returns a string.)

## Constraints

- The tree has between `0` and `10^4` nodes.
- `-1000 <= Node.val <= 1000`

## Hints

<details><summary>Hint 1</summary>

A pre-order list of values alone is ambiguous (many trees share it). What if you also write down every `null` child with a marker like `#`?

</details>

<details><summary>Hint 2</summary>

With null markers, pre-order is enough: `[1,2,3,null,null,4,5]` becomes `"1,2,#,#,3,4,#,#,5,#,#"`. Join with a separator so multi-digit and negative numbers stay intact.

</details>

<details><summary>Hint 3</summary>

To deserialize, split on the separator and read tokens with a moving index: a `#` means `null`; otherwise create the node, then recursively build its left subtree, then its right. (A level-order BFS format with a queue works too.)

</details>
