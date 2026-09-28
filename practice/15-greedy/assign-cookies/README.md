# Assign Cookies

You're handing out cookies to children. Child `i` has a **greed factor** `g[i]`: the smallest cookie size that will make them happy. Cookie `j` has size `s[j]`. A child is content if they get a cookie with `s[j] >= g[i]`.

Each child gets **at most one** cookie, and each cookie goes to at most one child. Return the **maximum number of content children**.

## Examples

```
Input:  g = [1,2,3], s = [1,1]
Output: 1
// both cookies are size 1, so only the child with greed 1 can be satisfied
```

```
Input:  g = [1,2], s = [1,2,3]
Output: 2
// give cookie 1 to child 1 and cookie 2 (or 3) to child 2
```

## Constraints

- `1 <= g.length <= 3 * 10^4`
- `0 <= s.length <= 3 * 10^4`
- `1 <= g[i], s[j] <= 2^31 - 1`

## Hints

<details><summary>Hint 1</summary>

Wasting a big cookie on a child who'd be happy with a small one is never a good idea. What order would make the matching easy?

</details>

<details><summary>Hint 2</summary>

Sort both arrays. Walk through the cookies from smallest to largest with a pointer into the children (least greedy first).

</details>

<details><summary>Hint 3</summary>

If the current cookie satisfies the current child, both pointers move. If not, this cookie is too small for *everyone* still waiting — skip the cookie.

</details>
