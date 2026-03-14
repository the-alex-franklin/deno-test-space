export async function partitionPromises<T extends Promise<unknown>[]>(promises: [...T]) {
	const fulfilled: unknown[] = [];
	const rejected: unknown[] = [];

	for (const result of await Promise.allSettled(promises)) {
		if (result.status === "fulfilled") fulfilled.push(result.value);
		else rejected.push(result.reason);
	}

	return { fulfilled, rejected } as {
		fulfilled: Awaited<T[number]>[];
		rejected: unknown[];
	};
}

if (import.meta.main) {
	const { delay } = await import("./delay.ts");

	const { fulfilled, rejected } = await partitionPromises([
		delay(1000).then(() => "one" as const),
		delay(1000).then(() => {
			throw NaN;
		}),
		Promise.resolve("three" as const),
		Promise.reject(Infinity),
	]);

	console.log({ fulfilled, rejected });
}
