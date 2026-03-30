# deno-playground / test-space

This is where I play around with new ideas — exploring Deno APIs, FFI experiments, data structures, and whatever else
catches my interest. Most of it is throwaway code, but some of it turned into something useful.

---

## `Try` — my favourite thing in here

One thing I'm particularly proud of is the `Try` function. It's a small wrapper that tackles one of the most annoying
things about TypeScript: the fact that `throw` can happen anywhere, throw anything, and there's no way to tell from a
function's signature whether it throws or not, nor what it throws. You end up either wrapping everything in `try/catch`
blocks (ugly, disruptive to control flow) or just hoping for the best.

`Try` fixes this by wrapping a function call and returning a typed `Success | Failure` result object instead of
throwing. It works transparently with both sync and async functions — the return type is inferred automatically.

```ts
// Instead of this:
let post: Post;
try {
	post = await fetchPost(1);
} catch (e) {
	console.error(e);
}

// You write this:
const result = await Try(() => fetchPost(1));

if (result.success) console.log(result.data); // Post — fully typed
else console.log(result.error); // Error
```

No more `let x; try { x = ... } catch {}` gymnastics. No more untyped `catch (e: unknown)`. The success path and the
failure path are both explicit, type-safe, and handled in the same flow.

Note: it automatically detects whether the function being passed in is a Promise or a regular, synchronous function.
`await` is only needed if it's a Promise. If it's a synchronous function, no `await` is needed, but it doesn't hurt to
have it either. You can get very loosey-goosey with `await`. TypeScript will yell at you if you need it but don't have
it.

---

## Utils Library

The `Try` function — along with `tryAll`, `getFulfilledPromises`, `asyncFilter`, `asyncFind`, `asyncPipe`, `range`,
`deepMerge` and a bunch of other utilities I keep reaching for — is open-source and published as a library on JSR:

**[@2or3godzillas/utils](https://jsr.io/@2or3godzillas/utils@0.1.5)**

```ts
import { pipe, range, Try } from "jsr:@2or3godzillas/utils";
```

---

## License

[MIT](./LICENSE) — © 2026 Alex Andria Franklin. Feel free to use any of this, including `Try`, in your own projects.
Credit appreciated but not required.
