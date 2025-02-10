import { getFulfilledPromises } from "./getFulfilledPromises.ts";
import type { MaybePromise } from "../types/MaybePromise.ts";

export async function asyncFilter<T>(
	array: T[],
	predicate: (arg: T) => MaybePromise<unknown>,
): Promise<T[]> {
	const results = await getFulfilledPromises(
		array.map(async (item) => ({
			result: Boolean(await predicate(item)),
			item,
		})),
	);

	return results
		.filter(({ result }) => result)
		.map(({ item }) => item);
}

// Example usage:
if (import.meta.main) {
	const { delay } = await import("./delay.ts");

	const thing = [0, 1, false, true, "", "hello", NaN, Infinity];

	const filtered_things = await asyncFilter(thing, async (item) => {
		await delay(1000);
		return item;
	});

	console.log(filtered_things);
}
