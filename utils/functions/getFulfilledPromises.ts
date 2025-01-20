import { nonNull } from "./nonNull.ts";

export async function getFulfilledPromises<T extends Promise<unknown>[]>(promises: [...T]) {
	return (await Promise.allSettled(promises)).map((promise) => {
		if (promise.status === "fulfilled") return promise.value;
	}).filter(nonNull);
}

if (import.meta.main) {
	const results = await getFulfilledPromises([
		Promise.resolve(1),
		Promise.reject(2),
		Promise.resolve("3"),
	]);

	console.log(results);
}
