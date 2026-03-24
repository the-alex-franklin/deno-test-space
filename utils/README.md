# @2or3godzillas/utils

A personal utility library for Deno. Functions and types I keep reaching for.

## Install

```ts
import { pipe, range, tryAll } from "jsr:@2or3godzillas/utils";
```

---

## Functions

### `pipe(value, ...fns)`

Pass a value through a sequence of functions left to right.

```ts
pipe(2, (x) => x * 4, (x) => x + 3); // 11
```

### `flow(...fns)`

Compose functions left to right into a reusable function.

```ts
const transform = flow((x) => x * 4, (x) => x + 3);
transform(2); // 11
```

### `asyncPipe(value, ...fns)`

Like `pipe`, but each function can be async.

```ts
await asyncPipe(2, (x) => x * 4, async (x) => {
	await delay(1000);
	return x + 3;
});
```

### `asyncFlow(...fns)`

Like `flow`, but each function can be async.

### `Try(fn)`

Wraps a sync or async function in a `Success | Failure` result instead of throwing.

```ts
const result = await Try(() => fetch("/api/data").then((r) => r.json()));
if (result.success) console.log(result.data);
else console.log(result.error);
```

### `tryAll(promises)`

`Promise.allSettled` mapped to `Success | Failure` per item.

```ts
const [a, b] = await tryAll([fetchUser(), fetchPosts()]);
if (a.success) console.log(a.data);
```

### `getFulfilledPromises(promises)`

`Promise.allSettled` returning only the fulfilled values, rejections silently dropped.

```ts
const results = await getFulfilledPromises([
	Promise.resolve(1),
	Promise.reject("oops"),
	Promise.resolve(3),
]); // [1, 3]
```

### `asyncFilter(array, predicate)`

Like `Array.filter` but the predicate can be async. All predicates run in parallel.

```ts
const evens = await asyncFilter([1, 2, 3, 4], async (n) => {
	await delay(100);
	return n % 2 === 0;
});
```

### `asyncFind(array, predicate)`

Like `Array.find` but the predicate can be async. All predicates run in parallel, returns the first match left to right.

### `asyncReplace(target, predicate, replacer)`

Like `String.replace` but the replacer can be async.

### `asyncReplaceAll(target, predicate, replacer)`

Like `String.replaceAll` but the replacer can be async. All replacements run in parallel.

### `deepMerge(target, ...sources)`

Recursively merges objects and arrays. Colliding scalar values are collected into arrays.

```ts
deepMerge({ a: 1 }, { b: 2 }, { b: 3 }); // { a: 1, b: [2, 3] }
```

### `range(end)` / `range(start, end)`

Generates an array of numbers. Supports descending ranges.

```ts
range(5); // [0, 1, 2, 3, 4]
range(2, 5); // [2, 3, 4]
range(5, 2); // [5, 4, 3]
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

Safe property access — returns `null` instead of erroring when `obj` or `key` is nullish, or returns `undefined` when
`key` isn't in `obj`.

### `isNullish(value)`

Returns `true` if value is `null` or `undefined`.

### `nonNull(value)`

Type guard — returns `true` if value is not `null` or `undefined`.

### `isNumber(value)`

Returns `true` if `Number(value)` is not `NaN`. Useful for checking numeric strings too.

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
