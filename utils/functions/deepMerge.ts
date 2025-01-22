export function deepMerge(
	target: Record<PropertyKey, any>,
	...sources: Record<PropertyKey, any>[]
): Record<PropertyKey, any> {
	return sources.reduce((target, source) => {
		Object.keys(source).forEach((key) => {
			const sourceValue = source[key];
			const targetValue = target[key];

			target[key] = (() => {
				if (isObject(targetValue) && isObject(sourceValue)) return deepMerge(targetValue, sourceValue);
				if (key in target) return [targetValue, sourceValue];
				return sourceValue;
			})();
		});

		return target;
	}, target);
}

function isObject(value: unknown): value is Record<PropertyKey, any> {
	return value !== null && typeof value === "object";
}

// Example usage
if (import.meta.main) {
	console.log(
		deepMerge({ a: { b: 1 } }, { a: { c: 2 } }),
	);

	console.log(
		deepMerge([1, { a: 2 }], [[3], { b: 4 }]),
	);

	console.log(
		deepMerge({ arr: [1, { a: 2 }] }, { arr: [3, { b: 4 }] }),
	);

	console.log(
		deepMerge({ a: 1 }, { b: 2 }, { c: 3 }),
	);

	console.log(
		deepMerge([1], { b: "b" }), // this incorrectly makes [ [1, 2] ]
	);

	console.log(
		Char(deepMerge([1], [2])), // this incorrectly makes [ [1, 2] ]
	);
}

function Char(obj: Record<PropertyKey, any>) {
	return Object.fromEntries(Object.entries(obj));
}
