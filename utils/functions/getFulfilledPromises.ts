export async function getFulfilledPromises<T extends Promise<unknown>[]>(
	promises: [...T],
): Promise<{ [K in keyof T]: Awaited<T[K]> }> {
	return (await Promise.allSettled(promises)).map((result) => {
		if (result.status === "fulfilled") return result.value;
	}) as { [K in keyof T]: Awaited<T[K]> };
}

if (import.meta.main) {
	const [
		a = "a",
		b = "b",
		c = "c",
	] = await getFulfilledPromises([
		Promise.resolve(1),
		Promise.reject(2),
		Promise.resolve(3),
	]);

	console.log(a, b, c);
}
