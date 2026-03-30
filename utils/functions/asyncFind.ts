import { getFulfilledPromises } from "./getFulfilledPromises.ts";
import type { MaybePromise } from "../types/MaybePromise.ts";

export async function asyncFind<T>(
	array: T[],
	predicate: (arg: T) => MaybePromise<unknown>,
): Promise<T | undefined> {
	const results = await getFulfilledPromises(
		array.map(async (item) => ({
			result: Boolean(await predicate(item)),
			item,
		})),
	);

	for (const { result, item } of results) if (result) return item;
}

// Example usage:
if (import.meta.main) {
	const { delay } = await import("./delay.ts");

	const thing: { [key: string]: string } = {
		1: "one",
		2: "two",
		3: "three",
		4: "four",
		5: "five",
	};

	const start = performance.now();

	const three = await asyncFind(Object.entries(thing), async ([key, value]) => {
		await delay(1000);
		return value === "three";
	});

	if (!three) throw new Error("three not found");

	const end = performance.now();

	console.log(`Time taken: ${end - start}ms`);

	console.log(Object.fromEntries([three]));
}
