import type { NonNullish } from "../types/NonNullish.ts";

export function nonNullish<T>(value: T): value is NonNullish<T> {
	return value != null;
}

if (import.meta.main) {
	const thing = Math.random() > 0.5 ? "a" : null;

	if (nonNullish(thing)) {
		console.log(thing);
	}
}
