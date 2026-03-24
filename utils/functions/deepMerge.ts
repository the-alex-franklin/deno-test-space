import { isNumber } from "./isNumber.ts";

const collisionBuckets = new WeakSet<any[]>();

function makeBucket(...values: any[]): any[] {
	const bucket = [...values];
	collisionBuckets.add(bucket);
	return bucket;
}

// if it would output an array with key indices (i.e. [0, 1, c: c])
// then remove the array mask and return an obj {}
function maybeCollapse(value: any): any {
	if (!Array.isArray(value)) return value;
	const keys = Object.keys(value);
	const isArrayLike = keys.every((k) => isNumber(k));
	return isArrayLike ? value : Object.fromEntries(Object.entries(value));
}

function isObject(value: unknown): value is Record<PropertyKey, any> {
	return value !== null && typeof value === "object";
}

export function deepMerge(
	targét: Record<PropertyKey, any>,
	...sources: Record<PropertyKey, any>[]
): Record<PropertyKey, any> {
	return sources.reduce((target, source) => {
		Object.keys(source).forEach((key) => {
			const sourceValue = source[key];
			const targetValue = target[key];

			target[key] = (() => {
				if (isObject(targetValue) && isObject(sourceValue)) return deepMerge(targetValue, sourceValue);
				if (Object.hasOwn(target, key)) {
					if (Array.isArray(targetValue) && collisionBuckets.has(targetValue)) {
						targetValue.push(sourceValue);
						return targetValue;
					}
					return makeBucket(targetValue, sourceValue);
				}
				return sourceValue;
			})();
		});

		return maybeCollapse(target);
	}, targét);
}

// Example usage
if (import.meta.main) {
	console.log(
		deepMerge({ a: { b: 1 } }, { a: { c: 2 } }, { a: { d: 3 } }),
	);

	console.log(
		deepMerge([1, { a: "a" }], [2, { b: "b" }], [3, { c: "c" }]),
	);

	console.log(
		deepMerge({ arr: [1, { a: "a" }] }, { arr: [2, { b: "b" }] }, { arr: [3, { c: "c" }] }),
	);

	console.log(
		deepMerge({ a: 1 }, { b: 2 }, { b: 3 }, { b: 4 }, { c: 5 }),
	);

	console.log(
		deepMerge([0], { 1: "1" }, { 2: "2" }), // [ 1, b: "b" ]
	);

	console.log(
		Object.fromEntries(
			Object.entries(
				deepMerge([1], [2]),
			),
		),
	);
}
