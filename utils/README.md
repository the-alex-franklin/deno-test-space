# @2or3godzillas/utils

A personal utility library for Deno. Functions and types I keep reaching for.

## Install

```ts
import { asyncPipe, Try, tryAll } from "jsr:@2or3godzillas/utils";
```

---

## Functions

### `Try(fn)`

Wraps a sync or async function in a `Success | Failure` result instead of throwing.

```ts
const result = await Try(() => fetch("/api/data").then(r => r.json()));
if (result.failure) return console.error(result.error.message);
render(result.data);
```

### `tryAll(promises)`

`Promise.allSettled` mapped to `Success | Failure` per item.

```ts
const [user, posts] = await tryAll([fetchUser(id), fetchPosts(id)]);
if (user.failure) return console.error(user.error.message);
render(user.data, posts.success ? posts.data : []);
```

### `allOptional(promises)`

Like `Promise.allSettled`, but returns `undefined` for rejected promises instead of a result object — ideal for
destructuring with defaults.

```ts
const [user = defaultUser, posts = []] = await allOptional([fetchUser(id), fetchPosts(id)]);
```

### `getFulfilledPromises(promises)`

`Promise.allSettled` returning only the fulfilled values, rejections silently dropped.

```ts
const users = await getFulfilledPromises(ids.map(fetchUser)); // only resolved values
```

### `pipe(value, ...fns)`

Pass a value through a sequence of functions left to right.

```ts
pipe("  hello  ", s => s.trim(), s => s.toUpperCase()); // "HELLO"
```

### `flow(...fns)`

Compose functions left to right into a reusable function.

```ts
const normalize = flow((s: string) => s.trim(), s => s.toUpperCase());
normalize("  hello  "); // "HELLO"
```

### `asyncPipe(value, ...fns)`

Like `pipe`, but each function can be async.

```ts
await asyncPipe(
  userId,
  (id) => fetch(`/api/users/${id}`).then(r => r.json()),
  (user) => fetch(`/api/posts?author=${user.name}`).then(r => r.json()),
);
```

### `asyncFlow(...fns)`

Like `flow`, but each function can be async.

```ts
const getUserPosts = asyncFlow(
  (id: string) => fetch(`/api/users/${id}`).then(r => r.json()),
  (user) => fetch(`/api/posts?author=${user.name}`).then(r => r.json()),
);
await getUserPosts(userId);
```

### `asyncFilter(array, predicate)`

Like `Array.filter` but the predicate can be async. All predicates run in parallel.

```ts
const reachable = await asyncFilter(urls, async (url) => {
  const res = await fetch(url, { method: "HEAD" });
  return res.ok;
});
```

### `asyncFind(array, predicate)`

Like `Array.find` but the predicate can be async. All predicates run in parallel, returns the first match left to right.

```ts
const mirror = await asyncFind(urls, async (url) => {
  const res = await fetch(url, { method: "HEAD" });
  return res.ok;
});
```

### `asyncReplace(target, pattern, replacer)`

Like `String.replace` but the replacer can be async.

```ts
const result = await asyncReplace(
  "Hello, {{name}}!",
  /{{(\w+)}}/,
  async (_, key) => db.get(key),
); // "Hello, Alice!"
```

### `asyncReplaceAll(target, pattern, replacer)`

Like `String.replaceAll` but the replacer can be async. All replacements run in parallel.

```ts
const result = await asyncReplaceAll(
  "{{greeting}}, {{name}}!",
  /{{(\w+)}}/g,
  async (_, key) => db.get(key),
); // "Hello, Alice!"
```

### `deepMerge(target, ...sources)`

Recursively merges objects. Colliding scalar values are collected into arrays.

```ts
deepMerge({ a: { x: 1 } }, { a: { y: 2 } });
// { a: { x: 1, y: 2 } }

deepMerge({ a: 1 }, { a: 2 }, { a: 3 });
// { a: [1, 2, 3] }
```

### `range(end)` / `range(start, end)`

Generates an array of numbers. Supports descending ranges.

```ts
range(5);     // [0, 1, 2, 3, 4]
range(-3);    // [0, -1, -2]
range(2, 5);  // [2, 3, 4]
range(2, -2); // [2, 1, 0, -1]
```

### `delay(ms)`

Promise-based `setTimeout`.

```ts
await delay(1000);
```

### `times(n, fn)`

Calls `fn` `n` times with the index, returns the results.

```ts
times(3, (i) => i * 2); // [0, 2, 4]
```

### `getFrom(obj, key)`

Safe property access — returns `undefined` instead of erroring when `obj` or `key` is nullish, or when `key` isn't in
`obj`.

```ts
const obj = { a: 1, b: 2 };
const key: string = "a";
getFrom(obj, key);   // 1
getFrom(obj, "c");   // undefined
getFrom(null, "a");  // undefined
getFrom(obj, null);  // undefined
```

### `isNullish(value)`

Returns `true` if value is `null` or `undefined`.

```ts
isNullish(null);      // true
isNullish(undefined); // true
isNullish(0);         // false
isNullish("");        // false
```

### `nonNullish(value)`

Type guard — returns `true` if value is not `null` or `undefined`.

```ts
const values = [1, null, 2, undefined, 3];
values.filter(nonNullish); // [1, 2, 3]
```

### `isNumber(value)`

Returns `true` if `Number(value)` is not `NaN`. Useful for checking numeric strings too.

```ts
isNumber(42);     // true
isNumber("3.14"); // true
isNumber("abc");  // false
isNumber(NaN);    // false
```

### `throwError(message)`

Throws an error as an expression, for use in places where `throw` isn't valid syntax.

```ts
const value = maybeNull ?? throwError("expected a value");
```

---

## Types

| Type                     | Description                                                            |
| ------------------------ | ---------------------------------------------------------------------- |
| `Nullish`                | `null \| undefined`                                                    |
| `NonNullish<T>`          | Excludes `null` and `undefined` from `T`                               |
| `Falsy`                  | All falsy values                                                       |
| `NonFalsy<T>`            | Excludes falsy values from `T`                                         |
| `MaybePromise<T>`        | `T \| Promise<T>`                                                      |
| `Primitive`              | `string \| number \| boolean \| bigint \| symbol \| null \| undefined` |
| `ArrayType<T>`           | Extracts the element type from an array                                |
| `ValueOf<T>`             | Union of all value types in an object                                  |
| `Widen<T>`               | Widens literal types to their base types                               |
| `UnionToIntersection<U>` | Converts a union to an intersection                                    |
