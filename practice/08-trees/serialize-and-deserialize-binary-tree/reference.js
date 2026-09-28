const { TreeNode } = require('../../../lib/structures');

/**
 * Serialize and Deserialize Binary Tree — pre-order with null markers.
 * Time O(n), Space O(n) for both directions
 *
 * serialize: pre-order DFS writing each value, and '#' for every missing
 * child, joined with commas. With the nulls recorded, pre-order is
 * unambiguous. deserialize: read the tokens back in the same order with a
 * moving index — '#' is null, anything else is a node whose left and right
 * subtrees follow immediately.
 */
class Codec {
  serialize(root) {
    const out = [];
    (function walk(node) {
      if (!node) {
        out.push('#');
        return;
      }
      out.push(String(node.val));
      walk(node.left);
      walk(node.right);
    })(root);
    return out.join(',');
  }

  deserialize(data) {
    const tokens = data.split(',');
    let i = 0;
    function build() {
      const token = tokens[i++];
      if (token === '#') return null;
      const node = new TreeNode(Number(token));
      node.left = build();
      node.right = build();
      return node;
    }
    return build();
  }
}

module.exports = Codec;
