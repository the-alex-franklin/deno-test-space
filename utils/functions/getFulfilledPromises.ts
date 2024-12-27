import { nonNull } from "./nonNull.ts";

export async function getFulfilledPromises<T extends Promise<unknown>[]>(promises: [...T]) {
	return (await Promise.allSettled(promises))
		.map((promise) => promise.status === "fulfilled" ? promise.value : undefined)
		.filter(nonNull);
}
