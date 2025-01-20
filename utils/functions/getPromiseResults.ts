// deno-fmt-ignore-file
export async function getPromiseResults<T extends Promise<unknown>[]>(promises: [...T]) {
	return (await Promise.allSettled(promises)).map((promise) => {
		if (promise.status === "fulfilled") return promise.value
	}) as { [K in keyof T]: Awaited<T[K]> | undefined };
}

if (import.meta.main) {
	const { delay } = await import("./delay.ts");

	const [a = 1, b = 2, c = 3, d = 4] = await getPromiseResults([
		delay(1000).then(() => "one" as const),
		delay(1000).then(() => { throw NaN; }),
		Promise.resolve("three" as const),
		Promise.reject(Infinity),
	]);

	console.log([a, b, c, d]);
}
